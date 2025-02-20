import { usePageContext } from "vike-react/usePageContext";
import { defaultLocale, LocaleRecord, supportedLocales } from ".";
import { useCallback } from "react";
import { navigate } from 'vike/client/router';

export const useSetLocale = () => {
  const { urlLogical } = usePageContext() as unknown as LocaleRecord;

  const setLocale = useCallback((locale: string) => {
    if (locale.length === 5) {
      locale = locale.substring(0, 2);
    }
    locale = locale.toLowerCase();
    locale = supportedLocales.includes(locale)
      ? locale
      : defaultLocale;
    
    const newUrl = locale === defaultLocale
      ? urlLogical
      : `/${locale}${urlLogical}`;
    
    navigate(newUrl);
  }, [urlLogical]);

  return setLocale;
};

export default useSetLocale;