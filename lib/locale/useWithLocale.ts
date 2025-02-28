import { defaultLocale } from ".";
import { useCallback } from "react";
import { BASE_PATH } from "../url";
import urlJoin from 'url-join';
import { useLocaleRecord } from "./useLocaleRecord";

export const useWithLocale = () => {
  const { locale, languageCode, urlLogical } = useLocaleRecord();

  const withLocale = useCallback((href?: string, localeOverride?: string) => {

    const localeToUse = localeOverride
      || locale
      || languageCode
      || defaultLocale;

    href = href || urlLogical;

    if (!href.startsWith('/')) {
      href = "/" + href;
    }

    const newUrlParts = localeToUse === defaultLocale
      ? [BASE_PATH, href]
      : [BASE_PATH, localeToUse, href];

    const newUrl = urlJoin(...newUrlParts);

    return newUrl;
  }, [locale, languageCode, urlLogical]);

  return withLocale;
};

export default useWithLocale;