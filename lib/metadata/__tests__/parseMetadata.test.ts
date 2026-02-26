import { describe, it, expect } from 'vitest';
import { parseMetadata } from '../parseMetadata';

describe('parseMetadata', () => {
  it('parses basic fields', () => {
    const result = parseMetadata({ title: 'My Post', lang: 'en' });
    expect(result.title).toBe('My Post');
    expect(result.lang).toBe('en');
  });

  it('resolves aliases to standard field names', () => {
    const result = parseMetadata({ name: 'Hello', description: 'A description' });
    expect(result.title).toBe('Hello');
    expect(result.desc).toBe('A description');
  });

  it('parses author as array', () => {
    const result = parseMetadata({ author: 'Alice' });
    expect(result.authors).toEqual(['Alice']);
  });

  it('parses multiple authors from array', () => {
    const result = parseMetadata({ authors: ['Alice', 'Bob'] });
    expect(result.authors).toEqual(['Alice', 'Bob']);
  });

  it('deduplicates authors', () => {
    const result = parseMetadata({ author: 'Alice', authors: ['Alice', 'Bob'] });
    expect(result.authors).toEqual(['Alice', 'Bob']);
  });

  it('parses tags', () => {
    const result = parseMetadata({ tags: ['react', 'vite'] });
    expect(result.tags).toEqual(['react', 'vite']);
  });

  it('converts a single tag string to array', () => {
    const result = parseMetadata({ tag: 'react' });
    expect(result.tags).toEqual(['react']);
  });

  it('parses numeric timestamps', () => {
    const ts = 1700000000000;
    const result = parseMetadata({ created: ts });
    expect(result.created).toBe(ts);
  });

  it('parses ISO date string timestamps', () => {
    const result = parseMetadata({ created: '2024-01-15' });
    expect(typeof result.created).toBe('number');
    expect(result.created).toBeGreaterThan(0);
  });

  it('maps "date" field to both created and updated', () => {
    const ts = 1700000000000;
    const result = parseMetadata({ date: ts });
    expect(result.created).toBe(ts);
    expect(result.updated).toBe(ts);
  });

  it('does not overwrite existing created/updated when date is provided', () => {
    const created = 1600000000000;
    const updated = 1700000000000;
    const date = 1800000000000;
    const result = parseMetadata({ created, updated, date });
    expect(result.created).toBe(created);
    expect(result.updated).toBe(updated);
  });

  it('stores unknown keys in uncategorized', () => {
    const result = parseMetadata({ custom_field: 'value', another: 42 });
    expect(result.uncategorized).toEqual({ custom_field: 'value', another: 42 });
  });

  it('applies initial metadata as defaults', () => {
    const result = parseMetadata({ title: 'Override' }, { lang: 'en', created: 1000 });
    expect(result.lang).toBe('en');
    expect(result.created).toBe(1000);
    expect(result.title).toBe('Override');
  });

  it('skips falsy values', () => {
    const result = parseMetadata({ title: '', desc: null });
    expect(result.title).toBeUndefined();
    expect(result.desc).toBeUndefined();
  });
});
