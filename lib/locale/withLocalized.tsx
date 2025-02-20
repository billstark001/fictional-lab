import { usePageContext } from "vike-react/usePageContext";
import { defaultLocale, LocaleRecord } from ".";
import { FC, JSX } from "react";

export const withLocalized = <T extends JSX.IntrinsicAttributes,>(components: {
  [lang: string]: FC<T>;
}): FC<T> => {
  const supportedLanguages = Object.keys(components);
  const defaultComponent = components[defaultLocale]
    || components['default']
    || components[supportedLanguages[0]];
  if (!defaultComponent) {
    throw new Error('No component provided');
  }
  const frozenComponents = { ...components } as const;
  return function LocalizedComponent(props: T) {

    const pageContext = usePageContext();
    const { locale, languageCode } = pageContext as unknown as LocaleRecord;

    const C = frozenComponents[locale] || frozenComponents[languageCode] || defaultComponent;
    return <C {...props} />;
  };
};

export default withLocalized;