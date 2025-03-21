import path from "path";
import fs from "fs";
import { articlesDirectory, extensionOrder } from "./defs";
import { defaultLocale, LocaleRecord } from "@/lib/locale";
import parseMarkdown from "@/lib/markdown/parseMarkdown";
import parseHtml from "@/lib/html/parseHtml";
import { Metadata } from "@/lib/metadata/parseMetadata";
import { ArticlePageContext } from "./types";
import articlesModule from 'articles.meta-gen';
import articlesLanguageRecord from 'articles.lang-gen';


export default function getMetadata(filename: string, pageContext: LocaleRecord) {

  const { locale: assignedLocale, languageCode } = pageContext;

  let article = '';
  let locale = '';
  let extension: 'html' | 'md' = 'html';

  // resolve path

  const fileKey = path.join(articlesDirectory, filename);

  const _l = articlesLanguageRecord[fileKey] ?? {};
  let currentFullPath = '';
  for (const l of [assignedLocale, languageCode, defaultLocale]) {
    const p = _l[l];
    if (p) {
      locale = l;
      currentFullPath = p;
      extension = extensionOrder.find(x => p.endsWith(x)) || extension;
      break;
    }
  }
  if (!currentFullPath) {
    [locale, currentFullPath] = Object.entries(_l)[0] ?? [];
    locale = locale ?? defaultLocale;
  }
  if (!currentFullPath || !fs.existsSync(currentFullPath)) {
    return undefined;
  }

  // parse article

  article = fs.readFileSync(currentFullPath, "utf8");

  const metadata: Partial<Metadata> = {
    title: filename,
    ...articlesModule[currentFullPath],
  };
  const parsed = extension === 'md'
    ? parseMarkdown(article, { initialMetadata: metadata })
    : parseHtml(article, metadata);

  const ret = {
    locale,
    extension,
    ...parsed,
  } as ArticlePageContext;


  return ret;
}
