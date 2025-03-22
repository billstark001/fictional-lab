import fsPromises from "fs/promises";
import { defaultLocale } from "../locale";
import path from "path";

const localePattern = /(.+?)(?:\.(\w\w)(?:-(\w\w))?)?\.(\w+)$/;
const defaultExtensionOrder = ['md'] as const;


export const sepLangAndExtension = (filename: string) => {
  const exec = localePattern.exec(filename);
  if (!exec) {
    return { name: filename, lang: defaultLocale, langCode: defaultLocale, ext: '' };
  }
  const [, name, _lang, , ext] = exec;
  const lang = _lang || defaultLocale;
  const langCode = lang.length > 2 ? lang.slice(0, 2) : lang;

  return {
    name,
    lang,
    langCode,
    ext,
  };
};

export async function listAllSubdirectories(
  directory: string
): Promise<string[]> {

  const subdirectories = [];
  const entries = await fsPromises.readdir(directory, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const fullPath = path.normalize(path.join(directory, entry.name) + '/');
      subdirectories.push(fullPath);

      const childDirs = await listAllSubdirectories(fullPath);
      subdirectories.push(...childDirs);
    }
  }

  return subdirectories;
}
export async function listAllFiles(
  directory: string
): Promise<string[]> {

  const files: string[] = [];
  const subdirectories = await listAllSubdirectories(directory);
  subdirectories.splice(0, 0, directory);

  for (const dir of subdirectories) {
    const filenames = await fsPromises.readdir(dir);
    for (const filename of filenames) {
      files.push(path.normalize(path.join(dir, filename)));
    }
  }

  return files;
}

export class FileByLanguageRecord {
  private record: Record<string, Record<string, string>>;
  private readonly extensionOrder: readonly string[];

  constructor(extensionOrder?: readonly string[]) {
    this.record = {};
    this.extensionOrder = extensionOrder?.length
      ? extensionOrder
      : defaultExtensionOrder;
  }

  add(filename: string) {
    const { name, lang, langCode, ext } = sepLangAndExtension(filename);

    if (!this.extensionOrder.includes(ext)) {
      // no need to add
      return;
    }

    // ensure record existence
    if (!this.record[name]) {
      this.record[name] = {};
    }

    // write back the current record
    if (langCode && !this.record[name][langCode]) {
      this.record[name][langCode] = filename;
    }
    if (!this.record[name][lang]) {
      this.record[name][lang] = filename;
    }

    return { name, lang, langCode, ext };
  }

  clear() {
    this.record = {};
  }

  remove(filename: string) {
    const { name, lang, langCode, ext } = sepLangAndExtension(filename);
    
    if (!this.extensionOrder.includes(ext) || !this.record[name]) {
      // no record is necessary
      return;
    }

    // clear record
    if (this.record[name][lang] === filename) {
      delete this.record[name][lang];
    }
    if (this.record[name][langCode] === filename) {
      delete this.record[name][langCode];
    }

    if (Object.keys(this.record[name]).length === 0) {
      delete this.record[name];
    }
  }

  getRecord() {
    const record: Record<string, Record<string, string>> = {};
    for (const fn in this.record) {
      record[fn] = { ...this.record[fn] };
    }
    return record;
  }
}

export const buildLanguageRecord = (
  filenames: string[],
  extensionOrder?: string[]
) => {
  const filtered: Record<string, Record<string, string>> = {};

  for (const filename of filenames) {
    const { name, lang, langCode, ext } = sepLangAndExtension(filename);

    if (!(extensionOrder ?? defaultExtensionOrder).includes(ext as any)) {
      continue;
    }

    // ensure record existence
    if (!filtered[name]) {
      filtered[name] = {};
    }

    // write back the current record
    if (langCode && !filtered[name][langCode]) {
      filtered[name][langCode] = filename;
    }
    if (!filtered[name][lang]) {
      filtered[name][lang] = filename;
    }
  }

  return filtered;
};