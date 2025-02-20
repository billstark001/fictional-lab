
export function concatAndSanitizeString(input: string[]) {
  let ret = input.join('\n');
  ret = ret.replace(/^[\s\n\r]+/, '');
  ret = ret.replace(/[\s\n\r]+$/, '');
  return ret;
}

export type MarkedMarkdownItem<T> = [T, string];

export type SplitByMarkersReturn<T> = {
  header: string;
  sections: MarkedMarkdownItem<T>[];
};

export function splitByMarkers<T>(
  input: string, 
  markerPattern: RegExp,
  parseMarker: (value: string) => T,
): SplitByMarkersReturn<T> {

  const lines = input.split('\n');
  const result: SplitByMarkersReturn<T> = {
    header: '',
    sections: []
  };

  let currentMarker = '';
  let currentContent: string[] = [];

  markerPattern.lastIndex = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const match = line.match(markerPattern);

    if (match) {
      // If we have accumulated content for a previous marker, save it
      if (currentMarker) {
        result.sections.push([parseMarker(currentMarker), concatAndSanitizeString(currentContent)]);
        currentContent = [];
      } else if (currentContent.length > 0) {
        // This is content before any marker
        result.header = concatAndSanitizeString(currentContent);
        currentContent = [];
      }

      // Store the new marker
      currentMarker = match[1];
    } else {
      currentContent.push(line);
    }
  }

  // Handle the last section
  if (currentMarker) {
    result.sections.push([parseMarker(currentMarker), concatAndSanitizeString(currentContent)]);
  } else if (currentContent.length > 0) {
    result.header = concatAndSanitizeString(currentContent);
  }

  return result;
}

export default splitByMarkers;