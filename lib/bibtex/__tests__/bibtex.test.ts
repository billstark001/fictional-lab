import { describe, it, expect } from 'vitest';
import { parseBibtex } from '../index';
import { BibtexEntry } from '../types';

// ─── Helper ───────────────────────────────────────────────────────────────────

/**
 * Parse a snippet expected to contain exactly one entry and return it.
 * Throws a descriptive error when the count is wrong.
 */
function one(bibtex: string): BibtexEntry {
  const entries = parseBibtex(bibtex);
  if (entries.length !== 1) {
    throw new Error(`Expected exactly 1 entry, got ${entries.length}:\n${bibtex}`);
  }
  return entries[0];
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('parseBibtex', () => {

  // ── 1. Empty / trivial input ───────────────────────────────────────────────

  describe('empty and trivial input', () => {
    it('returns [] for an empty string', () => {
      expect(parseBibtex('')).toEqual([]);
    });

    it('returns [] for whitespace-only input', () => {
      expect(parseBibtex('   \n\t  ')).toEqual([]);
    });

    it('returns [] for plain text with no entries', () => {
      expect(parseBibtex('This is just text. No BibTeX here.')).toEqual([]);
    });

    it('returns [] when the only token is a bare @', () => {
      expect(parseBibtex('@')).toEqual([]);
    });
  });

  // ── 2. Basic entry structure ───────────────────────────────────────────────

  describe('basic entry structure', () => {
    it('extracts id, type, and title', () => {
      const e = one('@article{smith2024, title = {Test Title}, year = {2024}}');
      expect(e.id).toBe('smith2024');
      expect(e.type).toBe('article');
      expect(e.title).toBe('Test Title');
    });

    it('normalises type to lowercase', () => {
      expect(one('@ARTICLE{k, title={T}, year={2020}}').type).toBe('article');
      expect(one('@Article{k, title={T}, year={2020}}').type).toBe('article');
      expect(one('@InProceedings{k, title={T}, year={2020}}').type).toBe('inproceedings');
    });

    it('raw equals the full source span for a single-entry input', () => {
      const src = '@article{key, title = {T}, year = {2020}}';
      expect(one(src).raw).toBe(src);
    });

    it('raw is accurate for every entry in a multi-entry input', () => {
      const e1 = '@article{a, title={A}, year=2021}';
      const e2 = '@book{b,    title={B}, year=2022}';
      const entries = parseBibtex(`${e1}\n${e2}`);
      expect(entries[0].raw).toBe(e1);
      expect(entries[1].raw).toBe(e2);
    });

    it('raw starts with @', () => {
      expect(one('@misc{k, title={T}}').raw.startsWith('@')).toBe(true);
    });

    it('defaults title to empty string when the field is absent', () => {
      expect(one('@misc{k, author={Nobody}}').title).toBe('');
    });

    it('has no errors property on a well-formed entry', () => {
      expect(one('@article{k, title={T}, year={2024}}').errors).toBeUndefined();
    });
  });

  // ── 3. Entry types ─────────────────────────────────────────────────────────

  describe('entry types', () => {
    const cases: Array<[string, keyof BibtexEntry, string]> = [
      ['article', 'journal', 'Test Journal'],
      ['book', 'publisher', 'Publisher Inc.'],
      ['inproceedings', 'booktitle', 'Some Conference'],
      ['phdthesis', 'school', 'MIT'],
      ['mastersthesis', 'school', 'Stanford'],
      ['techreport', 'note', 'Technical Report TR-01'],
      ['misc', 'note', 'A misc note'],
      ['incollection', 'booktitle', 'Collected Works'],
    ];

    for (const [type, field, value] of cases) {
      it(`parses @${type} and reads field '${field}'`, () => {
        const src = `@${type}{k, title={T}, year={2024}, ${field}={${value}}}`;
        const e = one(src);
        expect(e.type).toBe(type);
        expect((e as unknown as Record<string, unknown>)[field]).toBe(value);
      });
    }
  });

  // ── 4. All optional fields ─────────────────────────────────────────────────

  describe('all optional fields', () => {
    it('reads every field defined in BibtexEntry', () => {
      const src = `@article{full,
        title     = {Full Entry},
        author    = {A. Author},
        editor    = {E. Editor},
        booktitle = {Booktitle},
        publisher = {Publisher},
        school    = {School},
        address   = {City, Country},
        year      = {2024},
        month     = {March},
        pages     = {1--20},
        journal   = {Journal Name},
        volume    = {12},
        number    = {3},
        series    = {LNCS},
        doi       = {10.1234/test},
        issn      = {1234-5678},
        url       = {https://example.com},
        urldate   = {2024-06-01},
        language  = {English},
        copyright = {CC BY 4.0},
        note      = {A note},
        keyword   = {kw1, kw2},
        abstract  = {An abstract.},
      }`;
      const e = one(src);
      expect(e.author).toBe('A. Author');
      expect(e.editor).toBe('E. Editor');
      expect(e.booktitle).toBe('Booktitle');
      expect(e.publisher).toBe('Publisher');
      expect(e.school).toBe('School');
      expect(e.address).toBe('City, Country');
      expect(e.month).toBe('March');
      expect(e.pages).toBe('1--20');
      expect(e.journal).toBe('Journal Name');
      expect(e.volume).toBe('12');
      expect(e.series).toBe('LNCS');
      expect(e.doi).toBe('10.1234/test');
      expect(e.issn).toBe('1234-5678');
      expect(e.url).toBe('https://example.com');
      expect(e.urldate).toBe('2024-06-01');
      expect(e.language).toBe('English');
      expect(e.copyright).toBe('CC BY 4.0');
      expect(e.note).toBe('A note');
      expect(e.keyword).toBe('kw1, kw2');
      expect(e.abstract).toBe('An abstract.');
    });
  });

  // ── 5. Value types ─────────────────────────────────────────────────────────

  describe('value parsing', () => {
    it('parses braced string values', () => {
      expect(one('@article{k, title={Hello World}, year=2020}').title)
        .toBe('Hello World');
    });

    it('parses quoted string values', () => {
      expect(one('@article{k, title="Hello World", year=2020}').title)
        .toBe('Hello World');
    });

    it('parses bare numeric values as strings initially', () => {
      // After coercion, year=2024 should be number 2024
      const e = one('@article{k, title={T}, year=2024}');
      expect(e.year).toBe(2024);
    });

    it('preserves inner braces in braced string values', () => {
      expect(one('@article{k, title={Hello {World} Test}, year=2020}').title)
        .toBe('Hello {World} Test');
    });

    it('strips the outer braces of inner {…} segments in quoted strings', () => {
      expect(one('@article{k, title="An {Important} Title", year=2020}').title)
        .toBe('An Important Title');
    });

    it('handles deeply nested braces', () => {
      expect(one('@article{k, title={A {{B}} C}, year=2020}').title)
        .toBe('A {{B}} C');
    });

    it('handles multiline braced values', () => {
      const e = one('@article{k, title={Line one\nLine two}, year=2020}');
      expect(e.title).toBe('Line one\nLine two');
    });

    it('handles LaTeX commands embedded in braced values', () => {
      const e = one('@article{k, author={M{\\"u}ller, Hans}, year=2020, title={T}}');
      expect(e.author).toBe('M{\\"u}ller, Hans');
    });

    it('handles an empty braced value', () => {
      expect(one('@article{k, title={}, year=2020}').title).toBe('');
    });

    it('handles an empty quoted value', () => {
      expect(one('@article{k, title="", year=2020}').title).toBe('');
    });

    it('handles values with special chars (URLs, DOIs, ISSNs)', () => {
      const e = one(`@article{k, title={T}, year=2020,
        url  = {https://doi.org/10.1000/xyz123},
        doi  = {10.1000/xyz123},
        issn = {0028-0836}
      }`);
      expect(e.url).toBe('https://doi.org/10.1000/xyz123');
      expect(e.doi).toBe('10.1000/xyz123');
      expect(e.issn).toBe('0028-0836');
    });
  });

  // ── 6. String concatenation ────────────────────────────────────────────────

  describe('string concatenation with #', () => {
    it('concatenates two braced literals', () => {
      expect(one('@article{k, title={Hello} # { World}, year=2020}').title)
        .toBe('Hello World');
    });

    it('concatenates string macro and quoted literal', () => {
      const input = `
@string{prefix = "Dear"}
@article{k, title = prefix # { Reader}, year=2020}`;
      expect(parseBibtex(input)[0].title).toBe('Dear Reader');
    });

    it('concatenates three parts', () => {
      const input = `
@string{a = "Hello"}
@string{b = "World"}
@article{k, title = a # {, } # b, year=2020}`;
      expect(parseBibtex(input)[0].title).toBe('Hello, World');
    });

    it('concatenates a number literal with braced text', () => {
      expect(one('@article{k, title={Vol} # 42, year=2020}').title).toBe('Vol42');
    });

    it('handles whitespace around # gracefully', () => {
      expect(one('@article{k, title = {X}   #   {Y}, year=2020}').title)
        .toBe('XY');
    });
  });

  // ── 7. @string macros ──────────────────────────────────────────────────────

  describe('@string macros', () => {
    it('expands a user-defined @string macro', () => {
      const input = `
@string{myconf = {My Conference Proceedings}}
@inproceedings{k, title={T}, booktitle=myconf, year={2023}}`;
      expect(parseBibtex(input)[0].booktitle).toBe('My Conference Proceedings');
    });

    it('is case-insensitive for both macro definitions and references', () => {
      const input = `
@STRING{VENUE = {IEEE}}
@article{k, title={T}, journal=venue, year=2020}`;
      expect(parseBibtex(input)[0].journal).toBe('IEEE');
    });

    it('expands a @string defined with a quoted value', () => {
      const input = `
@string{pub = "Great Publisher"}
@book{k, title={T}, publisher=pub, year={2021}}`;
      expect(parseBibtex(input)[0].publisher).toBe('Great Publisher');
    });

    it('allows @string to reference a previously defined @string via concatenation', () => {
      const input = `
@string{base  = "IEEE Trans. on "}
@string{topic = base # "Computers"}
@article{k, title={T}, journal=topic, year=2020}`;
      expect(parseBibtex(input)[0].journal).toBe('IEEE Trans. on Computers');
    });

    it('returns the bare identifier when a macro is undefined', () => {
      expect(one('@article{k, title=undefined_macro, year=2020}').title)
        .toBe('undefined_macro');
    });

    it('@string entries do not appear in the output array', () => {
      const input = `
@string{x = {foo}}
@article{k, title={T}, year=2020}`;
      expect(parseBibtex(input)).toHaveLength(1);
    });

    it('expands all twelve standard month macros', () => {
      const pairs: [string, string][] = [
        ['jan', 'January'], ['feb', 'February'], ['mar', 'March'],
        ['apr', 'April'], ['may', 'May'], ['jun', 'June'],
        ['jul', 'July'], ['aug', 'August'], ['sep', 'September'],
        ['oct', 'October'], ['nov', 'November'], ['dec', 'December'],
      ];
      for (const [abbr, full] of pairs) {
        const e = one(`@article{k, title={T}, month=${abbr}, year=2020}`);
        expect(e.month, `month macro '${abbr}'`).toBe(full);
      }
    });

    it('expands uppercase month macros', () => {
      expect(one('@article{k, title={T}, month=JAN, year=2020}').month)
        .toBe('January');
    });
  });

  // ── 8. Special entry types ─────────────────────────────────────────────────

  describe('@comment, @preamble, @string skipped', () => {
    it('skips @comment{...}', () => {
      const entries = parseBibtex(
        '@comment{This is ignored}\n@article{k, title={T}, year=2020}',
      );
      expect(entries).toHaveLength(1);
      expect(entries[0].id).toBe('k');
    });

    it('skips @COMMENT case-insensitively', () => {
      expect(
        parseBibtex('@COMMENT{x}\n@article{k,title={T},year=2020}'),
      ).toHaveLength(1);
    });

    it('skips @comment with nested braces', () => {
      expect(
        parseBibtex('@comment{outer {inner {deep}} end}\n@article{k,title={T},year=2020}'),
      ).toHaveLength(1);
    });

    it('skips @comment(…) with parenthesis delimiter', () => {
      expect(
        parseBibtex('@comment(ignored)\n@article{k,title={T},year=2020}'),
      ).toHaveLength(1);
    });

    it('skips @preamble{...}', () => {
      expect(
        parseBibtex('@preamble{"\\\\usepackage{amsmath}"}\n@article{k,title={T},year=2020}'),
      ).toHaveLength(1);
    });

    it('skips @string but makes the macro available', () => {
      const input = `
@string{acm = {Association for Computing Machinery}}
@article{k, title={T}, publisher=acm, year=2020}`;
      const entries = parseBibtex(input);
      expect(entries).toHaveLength(1);
      expect(entries[0].publisher).toBe('Association for Computing Machinery');
    });
  });

  // ── 9. Multiple entries ────────────────────────────────────────────────────

  describe('multiple entries', () => {
    it('parses several consecutive entries in order', () => {
      const input = `
@article{a1, title={First},  year={2021}}
@book{b1,    title={Second}, year={2022}}
@misc{m1,    title={Third},  year={2023}}`;
      const entries = parseBibtex(input);
      expect(entries).toHaveLength(3);
      expect(entries.map(e => e.id)).toEqual(['a1', 'b1', 'm1']);
      expect(entries.map(e => e.type)).toEqual(['article', 'book', 'misc']);
    });

    it('ignores content between entries', () => {
      const input = `
Some preamble text here.
% A comment line

@article{k, title={T}, year=2020}

More trailing text.`;
      expect(parseBibtex(input)).toHaveLength(1);
    });

    it('handles @comment interleaved with real entries', () => {
      const input = `
@article{a, title={A}, year=2021}
@comment{Skip me}
@book{b, title={B}, year=2022}`;
      const entries = parseBibtex(input);
      expect(entries).toHaveLength(2);
      expect(entries[0].id).toBe('a');
      expect(entries[1].id).toBe('b');
    });
  });

  // ── 10. Parenthesis delimiter ──────────────────────────────────────────────

  describe('parenthesis delimiter', () => {
    it('parses an entry enclosed in parentheses', () => {
      const src = '@article(k,\n  title = {Title},\n  year = {2020}\n)';
      const e = one(src);
      expect(e.id).toBe('k');
      expect(e.title).toBe('Title');
      expect(e.year).toBe(2020);
    });

    it('raw field ends with ) for parenthesis-delimited entries', () => {
      const src = '@article(k, title={T}, year=2020)';
      expect(one(src).raw).toBe(src);
    });
  });

  // ── 11. Year and number coercion ───────────────────────────────────────────

  describe('year and number coercion', () => {
    it('coerces braced integer year to number', () => {
      const e = one('@article{k, title={T}, year={2024}}');
      expect(e.year).toBe(2024);
      expect(typeof e.year).toBe('number');
    });

    it('coerces bare integer year to number', () => {
      const e = one('@article{k, title={T}, year=1984}');
      expect(e.year).toBe(1984);
      expect(typeof e.year).toBe('number');
    });

    it('keeps non-integer year as string', () => {
      const e = one('@article{k, title={T}, year={forthcoming}}');
      expect(typeof e.year).toBe('string');
      expect(e.year).toBe('forthcoming');
    });

    it('keeps year with non-numeric suffix as string', () => {
      const e = one('@article{k, title={T}, year={2024a}}');
      expect(typeof e.year).toBe('string');
    });

    it('coerces braced integer number field to number', () => {
      const e = one('@article{k, title={T}, year=2020, number={7}}');
      expect(e.number).toBe(7);
      expect(typeof e.number).toBe('number');
    });

    it('keeps non-integer number field as string', () => {
      const e = one('@article{k, title={T}, year=2020, number={S1}}');
      expect(e.number).toBe('S1');
      expect(typeof e.number).toBe('string');
    });

    it('coerces whitespace-padded integer year (e.g. { 2024 })', () => {
      // parseBracedString returns " 2024 "; trim+parseInt should still give 2024
      const e = one('@article{k, title={T}, year={ 2024 }}');
      expect(e.year).toBe(2024);
    });
  });

  // ── 12. keyword / keywords alias ──────────────────────────────────────────

  describe('keyword / keywords alias', () => {
    it('maps keyword field to entry.keyword', () => {
      expect(
        one('@article{k, title={T}, year=2020, keyword={ml, dl}}').keyword,
      ).toBe('ml, dl');
    });

    it('maps keywords field to entry.keyword', () => {
      expect(
        one('@article{k, title={T}, year=2020, keywords={ml, dl}}').keyword,
      ).toBe('ml, dl');
    });

    it('keyword takes precedence over keywords when both are present', () => {
      const e = one(
        '@article{k, title={T}, year=2020, keyword={primary}, keywords={secondary}}',
      );
      expect(e.keyword).toBe('primary');
    });
  });

  // ── 13. Citation key formats ───────────────────────────────────────────────

  describe('citation key formats', () => {
    const cases: [string, string][] = [
      ['smith:2024:paper', 'colon-separated key'],
      ['my-key-2024', 'hyphen-separated key'],
      ['Smith.2024', 'dot-separated key'],
      ['my_key_2024', 'underscore-separated key'],
      ['key+extra!now', 'key with + and !'],
      ['ABC123', 'uppercase alphanumeric key'],
    ];

    for (const [key, desc] of cases) {
      it(`accepts ${desc}`, () => {
        expect(one(`@misc{${key}, title={T}}`).id).toBe(key);
      });
    }
  });

  // ── 14. Robustness / error recovery ───────────────────────────────────────

  describe('robustness and error recovery', () => {
    it('accepts trailing comma after the last field (standard style)', () => {
      const e = one('@article{k,\n  title = {T},\n  year = {2020},\n}');
      expect(e.title).toBe('T');
      expect(e.errors).toBeUndefined();
    });

    it('records an error for a missing closing brace', () => {
      const e = one('@article{unclosed, title={T}, year={2020}');
      expect(e.id).toBe('unclosed');
      expect(e.errors).toBeDefined();
      expect(e.errors!.length).toBeGreaterThan(0);
    });

    it('still extracts fields from an unclosed entry', () => {
      const e = one('@article{unclosed, title={Hello}, year={2021}');
      expect(e.title).toBe('Hello');
      expect(e.year).toBe(2021);
    });

    it('recovers and parses an entry that follows an unclosed one', () => {
      const input = `@article{bad, title={T}
@article{good, title={Good}, year={2021}}`;
      const entries = parseBibtex(input);
      expect(entries.some(e => e.id === 'good')).toBe(true);
      const good = entries.find(e => e.id === 'good')!;
      expect(good.title).toBe('Good');
    });

    it('silently accepts unknown/extra fields', () => {
      const e = one('@article{k, title={T}, year=2020, mycustomfield={v}}');
      expect(e.errors).toBeUndefined();
    });

    it('parses entry with only a key and no fields', () => {
      const e = one('@misc{lonely}');
      expect(e.id).toBe('lonely');
      expect(e.title).toBe('');
      expect(e.errors).toBeUndefined();
    });

    it('parses entry with key and trailing comma but no fields', () => {
      const e = one('@misc{k,}');
      expect(e.id).toBe('k');
      expect(e.errors).toBeUndefined();
    });

    it('ignores content before the first @', () => {
      expect(
        parseBibtex('Preamble text\n@article{k, title={T}, year=2020}'),
      ).toHaveLength(1);
    });

    it('handles multiple @string + @comment + entries without issue', () => {
      const input = `
@string{a = {A}}
@comment{ignored}
@string{b = {B}}
@article{k, title = a # b, year = 2020}`;
      const entries = parseBibtex(input);
      expect(entries).toHaveLength(1);
      expect(entries[0].title).toBe('AB');
    });

    it('does not throw on completely malformed input', () => {
      expect(() => parseBibtex('@@{{{}}}@article')).not.toThrow();
    });

    it('handles field with no value (empty — treated as empty string)', () => {
      // year = , — no value token; field should be empty string or absent, not crash
      expect(() =>
        parseBibtex('@article{k, title={T}, year=, volume={1}}'),
      ).not.toThrow();
    });
  });

  // ── 15. Real-world examples ────────────────────────────────────────────────

  describe('real-world examples', () => {
    it('parses the Knuth Literate Programming article', () => {
      const input = `
@article{Knuth1984,
  author  = {Donald E. Knuth},
  title   = {Literate Programming},
  journal = {The Computer Journal},
  year    = {1984},
  volume  = {27},
  number  = {2},
  pages   = {97--111},
  doi     = {10.1093/comjnl/27.2.97},
}`;
      const e = parseBibtex(input)[0];
      expect(e.id).toBe('Knuth1984');
      expect(e.author).toBe('Donald E. Knuth');
      expect(e.title).toBe('Literate Programming');
      expect(e.year).toBe(1984);
      expect(e.volume).toBe('27');
      expect(e.number).toBe(2);
      expect(e.doi).toBe('10.1093/comjnl/27.2.97');
      expect(e.errors).toBeUndefined();
    });

    it('parses a misc entry with url and urldate', () => {
      const input = `
@misc{web2024,
  title   = {An Online Resource},
  author  = {Web Author},
  url     = {https://example.com/page?q=1&r=2},
  urldate = {2024-03-15},
  year    = {2024},
}`;
      const e = parseBibtex(input)[0];
      expect(e.url).toBe('https://example.com/page?q=1&r=2');
      expect(e.urldate).toBe('2024-03-15');
    });

    it('parses a full book entry (SICP)', () => {
      const input = `
@book{SICP,
  author    = {Harold Abelson and Gerald Jay Sussman},
  title     = {Structure and Interpretation of Computer Programs},
  publisher = {MIT Press},
  address   = {Cambridge, MA},
  year      = {1996},
}`;
      const e = parseBibtex(input)[0];
      expect(e.id).toBe('SICP');
      expect(e.publisher).toBe('MIT Press');
      expect(e.address).toBe('Cambridge, MA');
      expect(e.year).toBe(1996);
    });

    it('parses a file mixing @string, @comment, and two regular entries', () => {
      const input = `
@string{ieee = {IEEE}}
@string{acm  = "ACM"}

@comment{This entry is intentionally left blank.}

@article{doe2023,
  author  = {Jane Doe},
  title   = {Modern Algorithms},
  journal = ieee # { Transactions on Computers},
  year    = {2023},
}

@inproceedings{roe2022,
  author    = {John Roe},
  title     = {Fast Methods},
  booktitle = acm # { SIGPLAN},
  year      = {2022},
  pages     = {1--15},
}`;
      const entries = parseBibtex(input);
      expect(entries).toHaveLength(2);

      const [doe, roe] = entries;
      expect(doe.id).toBe('doe2023');
      expect(doe.journal).toBe('IEEE Transactions on Computers');

      expect(roe.id).toBe('roe2022');
      expect(roe.booktitle).toBe('ACM SIGPLAN');
      expect(roe.pages).toBe('1--15');
    });

    it('parses a thesis entry', () => {
      const input = `
@phdthesis{jones2022,
  author  = {Alice Jones},
  title   = {On the Correctness of Parsers},
  school  = {University of Cambridge},
  year    = {2022},
  month   = jun,
  address = {Cambridge, UK},
}`;
      const e = parseBibtex(input)[0];
      expect(e.type).toBe('phdthesis');
      expect(e.school).toBe('University of Cambridge');
      expect(e.month).toBe('June');
      expect(e.address).toBe('Cambridge, UK');
    });
  });
});