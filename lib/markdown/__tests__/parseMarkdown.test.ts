import { describe, it, expect } from 'vitest';
import { parseMarkdown } from '../parseMarkdown';

describe('parseMarkdown', () => {
  it('parses a document with a metadata code fence', () => {
    const md = [
      '```metadata',
      'title: Hello World',
      'author: Alice',
      '```',
      '',
      'Some content here.',
    ].join('\n');

    const { metadata, text } = parseMarkdown(md);
    expect(metadata.title).toBe('Hello World');
    expect(metadata.authors).toEqual(['Alice']);
    expect(text).toContain('Some content here.');
  });

  it('extracts the first H1 as title when no metadata title is set', () => {
    const md = '# My Title\n\nSome content.';
    const { metadata, text } = parseMarkdown(md);
    expect(metadata.title).toBe('My Title');
    expect(text).not.toContain('# My Title');
  });

  it('does not overwrite metadata title with H1', () => {
    const md = [
      '```metadata',
      'title: Explicit Title',
      '```',
      '',
      '# Heading',
      '',
      'Content.',
    ].join('\n');

    const { metadata } = parseMarkdown(md);
    expect(metadata.title).toBe('Explicit Title');
  });

  it('generates a description from content when parseDesc is true', () => {
    const md = 'Short description text.';
    const { metadata } = parseMarkdown(md);
    expect(metadata.desc).toBeDefined();
    expect(metadata.desc).toContain('Short description text.');
  });

  it('truncates long descriptions to descLength', () => {
    const longText = 'a'.repeat(500);
    const { metadata } = parseMarkdown(longText, { descLength: 100 });
    expect(metadata.desc!.length).toBeLessThanOrEqual(110);
  });

  it('respects parseTitle: false option', () => {
    const md = '# My Title\n\nContent.';
    const { metadata, text } = parseMarkdown(md, { parseTitle: false });
    expect(metadata.title).toBeUndefined();
    expect(text).toContain('# My Title');
  });

  it('respects parseDesc: false option', () => {
    const md = 'Some content.';
    const { metadata } = parseMarkdown(md, { parseDesc: false });
    expect(metadata.desc).toBeUndefined();
  });

  it('applies initialMetadata as base', () => {
    const md = 'Content.';
    const { metadata } = parseMarkdown(md, {
      initialMetadata: { lang: 'zh', created: 1000 },
    });
    expect(metadata.lang).toBe('zh');
    expect(metadata.created).toBe(1000);
  });

  it('handles empty markdown gracefully', () => {
    const { metadata, text } = parseMarkdown('');
    expect(text).toBe('');
    expect(metadata.title).toBeUndefined();
  });

  it('handles malformed yaml in metadata fence gracefully', () => {
    const md = [
      '```metadata',
      ': invalid yaml :::',
      '```',
      'Content.',
    ].join('\n');
    expect(() => parseMarkdown(md)).not.toThrow();
  });
});
