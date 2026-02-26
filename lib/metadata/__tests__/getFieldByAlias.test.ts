import { describe, it, expect } from 'vitest';
import { getFieldByAlias } from '../getFieldByAlias';

describe('getFieldByAlias', () => {
  it('returns the field for exact English field names', () => {
    expect(getFieldByAlias('title')).toBe('title');
    expect(getFieldByAlias('lang')).toBe('lang');
    expect(getFieldByAlias('desc')).toBe('desc');
    expect(getFieldByAlias('tags')).toBe('tags');
    expect(getFieldByAlias('image')).toBe('image');
  });

  it('returns the standard field for English aliases', () => {
    expect(getFieldByAlias('name')).toBe('title');
    expect(getFieldByAlias('author')).toBe('authors');
    expect(getFieldByAlias('description')).toBe('desc');
    expect(getFieldByAlias('keywords')).toBe('tags');
    expect(getFieldByAlias('date')).toBe('date');
    expect(getFieldByAlias('createdAt')).toBe('created');
    expect(getFieldByAlias('updatedAt')).toBe('updated');
  });

  it('is case-insensitive', () => {
    expect(getFieldByAlias('TITLE')).toBe('title');
    expect(getFieldByAlias('Title')).toBe('title');
    expect(getFieldByAlias('AUTHOR')).toBe('authors');
    expect(getFieldByAlias('Description')).toBe('desc');
  });

  it('returns the standard field for Chinese aliases', () => {
    expect(getFieldByAlias('标题')).toBe('title');
    expect(getFieldByAlias('作者')).toBe('authors');
    expect(getFieldByAlias('标签')).toBe('tags');
    expect(getFieldByAlias('日期')).toBe('date');
    expect(getFieldByAlias('图片')).toBe('image');
  });

  it('returns the standard field for Japanese aliases', () => {
    expect(getFieldByAlias('タイトル')).toBe('title');
    expect(getFieldByAlias('著者')).toBe('authors');
    expect(getFieldByAlias('タグ')).toBe('tags');
    expect(getFieldByAlias('日時')).toBe('date');
    expect(getFieldByAlias('画像')).toBe('image');
  });

  it('returns undefined for unknown keys', () => {
    expect(getFieldByAlias('unknown_field')).toBeUndefined();
    expect(getFieldByAlias('foo')).toBeUndefined();
    expect(getFieldByAlias('')).toBeUndefined();
  });
});
