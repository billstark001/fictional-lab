import { Tag } from "./types";

export type ArticleRecord = {
  id: string;
  rawTags: string[];
};

export type TagToArticlesMap = { [tag: string]: string[] };
export type ArticleWithTags = { id: string; tags: string[] };

export class TagManager {
  private readonly tags: Tag[] = [];
  private readonly articles: ArticleRecord[] = [];

  constructor(initialTags: Tag[]) {
    this.tags = initialTags;
  }

  /**
   * Adds a new article with raw tags and resolves them to main tags.
   * @param articleId The unique ID of the article.
   * @param rawTags Array of raw tag strings.
   */
  addArticle(articleId: string, rawTags: string[]): void {
    const resolvedTags = rawTags.map((rawTag) => this.resolveTag(rawTag)).filter(Boolean) as string[];
    this.articles.push({ id: articleId, rawTags: resolvedTags });
  }

  /**
   * Resolves a raw tag to its main tag using alternatives or mainNames.
   * @param rawTag The raw tag string.
   * @returns The main tag name if resolved, otherwise the raw name.
   */
  private resolveTag(rawTag: string) {
    for (const tag of this.tags) {
      if (tag.mainName === rawTag || tag.alternatives.includes(rawTag)) {
        return tag.mainName;
      }

      // Check mainNames translations
      if (Object.values(tag.mainNames).includes(rawTag)) {
        return tag.mainName;
      }
    }
    return rawTag;
  }

  /**
   * Generates a list of articles with their tags for a specific language.
   * @param lang The language code.
   * @returns Array of articles with their tags.
   */
  generateArticlesWithTags(lang: string): ArticleWithTags[] {
    return this.articles.map((article) => {
      const translatedTags = article.rawTags.map((tag) =>
        this.translateTag(tag, lang)
      ).filter(Boolean) as string[];
      return {
        id: article.id,
        tags: translatedTags,
      };
    });
  }

  /**
   * Generates a mapping of tags to articles for a specific language.
   * @param lang The language code.
   * @returns Mapping of tags to article IDs.
   */
  generateTagToArticlesMap(lang: string): TagToArticlesMap {
    const map: TagToArticlesMap = {};

    this.articles.forEach((article) => {
      article.rawTags.forEach((rawTag) => {
        const translatedTag = this.translateTag(rawTag, lang);
        if (translatedTag) {
          if (!map[translatedTag]) {
            map[translatedTag] = [];
          }
          map[translatedTag].push(article.id);
        }
      });
    });

    return map;
  }

  /**
   * Translates a tag to the specified language if a translation exists.
   * @param tag The main tag name.
   * @param lang The target language code.
   * @returns The translated tag name if available, otherwise the main tag name.
   */
  private translateTag(tag: string, lang: string) {
    const foundTag = this.tags.find((t) => t.mainName === tag);
    return foundTag?.mainNames[lang] || foundTag?.mainName || tag;
  }
}

export default TagManager;