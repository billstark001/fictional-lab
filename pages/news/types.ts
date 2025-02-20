import { Metadata } from "@/lib/metadata/parseMetadata";
import { TagToArticlesMap } from "@/lib/tag/TagManager";

export type FullNewsRecord = {
  metadata: Metadata;
  contents: Record<string, string>;
};
export type NewsRecord = {
  filename: string;
  metadata: Metadata;
  content: string;
};

export type NewsPageData = {
  records: NewsRecord[];
  recordsByTag: TagToArticlesMap;
}