import path from "path";
import fs from "fs";
import { articlesDirectory, extensionOrder } from "./defs";
import { defaultLocale, LocaleRecord } from "@/lib/locale";
import parseMarkdown from "@/lib/markdown/parseMarkdown";
import parseHtml from "@/lib/html/parseHtml";
import { Metadata } from "@/lib/metadata/parseMetadata";
import { ArticlePageContext } from "./types";


export default function getMetadata(filename: string, pageContext: LocaleRecord, fullPathOverride?: string) {

  const { locale: assignedLocale, languageCode } = pageContext;

  let fullPath = fullPathOverride || '';
  let article = '';
  let locale = '';
  let extension: 'html' | 'md' = 'html';

  const metadata: Partial<Metadata> = {
    title: filename,
  };

  if (fullPathOverride) {
    const currentFullPath = path.join(articlesDirectory, fullPathOverride);
    article = fs.readFileSync(currentFullPath, "utf8");
  }

  f1: for (const l of fullPathOverride ? [] : [assignedLocale, languageCode, undefined]) {
    for (const x of extensionOrder) {
      const currentFullPath = path.join(articlesDirectory, `${filename}${l ? '.' : ''}${l || ''}.${x}`);
      if (fs.existsSync(currentFullPath)) {
        fullPath = currentFullPath;
        article = fs.readFileSync(currentFullPath, "utf8");
        locale = l || defaultLocale;
        metadata.lang = locale;
        extension = x;

        const stat = fs.statSync(currentFullPath);
        metadata.created = stat.birthtime.getTime();
        metadata.updated = stat.mtime.getTime();

        break f1;
      }
    }
  }

  if (!fullPath) {
    return undefined;
  }
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
