import { extractMarkdownImages, extractHtmlImages } from "./extractImages";
import parseMarkdown, { ParseMarkdownOptions } from "./parseMarkdown";

export function extractMarkdownResources(
  file: string,
  parseMarkdownOptions?: Readonly<Partial<ParseMarkdownOptions>>,
) {
  const links = new Set<string>();
  const addImage = (image?: string) => {
    if (!image || image.startsWith('/public/')) {
      return;
    }
    const _i = image.startsWith('/')
      ? '@' + image
      : '@/' + image;
    links.add(_i);
  };

  // parse metadata
  const { metadata, text: remainingText } = parseMarkdown(
    file, 
    parseMarkdownOptions,
  );

  // add metadata image
  addImage(metadata.image);

  // add other images
  for (const { url } of extractMarkdownImages(remainingText)) {
    addImage(url);
  }
  for (const { url } of extractHtmlImages(remainingText)) {
    addImage(url);
  }

  return { metadata, links: [...links], text: remainingText };
}