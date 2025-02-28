import { createContext, useContext, useEffect, useState } from "react";
import extractLocale, { LocaleRecord } from ".";
import { usePageContext } from "vike-react/usePageContext";
import { BASE_PATH_NO_TRAILING_SLASH } from "../url";

const LocaleRecordContext = createContext<LocaleRecord | undefined>(undefined);

export const LocaleRecordProvider = LocaleRecordContext.Provider;

export const useLocaleRecord = (): LocaleRecord => {
  const localeRecordContext = useContext(LocaleRecordContext);
  const pageContext = usePageContext() as unknown as LocaleRecord;

  return localeRecordContext ?? pageContext ?? {};
};

export const useDynamicLocaleRecord = () => {
  const [localeRecordOverride, setLocaleRecordOverride] = useState<LocaleRecord>();
  useEffect(() => {
    let pathname = location.pathname;
    const basePath = BASE_PATH_NO_TRAILING_SLASH;
    if (basePath && pathname.startsWith(basePath)) {
      pathname = pathname.slice(basePath.length);
      if (basePath.startsWith('/') && !pathname.startsWith("/")) {
        pathname = '/' + pathname;
      }
    }
    // the 'href' parameter aligns to Vike
    const r = extractLocale(pathname, pathname ?? '');
    setLocaleRecordOverride(r);
  }, []);
  return localeRecordOverride;
};