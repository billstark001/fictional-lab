
export const getFirstCodeFence = (
  markdown: string, 
  language?: string,
  replaceCode = false,
): [string | undefined, string, [number, number] | undefined] => {
  
  let code: string | undefined;
  let remainingText = markdown;

  const openFenceRegex = new RegExp(
    '^([`~]{3,})' + 
    (language ? '\\s*' + language : '[^\\n]*') + 
    '\\s*\\n', 
    'm'
  );

  let slice: [number, number] | undefined = undefined;
  
  const openMatch = remainingText.match(openFenceRegex);
  if (openMatch) {
    const fence = openMatch[1]; 
    const startPos = openMatch.index!;
    const contentStart = startPos + openMatch[0].length;
    
    const closeFenceRegex = new RegExp(
      '^' + fence + '\\s*$', 
      'm'
    );
    
    const afterOpenFence = remainingText.slice(contentStart);
    const closeMatch = afterOpenFence.match(closeFenceRegex);
    
    if (closeMatch) {
      code = afterOpenFence.slice(0, closeMatch.index).trim();
      const endPos = contentStart + closeMatch.index! + closeMatch[0].length;
      // const entireBlock = remainingText.slice(startPos, endPos);
      slice = [startPos, endPos];
      if (replaceCode) {
        const r1 = remainingText.slice(0, startPos);
        const r2 = remainingText.slice(endPos);
        remainingText = r1 + r2;
      }
    }
  }

  return [code, remainingText, slice];
};

export default getFirstCodeFence;