import { Plugin } from "vite";

import { BibtexParser, Entry } from "bibtex-js-parser";

export const transformAssets = () => {
  return {
    name: 'transform-assets',
    transform(code, id) {
      if (id.endsWith('.md')) {
        return `export default ${JSON.stringify(code)}`;
      }
      if (id.endsWith('.bib')) {
        const startIndices = [0, ...[...code.matchAll(/^@\w/gm)].map((match) => match.index), code.length];
        const pieces: string[] = [];
        for (let i = 0; i < startIndices.length - 1; ++i) {
          if (startIndices[i] === startIndices[i + 1]) {
            continue;
          }
          pieces.push(code.substring(startIndices[i], startIndices[i + 1]));
        }
        const parsed = pieces.map(c => {
          let res: Entry | undefined = undefined;
          const errors: string[] = [];
          BibtexParser.setErrorHandler((e) => errors.push(e));
          try {
            res = BibtexParser.parseToJSON(c)?.[0];
          } catch (e) {
            errors.push(String(e));
          }
          return res ?? { type: 'error', id: '', raw: c, errors };
        });
        return `export default ${JSON.stringify(parsed)}`;
      }
    }
  } satisfies Plugin;
};

export default transformAssets;