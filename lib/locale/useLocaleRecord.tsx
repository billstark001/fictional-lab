import { createContext, useContext, useEffect, useState } from "react";
import extractLocale, { LocaleRecord } from ".";
import { usePageContext } from "vike-react/usePageContext";

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
    const r = extractLocale(location.pathname, location.href);
    setLocaleRecordOverride(r);
  }, []);
  return localeRecordOverride;
};