import getFieldByAlias from "./getFieldByAlias";

export interface Metadata {
  title?: string;
  lang?: string;
  charset?: string;
  desc?: string;
  authors?: string[];
  created?: number;
  updated?: number;
  tags?: string[];
  image?: string;
  slice?: [number, number];
  uncategorized?: Record<string, any>;
}

export function parseMetadata(parsed: Record<string, any>, meta?: Partial<Metadata>): Metadata {
  const result: Metadata = {
    ...meta,
  };

  const arrayFields: Partial<Record<'authors' | 'tags', Set<string>>> = {
    authors: new Set(),
    tags: new Set()
  };

  for (const [key, value] of Object.entries(parsed)) {
    if (!value) continue;

    const standardKey: keyof Metadata
      | 'date'
      | undefined = getFieldByAlias(key) as any;

    if (!standardKey) {
      if (!result.uncategorized) {
        result.uncategorized = {};
      }
      result.uncategorized[key] = value;
      continue;
    };

    // array
    if (standardKey === 'authors' || standardKey === 'tags') {
      if (Array.isArray(value)) {
        value.forEach(v => arrayFields[standardKey]?.add(String(v)));
      } else {
        arrayFields[standardKey]?.add(String(value));
      }
      continue;
    }

    // timestamp
    if (standardKey === 'created' || standardKey === 'updated' || standardKey === 'date') {
      const timestamp = typeof value === 'number' ? value :
        new Date(value).getTime(); 
        
      if (standardKey === 'date') {
        if (!result.created) result.created = timestamp;
        if (!result.updated) result.updated = timestamp;
      } else {
        result[standardKey] = timestamp;
      }
      continue;
    }

    // str
    (result as any)[standardKey] = String(value);
  }

  // collect
  for (const field of ['authors', 'tags'] as const) {
    if (arrayFields[field]?.size) {
      result[field] = Array.from(arrayFields[field]!);
    }
  }

  return result;
}

export default parseMetadata;
