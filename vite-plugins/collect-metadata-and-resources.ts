import { Plugin, ViteDevServer } from "vite";
import fs from "fs";
import fsPromises from 'fs/promises';
import path from "path";
import { Metadata } from "../lib/metadata/parseMetadata";
import { extractHtmlImages, extractMarkdownImages } from "../lib/markdown/extractImages";
import parseMarkdown, { ParseMarkdownOptions } from "../lib/markdown/parseMarkdown";

const _v = () => {
  let varCount = 0;
  const nameDict: Record<string, string> = {};
  // s.replace(/[^a-zA-Z0-9]/g, "_").replace(/^(\d)/, "_$1");
  const toVariableName = (s: string) => {
    if (!nameDict[s]) {
      nameDict[s] = `var_${varCount}`;
      varCount++;
    }
    return nameDict[s];
  };
  return toVariableName;
};

function generateUrlModule(strings: string[]): string {

  const toVariableName = _v();
  const imports: string[] = [];
  const entries: string[] = [];
  for (const s of strings) {
    const variableName = toVariableName(s);
    imports.push(
      `import ${variableName} from ${JSON.stringify(s + "?url")};`
    );
    entries.push(
      `  ${JSON.stringify(s)}: ${variableName}`
    );
  }

  return `
${imports.join("\n")}

export const assets = {
${entries.join(",\n")}
};

export default assets;
  `.trim();
}



function generateMetadataModule(metadataMap: ReadonlyMap<string, Metadata>): string {

  const toVariableName = _v();
  const data: string[] = [];
  const entries: string[] = [];
  for (const [s, m] of metadataMap.entries()) {
    const variableName = toVariableName(s);
    data.push(
      `const ${variableName} = ${JSON.stringify(m)};`
    );
    entries.push(
      `  ${JSON.stringify(s)}: ${variableName}`
    );
  }

  return `
${data.join("\n")}

export const metadata = {
${entries.join(",\n")}
};

export default metadata;
  `.trim();
}

async function extractMarkdownResources(
  filename: string, 
  basePath?: string, 
  parseMarkdownOptions?: Readonly<Partial<ParseMarkdownOptions>>,
) {
  const file = await fsPromises.readFile(
    basePath
      ? path.join(basePath, filename)
      : filename
    );

  const links = new Set<string>();
  const addImage = (image?: string) => {
    if (!image || image.startsWith('/public/')) {
      return;
    }
    const _i = image.startsWith('/')
      ? '.' + image
      : './' + image;
    links.add(_i);
  };

  // parse metadata
  const { metadata, text: remainingText } = parseMarkdown(
    file.toString(), 
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

  return { metadata, links: [...links] };
}

export type CollectMetadataAndResourcesOptions = {
  moduleId: string;
  matchDirs: string[];
  parseMarkdownOptions?: Readonly<Partial<ParseMarkdownOptions>>;
};

export default function collectMetadataAndResources(options?: Partial<CollectMetadataAndResourcesOptions>) {
  const {
    moduleId = 'url',
    matchDirs = [],
    parseMarkdownOptions,
  } = options ?? {};

  const importUrlModuleId = `${moduleId}.url-gen`;
  const importMetaModuleId = `${moduleId}.meta-gen`;
  const resolvedUrlModuleId = 'virtual:' + importUrlModuleId;
  const resolvedMetaModuleId = 'virtual:' + importMetaModuleId;

  const urlCache = new Map<string, string[]>();
  let urlModule: string | undefined = undefined;

  const metadataCache = new Map<string, Metadata>();
  let metadataModule: string | undefined = undefined;

  const invalidate = () => {
    urlModule = undefined;
    metadataModule = undefined;
    
    if (devServer?.moduleGraph) {
      const module = devServer.moduleGraph.getModuleById(resolvedUrlModuleId);
      if (module) {
        devServer.reloadModule(module);
      }
      const module2 = devServer.moduleGraph.getModuleById(resolvedMetaModuleId);
      if (module2) {
        devServer.reloadModule(module2);
      }
    }
  };

  let devServer: ViteDevServer;

  
  const reconstructSingleRecord = async (filePath: string, remove?: boolean) => {
    if (!remove) {
      const { metadata, links } = await extractMarkdownResources(
        filePath, undefined, parseMarkdownOptions
      );
      urlCache.set(filePath, links);
      metadataCache.set(filePath, metadata);
    } else {
      urlCache.delete(filePath);
      metadataCache.delete(filePath);
    }
  };
  

  const constructFullRecord = async (add?: (path: string) => void) => {
    for (const dir of matchDirs) {
      const fullPath = path.join(process.cwd(), dir);
      if (!fs.existsSync(fullPath)) {
        console.warn('Directory does not exist:', fullPath);
        continue;
      }
      add?.(fullPath);

      // the initial construction requires manual operation
      const files = await fsPromises.readdir(fullPath);
      for (const f of files) {
        const fullFile = path.join(fullPath, f);
        reconstructSingleRecord(fullFile);
      }
    }
    invalidate();
  };

  return {
    name: 'collect-metadata-and-resources',

    resolveId(id) {
      if (id === importUrlModuleId) {
        return resolvedUrlModuleId;
      }
      if (id === importMetaModuleId) {
        return resolvedMetaModuleId;
      }
    },

    async load(id) {
      if (id === resolvedUrlModuleId) {
        if (urlModule == undefined) {
          const files: string[] = [];
          urlCache.forEach((f) => files.push(...f));
          urlModule = generateUrlModule(files);
        }
        return urlModule;
      }
      if (id === resolvedMetaModuleId) {
        if (metadataModule == undefined) {
          metadataModule = generateMetadataModule(metadataCache);
        }
        return metadataModule;
      }
    },

    async configureServer(server) {
      devServer = server;
      const watcher = server.watcher;

      await constructFullRecord((p) => watcher.add(p));

      watcher.on('add', async (file) => {
        if (!file.toLowerCase().endsWith('.md')) {
          return;
        }
        console.log('file added:', file);
        reconstructSingleRecord(file);
        invalidate();
      });
      
      watcher.on('unlink', async (file) => {
        if (!file.toLowerCase().endsWith('.md')) {
          return;
        }
        console.log('file removed:', file);
        reconstructSingleRecord(file, true);
        invalidate();
      });
      
      watcher.on('change', async (file) => {
        if (!file.toLowerCase().endsWith('.md')) {
          return;
        }
        console.log('file changed:', file);
        reconstructSingleRecord(file);
        invalidate();
      });

    },
  } satisfies Plugin;
}