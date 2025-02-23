
export const getFirstTitle = (markdown: string) => {
  const titleMatch = markdown.match(/^#\s+(.+?)(?:\n|$)/m);
  if (titleMatch) {
    const startPos = titleMatch.index!;
    const endPos = startPos + titleMatch[0].length;
    const title = titleMatch[1].trim();
    return {
      startPos, endPos, title,
    };
  }
};