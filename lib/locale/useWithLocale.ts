import { usePageContext } from "vike-react/usePageContext";
import { defaultLocale, LocaleRecord } from ".";
import { useCallback } from "react";

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

    const newUrl = localeToUse === defaultLocale
      ? href
      : `/${localeToUse}${href}`;

    return newUrl;
  }, [locale, languageCode, urlLogical]);

  return withLocale;
};

export default useWithLocale;