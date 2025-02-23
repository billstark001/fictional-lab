import yaml from 'js-yaml';
import { Metadata, parseMetadata } from '../metadata/parseMetadata';
import getFirstCodeFence from './getFirstCodeFence';
import { getFirstTitle } from './getFirstTitle';
import getDescription from './getDescription';


export type ParsedMarkdown = {
  metadata: Metadata;
  text: string;
};

export type ParseMarkdownOptions = {
  metadataLanguage: string;
  descLength: number;
  parseTitle: boolean;
  parseDesc: boolean;
  replaceMetadata: boolean;
  replaceTitle: boolean;
  initialMetadata?: Partial<Metadata>;
};

const METADATA_LANGUAGE = 'metadata';
const DESC_LENGTH = 320;

export function parseMarkdown(markdown: string, options?: Readonly<Partial<ParseMarkdownOptions>>): ParsedMarkdown {

  const {
    metadataLanguage = METADATA_LANGUAGE,
    descLength = DESC_LENGTH,
    parseTitle = true,
    parseDesc = true,
    replaceMetadata = true,
    replaceTitle = true,
    initialMetadata,
  } = options ?? {};

  // eslint-disable-next-line prefer-const
  let [metadataStr, remainingText, slice] = getFirstCodeFence(
    markdown, 
    metadataLanguage,
    replaceMetadata,
  );

  // parse the converted metadata
  const parsed: Record<string, any> = {};
  try {
    Object.assign(parsed, yaml.load(metadataStr || '{}'));
  } catch {
    // do nothing
  }
  const metadata = parseMetadata(parsed);
  metadata.slice = slice;

  // if no title is provided, extract it from the document
  if (parseTitle && !metadata.title) {
    const { startPos, endPos, title } = getFirstTitle(remainingText) ?? {};
    if (title) {
      metadata.title = title;
      if (replaceTitle) {
        remainingText = remainingText.slice(0, startPos) + remainingText.slice(endPos);
      }
    }
  }

  remainingText = remainingText.trim();

  // default description
  if (parseDesc && !metadata.desc && !initialMetadata?.desc) {
    metadata.desc = getDescription(remainingText, descLength);
  }

  return {
    metadata: { ...initialMetadata, ...metadata }, 
    text: remainingText,
  };
}

export default parseMarkdown;