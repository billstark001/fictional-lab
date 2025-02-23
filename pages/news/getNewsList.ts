
import fsPromises from "fs/promises";
import path from "path";
import yaml from 'js-yaml';
import { defaultLocale } from "@/lib/locale";
import { NewsPageData, NewsRecord } from "./types";
import splitByLanguage from "@/lib/markdown/splitByLanguage";
import parseYamlToTags from "@/lib/tag/parseYamlToTags";
import TagManager from "@/lib/tag/TagManager";
import newsUrlGen from 'news.url-gen';
import newsMetaGen from 'news.meta-gen';
import parseMarkdown from "@/lib/markdown/parseMarkdown";
import { getFirstTitle } from "@/lib/markdown/getFirstTitle";
import getDescription from "@/lib/markdown/getDescription";

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
  newestItems?: number,
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
    const filePath = path.join(newsDirectory, filename);
    const file = (await fsPromises.readFile(filePath)).toString();

    // parse metadata
    const metadata = newsMetaGen[filePath]
      ? { ...newsMetaGen[filePath] }
      : (() => {
        // not found, parse manually
        console.warn('Metadata not found: ' + filePath);
        const { metadata } = parseMarkdown(file, {
          parseTitle: false, parseDesc: false, descLength: 120, replaceMetadata: false,
        });
        return metadata;
      })();

    // remaining parts
    const [start, end] = metadata.slice ?? [];
    const allContents = start == null
      ? file
      : file.slice(0, start) + file.slice(end);

    // parse records
    const contents = splitByLanguage(allContents, metadata.lang);
    const content = contents[locale || metadata.lang || defaultLocale]
      || Object.values(contents)[0] || '';

    // parse title
    if (!metadata.title) {
      const { title } = getFirstTitle(content) ?? {};
      if (title) {
        metadata.title = title;
      }
    }

    if (!metadata.desc) {
      const desc = getDescription(content, 120);
      if (desc) {
        metadata.desc = desc;
      }
    }

    // parse image url
    if (metadata.image) {
      const _i = metadata.image.startsWith('/')
        ? '.' + metadata.image
        : './' + metadata.image;
      const _j = newsUrlGen[_i];
      metadata.image = _j ?? metadata.image;
    }

    // collect result
    records.push({ filename, metadata, content });

    // add tag record
    tagManager.addArticle(filename, metadata.tags ?? []);
  }

  records.sort((a, b) => (b.metadata.created || 0) - (a.metadata.created || 0));

  // restrict item count
  // TODO do not parse all the files if this is enabled
  if (newestItems && newestItems > 0) {
    if (records.length > newestItems) {
      records.splice(newestItems, records.length - newestItems);
    }
  }

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