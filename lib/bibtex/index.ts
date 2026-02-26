
import { BibtexEntry } from "./types";

// #region Constants

/** Standard BibTeX month abbreviation macros */
const BUILTIN_STRINGS: Readonly<Record<string, string>> = {
  jan: 'January', feb: 'February', mar: 'March',
  apr: 'April', may: 'May', jun: 'June',
  jul: 'July', aug: 'August', sep: 'September',
  oct: 'October', nov: 'November', dec: 'December',
};

/**
 * Fields from BibtexEntry that are plain strings copied verbatim.
 * Excluded: id, type, raw, title (required), year/number (coerced),
 * keyword (alias), errors (meta).
 */
const STRING_FIELDS: ReadonlyArray<keyof BibtexEntry> = [
  'author', 'editor', 'booktitle', 'publisher', 'school', 'address',
  'month', 'pages', 'journal', 'volume', 'series', 'doi', 'issn',
  'url', 'urldate', 'language', 'copyright', 'note', 'abstract',
];

// #endregion
// #region Parser───

class BibtexParser {
  private readonly src: string;
  private pos: number;
  private strings: Record<string, string>;

  constructor(src: string) {
    this.src = src;
    this.pos = 0;
    this.strings = { ...BUILTIN_STRINGS };
  }

  // #endregion
  // #region Public API

  parse(): BibtexEntry[] {
    const entries: BibtexEntry[] = [];

    while (this.pos < this.src.length) {
      const atIdx = this.src.indexOf('@', this.pos);
      if (atIdx === -1) break;
      this.pos = atIdx;

      const entry = this.tryParseEntry();
      if (entry !== null) entries.push(entry);
    }

    return entries;
  }

  // #endregion
  // #region Entry-level parsing

  /**
   * Attempt to parse a single entry starting at the current '@'.
   * Always advances this.pos beyond the entry (or the bare '@').
   * Returns null for @comment, @preamble, @string, and malformed '@'.
   */
  private tryParseEntry(): BibtexEntry | null {
    const startPos = this.pos;
    this.pos++; // consume '@'
    this.skipWS();

    const typeName = this.readEntryType();
    if (!typeName) return null; // bare '@' — skip it

    const typeLower = typeName.toLowerCase();
    this.skipWS();

    const ch = this.peek();

    // No opening delimiter
    if (ch !== '{' && ch !== '(') {
      // Bare @comment text (without braces) is valid — skip to end of line
      if (typeLower === 'comment') {
        while (this.pos < this.src.length && this.src[this.pos] !== '\n') {
          this.pos++;
        }
      }
      // Other bare '@type' without delimiter — skip
      return null;
    }

    const openDelim = ch as '{' | '(';
    const closeDelim = openDelim === '{' ? '}' : ')';
    this.pos++; // consume open delimiter

    if (typeLower === 'comment' || typeLower === 'preamble') {
      this.skipBalanced(openDelim, closeDelim);
      return null;
    }

    if (typeLower === 'string') {
      this.skipWS();
      this.parseStringDefinition();
      this.skipWS();
      if (this.peek() === closeDelim) this.pos++;
      return null;
    }

    // Regular entry
    return this.parseRegularEntry(startPos, typeLower, closeDelim);
  }

