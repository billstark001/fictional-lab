import { defaultLocale } from "../locale";
import splitByMarkers from "./splitByMarkers";

const langPattern = /^#\s*lang(?:uage)?\s*:\s*(default|\w\w|\w\w-\w\w);?\s*$/i;

export const parseLang = (input: string): [string | undefined, string | undefined] => {
  input = input.toLowerCase();
  if (input === 'default') {
    return [undefined, undefined];
  } else if (input.length === 5) {
    return [input.substring(0, 2), input.substring(3, 5).toUpperCase()];
  }
  return [input, undefined];
};

export default function splitByLanguage(md: string, defaultLang?: string) {
  const contents: Record<string, string> = {};
  const newsList = splitByMarkers(md, langPattern, parseLang);
  contents[defaultLocale] = newsList.header;
  for (const [[_locale], content] of newsList.sections) {
    contents[_locale || defaultLang || defaultLocale] = content;
  }
  return contents;
}