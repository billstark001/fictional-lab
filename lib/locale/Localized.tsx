import { PropsWithChildren, ReactNode } from "react";
import { LocaleRecord } from ".";
import { useLocaleRecord } from "./useLocaleRecord";

export const Localized = (props: PropsWithChildren<{
  [match: string]: ReactNode | string | undefined;
}> | {
  children: (props: LocaleRecord) => ReactNode | string;
}) => {
  const { locale, languageCode, areaCode, urlLogical } = useLocaleRecord();

  // mode 1: render by function
  const { children } = props;

  if (typeof children === 'function') {
    return children({ locale, languageCode, areaCode, urlLogical });
  }

  // mode 2: render by props
  let matchedMatch: string | undefined;
  for (const match of Object.keys(props)) {
    if (!match) {
      continue;
    }
    if (match.length === 2 && languageCode === match) {
      matchedMatch = match;
    }
    if (match === locale || match.startsWith(languageCode)) {
      matchedMatch = match;
    }
  }
  if (matchedMatch) {
    return (props as any)[matchedMatch];
  }

  return children;
};

export default Localized;