import { describe, it, expect } from 'vitest';
import path from 'path';
import { sepLangAndExtension, FileByLanguageRecord } from '../index';

// Use platform-agnostic path separators for test inputs
const p = (s: string) => s.split('/').join(path.sep);

describe('sepLangAndExtension', () => {
  it('extracts extension and default locale from a plain filename', () => {
    const r = sepLangAndExtension('post.md');
    expect(r.name).toBe('post');
    expect(r.ext).toBe('md');
    expect(r.lang).toBe('en');
  });

  it('extracts a language code from a localized filename', () => {
    const r = sepLangAndExtension('post.zh.md');
    expect(r.name).toBe('post');
    expect(r.lang).toBe('zh');
    expect(r.langCode).toBe('zh');
    expect(r.ext).toBe('md');
  });

  it('extracts lang and langCode from a locale filename (region part stripped)', () => {
    const r = sepLangAndExtension('post.zh-CN.md');
    expect(r.name).toBe('post');
    // The function extracts the 2-letter language code; region is dropped
    expect(r.lang).toBe('zh');
    expect(r.langCode).toBe('zh');
    expect(r.ext).toBe('md');
  });

  it('handles paths with directories', () => {
    const r = sepLangAndExtension(p('/some/dir/post.ja.md'));
    expect(r.ext).toBe('md');
    expect(r.lang).toBe('ja');
  });

  it('handles filenames without extensions', () => {
    const r = sepLangAndExtension('README');
    expect(r.ext).toBe('');
  });
});

describe('FileByLanguageRecord', () => {
  it('adds a file and records it under its language', () => {
    const rec = new FileByLanguageRecord(['md']);
    rec.add(p('/articles/post.md'));
    const record = rec.getRecord();
    const key = Object.keys(record)[0];
    expect(record[key]['en']).toBe(p('/articles/post.md'));
  });

  it('adds localized files under the correct language', () => {
    const rec = new FileByLanguageRecord(['md']);
    rec.add(p('/articles/post.zh.md'));
    const record = rec.getRecord();
    const key = Object.keys(record)[0];
    expect(record[key]['zh']).toBe(p('/articles/post.zh.md'));
  });

  it('ignores files with unrecognized extensions', () => {
    const rec = new FileByLanguageRecord(['md']);
    rec.add(p('/articles/image.png'));
    expect(Object.keys(rec.getRecord())).toHaveLength(0);
  });

  it('removes a file correctly', () => {
    const rec = new FileByLanguageRecord(['md']);
    const filePath = p('/articles/post.md');
    rec.add(filePath);
    rec.remove(filePath);
    expect(Object.keys(rec.getRecord())).toHaveLength(0);
  });

  it('clears all records', () => {
    const rec = new FileByLanguageRecord(['md']);
    rec.add(p('/articles/post.md'));
    rec.add(p('/articles/other.md'));
    rec.clear();
    expect(Object.keys(rec.getRecord())).toHaveLength(0);
  });

  it('supports multiple extensions', () => {
    const rec = new FileByLanguageRecord(['md', 'html']);
    rec.add(p('/articles/post.md'));
    rec.add(p('/articles/page.html'));
    const record = rec.getRecord();
    expect(Object.keys(record)).toHaveLength(2);
  });
});