  private parseRegularEntry(
    startPos: number,
    type: string,
    closeDelim: '}' | ')',
  ): BibtexEntry {
    const errors: string[] = [];

    this.skipWS();

    // Citation key
    const id = this.readCitationKey();
    if (!id) {
      errors.push(`Missing citation key near position ${this.pos}`);
    }

    this.skipWS();

    // Comma after key
    if (this.peek() === ',') {
      this.pos++;
    } else if (this.pos < this.src.length && this.peek() !== closeDelim) {
      errors.push(
        `Expected ',' after citation key '${id}' at position ${this.pos}`,
      );
    }

    const fields: Record<string, string> = {};
    this.skipWS();

    while (this.pos < this.src.length && this.peek() !== closeDelim) {
      // Stop if we stumble into a new entry — indicates unclosed previous one
      if (this.peek() === '@') {
        errors.push(
          `Encountered '@' at position ${this.pos} — possible unclosed entry`,
        );
        break;
      }

      // Field names must start with a letter
      if (!/[a-zA-Z]/.test(this.peek())) {
        errors.push(
          `Unexpected character '${this.peek()}' at position ${this.pos}`,
        );
        this.pos++;
        this.skipWS();
        continue;
      }

      const fieldName = this.readIdentifier();
      this.skipWS();

      if (this.peek() !== '=') {
        errors.push(
          `Expected '=' after field '${fieldName}' at position ${this.pos}`,
        );
        this.skipToNextField(closeDelim);
        continue;
      }

      this.pos++; // consume '='
      this.skipWS();

      const value = this.parseValue();
      fields[fieldName.toLowerCase()] = value;
      this.skipWS();

      if (this.peek() === ',') {
        this.pos++;
        this.skipWS();
      } else if (
        this.pos < this.src.length &&
        this.peek() !== closeDelim &&
        this.peek() !== '@'
      ) {
        errors.push(
          `Missing ',' after field '${fieldName}' at position ${this.pos}`,
        );
      }
    }

    // Closing delimiter
    if (this.peek() === closeDelim) {
      this.pos++;
    } else {
      errors.push(`Unexpected end of input — expected '${closeDelim}'`);
    }

    const raw = this.src.slice(startPos, this.pos);
    return this.buildEntry(id, type, raw, fields, errors);
  }

  // #endregion
  // #region @string definition

  private parseStringDefinition(): void {
    const name = this.readIdentifier();
    if (!name) return;
    this.skipWS();
    if (this.peek() !== '=') return;
    this.pos++; // consume '='
    this.skipWS();
    this.strings[name.toLowerCase()] = this.parseValue();
  }

  // #endregion
  // #region Value parsing

  private parseValue(): string {
    const parts = [this.parseSimpleValue()];
    while (this.pos < this.src.length) {
      this.skipWS();
      if (this.peek() !== '#') break;
      this.pos++; // consume '#'
      this.skipWS();
      parts.push(this.parseSimpleValue());
    }
    return parts.join('');
  }

  private parseSimpleValue(): string {
    const ch = this.peek();
    if (ch === '"') return this.parseQuotedString();
    if (ch === '{') return this.parseBracedString();
    if (/[0-9]/.test(ch)) return this.parseNumberLiteral();
    if (/[a-zA-Z]/.test(ch)) {
      const ident = this.readIdentifier();
      const lower = ident.toLowerCase();
      return lower in this.strings ? this.strings[lower] : ident;
    }
    return '';
  }

  /**
   * Quoted string: "..." — inner {…} are de-braced (outer braces stripped).
   */
  private parseQuotedString(): string {
    this.pos++; // opening '"'
    let result = '';
    while (this.pos < this.src.length && this.src[this.pos] !== '"') {
      if (this.src[this.pos] === '{') {
        result += this.parseBracedString(); // strips outer { }
      } else {
        result += this.src[this.pos++];
      }
    }
    if (this.pos < this.src.length) this.pos++; // closing '"'
    return result;
  }

  /**
   * Braced string: {...} — outer braces stripped, inner braces preserved.
   */
  private parseBracedString(): string {
    this.pos++; // opening '{'
    let result = '';
    let depth = 1;
    while (this.pos < this.src.length && depth > 0) {
      const ch = this.src[this.pos++];
      if (ch === '{') {
        depth++;
        result += ch;
      } else if (ch === '}') {
        if (--depth > 0) result += ch;
      } else {
        result += ch;
      }
    }
    return result;
  }

  private parseNumberLiteral(): string {
    let n = '';
    while (this.pos < this.src.length && /[0-9]/.test(this.src[this.pos])) {
      n += this.src[this.pos++];
    }
    return n;
  }

  // #endregion
  // #region Primitive readers

  /** Entry type: letters + optional '*' (for some BibTeX extensions) */
  private readEntryType(): string {
    let t = '';
    while (this.pos < this.src.length && /[a-zA-Z*]/.test(this.src[this.pos])) {
      t += this.src[this.pos++];
    }
    return t;
  }

