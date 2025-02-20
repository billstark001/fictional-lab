import { join, relative, dirname } from 'path';
import { Plugin } from 'vite';
import { splitByMarkers } from '../lib/markdown/splitByMarkers';

export type MdImgSplitOptions = {
  root?: string
  publicDir?: string
}

const imgPattern = /^#\s*img\s*:\s*(.+)\s*$/;

export default function mdImgSplit(options?: MdImgSplitOptions) {
  const {
    root = process.cwd(),
    publicDir = 'assets'
  } = options ?? {};

  return {
    name: 'md-img-split',
    transform(code, id) {
      if (!id.endsWith('.md?img')) return;

      const images = splitByMarkers(code, imgPattern, (s) => s);

      const importStatements: string[] = [];
      const sections: string[] = [];
      
      // eslint-disable-next-line prefer-const
      for (let [importPath, content] of images.sections) {
        
        if (importPath.startsWith('/')) {
          importPath = importPath.substring(1);
        }
        const publicPath = join(root, publicDir, importPath);
        const relativePath = relative(dirname(id), publicPath);

        const imgId = importStatements.length;
        importStatements.push(`import _img${imgId} from ${JSON.stringify(relativePath + '?url')}`);
        sections.push(`  [_img${imgId}, ${JSON.stringify(content)}], `);

      }

      const codes = [...importStatements];
      codes.push('export const sections = [');
      codes.push(...sections);
      codes.push(']');

      codes.push('export const header = ' + JSON.stringify(images.header));

      codes.push('export default sections');
    
      return codes.join('\n');
    }
  } satisfies Plugin;
}