import yaml from 'js-yaml';
import { Metadata, parseMetadata } from '../metadata/parseMetadata';
import getFirstCodeFence from './getFirstCodeFence';


export type ParsedMarkdown = {
  metadata: Metadata;
  text: string;
};

const METADATA_LANGUAGE = 'metadata';
const DESC_LENGTH = 320;

export function parseMarkdown(markdown: string, meta?: Partial<Metadata>): ParsedMarkdown {

  // eslint-disable-next-line prefer-const
  let [code, remainingText] = getFirstCodeFence(
    markdown, 
    METADATA_LANGUAGE,
    true,
  );

  // parse the converted metadata

  const parsed: Record<string, any> = {};
  try {
    Object.assign(parsed, yaml.load(code || '{}'));
  } catch {
    // do nothing
  }
  const metadata = parseMetadata(parsed);

  // if no title is provided, extract it from the document

  if (!metadata.title) {
    const titleMatch = markdown.match(/^#\s+(.+?)(?:\n|$)/m);
    if (titleMatch) {
      metadata.title = titleMatch[1].trim();
      remainingText = remainingText.replace(titleMatch[0], '');
    }
  }

  remainingText = remainingText.trim();

  // default description
  if (!metadata.desc && !meta?.desc) {
    const t = remainingText;
    metadata.desc = (t.length > DESC_LENGTH 
      ? t.substring(0, DESC_LENGTH) + '……'
      : t).replace(/[\n\r\s]+/g, ' ');
  }

  return {
    metadata: { ...meta, ...metadata }, 
    text: remainingText,
  };
}

export default parseMarkdown;