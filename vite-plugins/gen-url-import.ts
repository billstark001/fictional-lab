import { Plugin } from "vite";
import fs from "fs";
import fsPromises from 'fs/promises';
import path from "path";
import getFirstCodeFence from "../lib/markdown/getFirstCodeFence";
import parseMetadata, { Metadata } from "../lib/metadata/parseMetadata";
import yaml from 'js-yaml';

function generateImportScript(strings: string[]): string {
  // Helper to generate a unique variable name based on the input string
  const toVariableName = (s: string) =>
    s.replace(/[^a-zA-Z0-9]/g, "_").replace(/^(\d)/, "_$1");

  // Generate import statements and map entries
  const imports = strings.map((s) => {
    const variableName = toVariableName(s);
    return `import ${variableName} from ${JSON.stringify(s + "?url")};`;
  });

  const recordEntries = strings.map((s) => {
    const variableName = toVariableName(s);
    return `  ${JSON.stringify(s)}: ${variableName}`;
  });

  // Combine everything into the final file content
  return `
${imports.join("\n")}

export const assets = {
${recordEntries.join(",\n")}
};

export default assets;
  `.trim();
}

async function extractMarkdownResources(filename: string, basePath?: string) {
  const file = await fsPromises.readFile(
    basePath
      ? path.join(basePath, filename)
      : filename
    );

  const links = new Set<string>();

  // parse metadata
  const [metadataStr] = getFirstCodeFence(file.toString(), 'metadata', true);
  const metadata: Metadata = {} as unknown as Metadata;
  try {
    const _metadata = yaml.load(metadataStr || '{}');
    Object.assign(metadata, parseMetadata(_metadata as any));
  } catch {
    // do nothing
  }

  if (metadata.image) {
    const _i = metadata.image.startsWith('/')
      ? '.' + metadata.image
      : './' + metadata.image;
    links.add(_i);
  }

  return [...links];
}

export type GenUrlImportsOptions = {
  moduleId: string;
  matchDirs: string[];
};


export default function genUrlImports(options?: Partial<GenUrlImportsOptions>) {
  const {
    moduleId = 'url',
    matchDirs = [],
  } = options ?? {};

  const resolvedModuleId = `${moduleId}.url-gen`;
  const resolvedModuleId2 = 'virtual:' + resolvedModuleId;

  const fileCache = new Map<string, string[]>();
  let mergedCache: string | undefined = undefined;

  const constructFullRecord = async (add?: (path: string) => void) => {
    for (const dir of matchDirs) {
      const fullPath = path.join(process.cwd(), dir);
      if (!fs.existsSync(fullPath)) {
        console.warn('Directory does not exist:', fullPath);
        continue;
      }
      add?.(fullPath);
      // temporary solution
      // the watcher-based one is faulty for unknown reason
      const files = await fsPromises.readdir(fullPath);
      for (const f of files) {
        const fullFile = path.join(fullPath, f);
        fileCache.set(fullFile, await extractMarkdownResources(fullFile));
      }
    }
  };

  // temporary solution
  constructFullRecord();

  return {
    name: 'gen-url-imports',

    resolveId(id) {
      if (id === resolvedModuleId) {
        return resolvedModuleId2;
      }
    },

    async load(id) {
      if (id !== resolvedModuleId2) {
        return;
      }
      if (mergedCache != undefined) {
        return mergedCache;
      }
      const files: string[] = [];
      fileCache.forEach((f) => files.push(...f));
      mergedCache = generateImportScript(files);
      return mergedCache;
    },

    async configureServer(server) {
      const watcher = server.watcher;

      constructFullRecord((p) => watcher.add(p));

      watcher.on('add', async (file) => {
        console.log('file added:', file);
        if (!file.toLowerCase().endsWith('.md')) {
          return;
        }
        fileCache.set(file, await extractMarkdownResources(file));
        mergedCache = undefined;
      });
      
      watcher.on('unlink', async (file) => {
        console.log('file removed:', file);
        if (!file.toLowerCase().endsWith('.md')) {
          return;
        }
        if (fileCache.has(file)) {
          fileCache.delete(file);
          mergedCache = undefined;
        }
      });
      
      watcher.on('change', async (file) => {
        console.log('file changed:', file);
        if (!file.toLowerCase().endsWith('.md')) {
          return;
        }
        fileCache.set(file, await extractMarkdownResources(file));
        mergedCache = undefined;
      });
    },
  } satisfies Plugin;
}