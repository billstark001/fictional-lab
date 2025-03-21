import { Metadata } from "@/lib/metadata/parseMetadata";
import { ArticlePageRecord } from "../common/types";
import { PageContext } from "vike/types";
import { defaultLocale, LocaleRecord } from "@/lib/locale";
import { articlesDirectory } from "../common/defs";
import articlesModule from 'articles.meta-gen';
import articlesLanguageRecord from 'articles.lang-gen';

export default async function data(pageContext: PageContext) {

  const { languageCode } = pageContext as unknown as  LocaleRecord;

  // { lang: { slug: metadata } }
  const allMetadata: Record<string, Metadata> = {};

  for (const file in articlesLanguageRecord) {
    const f = Object.entries(articlesLanguageRecord[file]);
    const i = f.find(([lang]) => lang === languageCode || lang.startsWith(languageCode))
      || f.find(([lang]) => lang === defaultLocale || lang.startsWith(defaultLocale))
      || f[0];
    if (!i) {
      continue;
    }
    const [, fullPath] = i;
    const metadata = articlesModule[fullPath];

    if (!metadata) {
      continue;
    }
    allMetadata[file] = metadata;
  }
  const articles = Object.entries(allMetadata).map(([fullPath, metadata]) => {
    const name = fullPath.startsWith(articlesDirectory)
      ? fullPath.substring(articlesDirectory.length)
      : fullPath;
    return {
      name,
      url: `/articles/${name}`,
      metadata,
    } satisfies ArticlePageRecord;
  });
  articles.sort((x, y) => (x.metadata.created || 0) - (y.metadata.created || 0));

  return {
    articles,
  };
}