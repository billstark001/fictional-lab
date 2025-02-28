import { defaultLocale, supportedLocales } from ".";
import { useCallback } from "react";
import { navigate } from 'vike/client/router';
import { BASE_PATH } from "../url";
import urlJoin from "url-join";
import { useLocaleRecord } from "./useLocaleRecord";

export const useSetLocale = () => {
  const { urlLogical } = useLocaleRecord();

  const setLocale = useCallback((locale: string) => {
    if (locale.length === 5) {
      locale = locale.substring(0, 2);
    }
    locale = locale.toLowerCase();
    locale = supportedLocales.includes(locale)
      ? locale
      : defaultLocale;

    const newUrlParts = locale === defaultLocale
      ? [BASE_PATH, urlLogical]
      : [BASE_PATH, locale, urlLogical];

    const newUrl = urlJoin(...newUrlParts);

    navigate(newUrl);
  }, [urlLogical]);

  return setLocale;
};

export default useSetLocale;