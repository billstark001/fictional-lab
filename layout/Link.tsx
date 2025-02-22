import { HTMLAttributes, ReactNode } from "react";
import { usePageContext } from "vike-react/usePageContext";
import { LocaleRecord } from "@/lib/locale";
import LinkMenu from "./LinkMenu";
import LinkBar from "./LinkBar";

export type LinkDefinition = {
  to: string;
  label: ReactNode;
  onClick?: () => void;
  exactMatch?: boolean;
};

export type LinkProps = Omit<LinkDefinition, 'onClick'> &
  Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
    subs?: [LinkDefinition, ...LinkDefinition[]];
    variant?: 'bar' | 'menu';
  };

export function Link(props: LinkProps) {
  const { variant = 'bar', ...rest } = props;
  const pageContext = usePageContext();
  const { locale, urlLogical } = pageContext as unknown as LocaleRecord;
  
  // Pass the locale information to the specific variant components
  const commonProps = {
    ...rest,
    locale,
    urlLogical,
  };

  if (variant === 'menu') {
    return <LinkMenu {...commonProps} />;
  }
  
  return <LinkBar {...commonProps} />;
}

export default Link;