import { usePageContext } from "vike-react/usePageContext";
import { defaultLocale, LocaleRecord } from ".";
import { useCallback } from "react";
import { BASE_PATH } from "../url";
import urlJoin from 'url-join';

export const useWithLocale = () => {
  const { locale, languageCode, urlLogical } = usePageContext() as unknown as LocaleRecord;

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