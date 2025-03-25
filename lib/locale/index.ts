// import { modifyUrl } from "vike/modifyUrl";

export type LocaleRecord = {
  locale: string;
  languageCode: string;
  areaCode?: string;
  urlLogical: string;
};

export const defaultLocale = 'en';
export const supportedLocales = Object.freeze(['en', 'ja', 'zh']);


const localePattern = /\/(\w\w)(?:-(\w\w))?($|\/.*)/;

export function extractLocale(pathname: string): LocaleRecord {

  const execArray = localePattern.exec(pathname);
  if (!execArray) {
    return { locale: defaultLocale, languageCode: defaultLocale, urlLogical: pathname };
  }
  const [, languageCode, areaCode, urlLogicalRaw] = execArray;
  if (!supportedLocales.includes(languageCode)) {
    // unsupported
    return { locale: defaultLocale, languageCode: defaultLocale, urlLogical: pathname };
  }

  const locale = areaCode ? `${languageCode}-${areaCode}` : languageCode;
  // // Reconstruct full URL
  // const urlLogical = modifyUrl(href, { pathname: urlLogicalRaw || '/' }) || '/';

  // it doesn't really need full url
  const urlLogical = urlLogicalRaw.startsWith('/')
    ? urlLogicalRaw
    : ('/' + urlLogicalRaw);

  return {
    locale,
    languageCode,
    areaCode: areaCode || undefined,
    urlLogical,
  };
}

export default extractLocale;