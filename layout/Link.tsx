import { HTMLAttributes, ReactNode } from "react";
import LinkMenu from "./LinkMenu";
import LinkBar from "./LinkBar";
import { useLocaleRecord } from "@/lib/locale/useLocaleRecord";

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
  const { locale, urlLogical } = useLocaleRecord();
  
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