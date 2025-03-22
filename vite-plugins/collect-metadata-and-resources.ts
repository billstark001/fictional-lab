import { Plugin, ViteDevServer } from "vite";
import fs from "fs";
import fsPromises from 'fs/promises';
import path from "path";
import { Metadata } from "../lib/metadata/parseMetadata";
import { ParseMarkdownOptions } from "../lib/markdown/parseMarkdown";
import { FileByLanguageRecord, listAllFiles } from "../lib/file";
import { defaultLocale } from "../lib/locale";
import parseHtml from "../lib/html/parseHtml";
import { extractMarkdownResources } from "../lib/markdown/extractMarkdownResources";

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

  const ret = `
${imports.join("\n")}

export const assets = {
${entries.join(",\n")}
};

export default assets;
  `.trim();

  return ret;
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

async function extractResourcesFromFile(
  filename: string,
  basePath?: string,
  lang?: string,
  parseMarkdownOptions?: Readonly<Partial<ParseMarkdownOptions>>,
) {
  const currentFullPath = basePath
    ? path.join(basePath, filename)
    : filename;
  const { name: pureFileName, ext } = path.parse(path.basename(filename));
  const file = await fsPromises.readFile(currentFullPath);
  const stat = await fsPromises.stat(currentFullPath);

  const metadata: Partial<Metadata> = {
    lang: lang || defaultLocale,
    created: stat.birthtime.getTime(),
    updated: stat.mtime.getTime(),
  };

  if (ext === '.md') {
    const ret = extractMarkdownResources(file.toString(), {
      initialMetadata: metadata,
      ...parseMarkdownOptions,
    });
    if (parseMarkdownOptions?.parseTitle) {
      ret.metadata.title ||= pureFileName;
    }
    return ret;
  } else {
    const parsed = parseHtml(file.toString(), metadata);
    if (parseMarkdownOptions?.parseTitle) {
      parsed.metadata.title ||= pureFileName;
    }
    return { metadata: parsed.metadata, links: undefined };
  }
}

export type CollectMetadataAndResourcesOptions = {
  moduleId: string;
  matchDirs: readonly string[];
  parseMarkdownOptions?: Readonly<Partial<ParseMarkdownOptions>>;
  extensions?: readonly string[];
};

export default function collectMetadataAndResources(options?: Partial<CollectMetadataAndResourcesOptions>) {
  const {
    moduleId = 'url',
    matchDirs = [],
    parseMarkdownOptions,
    extensions = ['md'],
  } = options ?? {};

  const importUrlModuleId = `${moduleId}.url-gen`;
  const importMetaModuleId = `${moduleId}.meta-gen`;
  const importLangModuleId = `${moduleId}.lang-gen`;
  const resolvedUrlModuleId = 'virtual:' + importUrlModuleId;
  const resolvedMetaModuleId = 'virtual:' + importMetaModuleId;
  const resolvedLangModuleId = 'virtual:' + importLangModuleId;

  const urlCache = new Map<string, string[]>();
  let urlModule: string | undefined = undefined;

  const metadataCache = new Map<string, Metadata>();
  let metadataModule: string | undefined = undefined;

  const languageRecord = new FileByLanguageRecord(extensions);
  let languageModule: string | undefined = undefined;

  const invalidate = () => {
    urlModule = undefined;
    metadataModule = undefined;
    languageModule = undefined;

    if (devServer?.moduleGraph) {
      const module = devServer.moduleGraph.getModuleById(resolvedUrlModuleId);
      if (module) {
        devServer.reloadModule(module);
      }
      const module2 = devServer.moduleGraph.getModuleById(resolvedMetaModuleId);
      if (module2) {
        devServer.reloadModule(module2);
      }
      const module3 = devServer.moduleGraph.getModuleById(resolvedLangModuleId);
      if (module3) {
        devServer.reloadModule(module3);
      }
    }
  };

  let devServer: ViteDevServer;


  const reconstructSingleRecord = async (filePath: string, remove?: boolean) => {
    if (!remove) {
      const { lang } = languageRecord.add(filePath) ?? { lang: defaultLocale };
      const { metadata, links } = await extractResourcesFromFile(
        filePath, undefined, lang, parseMarkdownOptions
      );
      urlCache.set(filePath, links ?? []);
      metadataCache.set(filePath, metadata);
    } else {
      urlCache.delete(filePath);
      metadataCache.delete(filePath);
      languageRecord.remove(filePath);
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
      const files = await listAllFiles(fullPath);
      for (const fullFile of files) {
        reconstructSingleRecord(fullFile);
      }
    }
    invalidate();
  };

  constructFullRecord();

  return {
    name: 'collect-metadata-and-resources',

    resolveId(id) {
      if (id === importUrlModuleId) {
        return resolvedUrlModuleId;
      }
      if (id === importMetaModuleId) {
        return resolvedMetaModuleId;
      }
      if (id === importLangModuleId) {
        return resolvedLangModuleId;
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
      if (id === resolvedLangModuleId) {
        if (languageModule == undefined) {
          languageModule = `export default ${JSON.stringify(languageRecord.getRecord())}`;
        }
        return languageModule;
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