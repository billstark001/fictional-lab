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
    const r = extractLocale(location.pathname, location.href, BASE_PATH_NO_TRAILING_SLASH);
    setLocaleRecordOverride(r);
  }, []);
  return localeRecordOverride;
};