  /**
   * Citation key: accept most printable non-delimiter characters.
   * Excluded: whitespace  , = { } ( ) " # % @
   */
  private readCitationKey(): string {
    let k = '';
    while (
      this.pos < this.src.length &&
      /[^\s,={}()"#%@]/.test(this.src[this.pos])
    ) {
      k += this.src[this.pos++];
    }
    return k;
  }

  /**
   * BibTeX identifier: Letter { Letter | Digit | _ | : | - }
   */
  private readIdentifier(): string {
    let id = '';
    if (this.pos < this.src.length && /[a-zA-Z]/.test(this.src[this.pos])) {
      while (
        this.pos < this.src.length &&
        /[a-zA-Z0-9_:-]/.test(this.src[this.pos])
      ) {
        id += this.src[this.pos++];
      }
    }
    return id;
  }

  // #endregion
  // #region Utilities

  private peek(): string {
    return this.pos < this.src.length ? this.src[this.pos] : '';
  }

  private skipWS(): void {
    while (this.pos < this.src.length && /\s/.test(this.src[this.pos])) {
      this.pos++;
    }
  }

  /** Skip to matching close delimiter; open delimiter already consumed. */
  private skipBalanced(open: string, close: string): void {
    let depth = 1;
    while (this.pos < this.src.length && depth > 0) {
      const ch = this.src[this.pos++];
      if (ch === open) depth++;
      else if (ch === close) depth--;
    }
  }

  /**
   * Error recovery: advance to the start of the next field
   * (consumes the separating comma) or stop at closeDelim / '@'.
   */
  private skipToNextField(closeDelim: string): void {
    let depth = 0;
    while (this.pos < this.src.length) {
      const ch = this.src[this.pos];
      if (ch === '{' || ch === '(') {
        depth++;
        this.pos++;
      } else if ((ch === '}' || ch === ')') && depth > 0) {
        depth--;
        this.pos++;
      } else if (depth === 0) {
        if (ch === ',') { this.pos++; break; }
        if (ch === closeDelim || ch === '@') break;
        this.pos++;
      } else {
        this.pos++;
      }
    }
    this.skipWS();
  }

  // #endregion
  // #region Entry builder

  private buildEntry(
    id: string,
    type: string,
    raw: string,
    fields: Record<string, string>,
    errors: string[],
  ): BibtexEntry {
    const entry: BibtexEntry = {
      id,
      type,
      raw,
      title: fields['title'] ?? '',
    };

    // Plain string fields
    for (const f of STRING_FIELDS) {
      const val = fields[f as string];
      if (val !== undefined) {
        (entry as unknown as Record<string, unknown>)[f as string] = val;
      }
    }

    // year — coerce to integer when the trimmed value is a pure decimal integer
    if ('year' in fields) {
      const s = fields['year'].trim();
      const n = parseInt(s, 10);
      entry.year = !isNaN(n) && String(n) === s ? n : fields['year'];
    }

    // number — same coercion
    if ('number' in fields) {
      const s = fields['number'].trim();
      const n = parseInt(s, 10);
      entry.number = !isNaN(n) && String(n) === s ? n : fields['number'];
    }

    // keyword / keywords alias — 'keyword' takes precedence
    if ('keyword' in fields) {
      entry.keyword = fields['keyword'];
    } else if ('keywords' in fields) {
      entry.keyword = fields['keywords'];
    }

    if (errors.length > 0) entry.errors = errors;

    return entry;
  }
}

// #endregion

// #region Public API

/**
 * Parse a BibTeX string into an array of {@link BibtexEntry} objects.
 *
 * - `@string` macros (including built-in month abbreviations) are expanded
 *   before field values are returned.
 * - `@comment` and `@preamble` entries are silently skipped.
 * - Parsing errors are collected per-entry in `entry.errors`; the parser
 *   always attempts to recover and continue.
 */
export function parseBibtex(input: string): BibtexEntry[] {
  return new BibtexParser(input).parse();
}

export {
  type BibtexEntry,
};

