
const markdownImageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
const htmlImageRegex = /<img\s+[^>]*src=["']([^"']+)["'][^>]*>/gi;

export type ImageRecord = {
  type: 'md' | 'html';
  alt?: string;
  url: string;
};

export function extractMarkdownImages(text: string) {
  const images: ImageRecord[] = [];
  let match;
  while ((match = markdownImageRegex.exec(text)) !== null) {
    images.push({
      type: 'md',
      alt: match[1] || undefined, 
      url: match[2] || '',
    });
  }
  return images;
}

export function extractHtmlImages(text: string) {
  const images: ImageRecord[] = [];
  let match;
  while ((match = htmlImageRegex.exec(text)) !== null) {
    images.push({
      type: 'html',
      alt: '', 
      url: match[1] || '',
    });
  }
  return images;
}