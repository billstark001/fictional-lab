import fs from "fs";
import fsPromises from "fs/promises";
import { extensionOrder } from "./defs";
import { defaultLocale } from "@/lib/locale";

const localePattern = /(.+?)(?:.(\w\w)(?:-(\w\w))?)?\.(\w+)$/;

// Sync version
export const enumerateSync = (dir: string) => {
  const filenames = fs.readdirSync(dir);
  const filtered: Record<string, Record<string, string>> = {};

  for (const filename of filenames) {
    const exec = localePattern.exec(filename);
    if (!exec) {
      continue;
    }
    const [, name, _lang, , ext] = exec;
    const lang = _lang || defaultLocale;
    if (!extensionOrder.includes(ext as any)) {
      continue;
    }
    if (!filtered[name]) {
      filtered[name] = { [lang]: filename };
    } else if (!filtered[name][lang]) {
      filtered[name][lang] = filename;
    }
  }

  return filtered;
};

// Async version
export const enumerate = async (dir: string) => {
  const filenames = await fsPromises.readdir(dir);
  const filtered: Record<string, Record<string, string>> = {};

  for (const filename of filenames) {
    const exec = localePattern.exec(filename);
    if (!exec) {
      continue;
    }
    const [, name, _lang, , ext] = exec;
    const lang = _lang || defaultLocale;
    if (!extensionOrder.includes(ext as any)) {
      continue;
    }
    if (!filtered[name]) {
      filtered[name] = { [lang]: filename };
    } else if (!filtered[name][lang]) {
      filtered[name][lang] = filename;
    }
  }

  return filtered;
};

export default enumerate;