import { PropsWithChildren, ReactNode } from "react";
import { usePageContext } from "vike-react/usePageContext";
import { LocaleRecord, defaultLocale } from ".";

export const Localized = (props: PropsWithChildren<{
  match?: string;
}> | {
  match?: undefined;
  children: (props: LocaleRecord) => ReactNode | string;
}) => {
  const pageContext = usePageContext();
  const { locale, languageCode, areaCode, urlLogical } = pageContext as unknown as LocaleRecord;

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