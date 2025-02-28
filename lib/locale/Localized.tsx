import { PropsWithChildren, ReactNode } from "react";
import { LocaleRecord, defaultLocale } from ".";
import { useLocaleRecord } from "./useLocaleRecord";

export const Localized = (props: PropsWithChildren<{
  match?: string;
}> | {
  match?: undefined;
  children: (props: LocaleRecord) => ReactNode | string;
}) => {
  const { locale, languageCode, areaCode, urlLogical } = useLocaleRecord();

  // eslint-disable-next-line prefer-const
  let { match, children } = props;

  if (typeof children === 'function') {
    return children({ locale, languageCode, areaCode, urlLogical });
  }

  match = match || defaultLocale;

  if (match.length === 2 && languageCode === match) {
    return <>{children}</>;
  }

  if (match === locale || match.startsWith(languageCode)) {
    return <>{children}</>;
  }

  return undefined;
};

export default Localized;