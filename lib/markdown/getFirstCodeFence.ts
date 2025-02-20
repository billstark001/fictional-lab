
export const getFirstCodeFence = (
  markdown: string, 
  language?: string,
  replaceCode = false,
): [string | undefined, string] => {
  
  let code: string | undefined;
  let remainingText = markdown;

  const openFenceRegex = new RegExp(
    '^([`~]{3,})' + 
    (language ? '\\s*' + language : '[^\\n]*') + 
    '\\s*\\n', 
    'm'
  );
  
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
      const entireBlock = remainingText.slice(
        startPos,
        contentStart + closeMatch.index! + closeMatch[0].length
      );
      if (replaceCode) {
        remainingText = remainingText.replace(entireBlock, '');
      }
    }
  }

  return [code, remainingText];
};

export default getFirstCodeFence;