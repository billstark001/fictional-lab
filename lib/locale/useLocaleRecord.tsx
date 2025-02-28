import { createContext, useContext } from "react";
import { LocaleRecord } from ".";
import { usePageContext } from "vike-react/usePageContext";

const LocaleRecordContext = createContext<LocaleRecord | undefined>(undefined);

export const LocaleRecordProvider = LocaleRecordContext.Provider;

export const useLocaleRecord = (): LocaleRecord => {
  const localeRecordContext = useContext(LocaleRecordContext);
  const pageContext = usePageContext() as unknown as LocaleRecord;

  return localeRecordContext ?? pageContext ?? {};
};
