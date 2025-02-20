import { Metadata } from "@/lib/metadata/parseMetadata";
import { articlesDirectory } from "../common/defs";
import enumerate from "../common/enumerate";
import { ArticlePageRecord } from "../common/types";
import getMetadata from "../common/getMetadata";
import { PageContext } from "vike/types";
import { defaultLocale, LocaleRecord } from "@/lib/locale";

export default async function data(pageContext: PageContext) {

  const allFiles = await enumerate(articlesDirectory);

  const { languageCode } = pageContext as unknown as  LocaleRecord;

  // { lang: { slug: metadata } }
  const allMetadata: Record<string, Metadata> = {};

  for (const file in allFiles) {
    const f = Object.entries(allFiles[file]);
    const i = f.find(([lang]) => lang === languageCode || lang.startsWith(languageCode))
      || f.find(([lang]) => lang === defaultLocale || lang.startsWith(defaultLocale))
      || f[0];
    if (!i) {
      continue;
    }
    const [lang, path] = i;
    const { metadata } = getMetadata(file, { locale: lang, languageCode: lang, urlLogical: '' }) ?? {};

    if (!metadata) {
      continue;
    }
    allMetadata[file] = metadata;
  }

  const urlPrefix = languageCode === defaultLocale ? '' : ('/' + languageCode);

  const articles = Object.entries(allMetadata).map(([name, metadata]) => {
    return {
      name,
      url: `${urlPrefix}/articles/${name}`,
      metadata,
    } satisfies ArticlePageRecord;
  });
  articles.sort((x, y) => (x.metadata.created || 0) - (y.metadata.created || 0));

  return {
    articles,
  };
}