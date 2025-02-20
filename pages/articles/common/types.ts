import { ParsedHtml } from "@/lib/html/parseHtml";
import { ParsedMarkdown } from "@/lib/markdown/parseMarkdown";
import { Metadata } from "@/lib/metadata/parseMetadata";

export type ArticlePageContext = {
  locale: string;
  metadata: Metadata;
} & (
  ({ extension: 'md', head?: undefined, body?: undefined } & ParsedMarkdown) | 
  ({ extension: 'html', text?: undefined, } & ParsedHtml)
);

export type ArticlePageRecord = {
  name: string;
  url: string;
  metadata: Metadata;
};
