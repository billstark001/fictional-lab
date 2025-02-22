
import getFirstCodeFence from "@/lib/markdown/getFirstCodeFence";
import fsPromises from "fs/promises";
import path from "path";
import yaml from 'js-yaml';
import { defaultLocale } from "@/lib/locale";
import parseMetadata, { Metadata } from "@/lib/metadata/parseMetadata";
import { NewsPageData, NewsRecord } from "./types";
import splitByLanguage from "@/lib/markdown/splitByLanguage";
import parseYamlToTags from "@/lib/tag/parseYamlToTags";
import TagManager from "@/lib/tag/TagManager";
import newsUrlGen from 'news.url-gen';

// Match date formats: YYYY-MM-DD, YYYY/MM/DD
// const datePattern = /^#\s*date\s*:\s*((\d{4}\s*[-/]\s*\d{1,2}\s*[-/]\s*\d{1,2}))\s*$/i;

const DESC_LENGTH = 160;

const _a = async (p: string) => {
  try {
    await fsPromises.access(p, fsPromises.constants.R_OK);
    return true;
  } catch {
    return false;
  }
};

export default async function getNewsList(
  newsDirectory: string,
  tagsFilePath: string,
  locale?: string,
  // TODO filter
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  filter?: boolean | string[],
) {

  const filenames = await fsPromises.readdir(newsDirectory);
  const tagsFile = (await _a(tagsFilePath))
    ? await fsPromises.readFile(tagsFilePath)
    : '';
  const tagsObject = yaml.load(tagsFile.toString() || '{}');
  const parsedTags = parseYamlToTags(tagsObject as any);

  const records: NewsRecord[] = [];
  const tagManager = new TagManager(parsedTags);

  for (const filename of filenames) {
    const file = await fsPromises.readFile(path.join(newsDirectory, filename));

    // parse metadata
    const [metadataStr, allContents] = getFirstCodeFence(file.toString(), 'metadata', true);
    const metadata: Metadata = {} as unknown as Metadata;
    try {
      const _metadata = yaml.load(metadataStr || '{}');
      Object.assign(metadata, parseMetadata(_metadata as any));
    } catch {
      // do nothing
    }

    // parse records
    const contents = splitByLanguage(allContents, metadata.lang);
    const content = contents[locale || metadata.lang || defaultLocale]
      || Object.values(contents)[0] || '';

    // parse image url
    if (metadata.image) {
      const _i = metadata.image.startsWith('/')
        ? '.' + metadata.image
        : './' + metadata.image;
      const _j = newsUrlGen[_i];
      console.log(_i, _j);
    }

    // collect result
    records.push({ filename, metadata, content });

    // add tag record
    tagManager.addArticle(filename, metadata.tags ?? []);
  }

  records.sort((a, b) => (b.metadata.created || 0) - (a.metadata.created || 0));

  const articlesWithTags = tagManager.generateArticlesWithTags(locale || defaultLocale);
  const _t: Record<string, string[]> = {};
  for (const { id, tags } of articlesWithTags) {
    _t[id] = tags;
  }

  for (const record of records) {
    const __t = _t[record.filename];
    // apply new tags
    if (__t) {
      record.metadata.tags = __t;
    }
    // fill descriptions
    if (!record.metadata.desc) {
      const t = record.content;
      record.metadata.desc = (t.length > DESC_LENGTH
        ? t.substring(0, DESC_LENGTH) + '……'
        : t).replace(/[\n\r\s]+/g, ' ');
    }
  }


  // generate map
  const recordsByTag = tagManager.generateTagToArticlesMap(locale || defaultLocale);

  return {
    records,
    recordsByTag
  } satisfies NewsPageData;
}