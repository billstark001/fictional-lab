import { LinkProps } from "./Link";
import useWithLocale from "@/lib/locale/useWithLocale";
import { matchLink } from "@/lib/url";
import * as styles from './linkmenu.css';

export function LinkMenu({ to, label, subs, className, locale, urlLogical, exactMatch, ...rest }: LinkProps & { locale: string, urlLogical: string }) {
  const isActive = matchLink(urlLogical, to, exactMatch);
  const withLocale = useWithLocale();

  return (
    <div className={styles.menuItemContainer}>
      <a
        href={withLocale(to, locale)}
        className={[styles.mainMenuItem, isActive && 'match', className].filter(Boolean).join(' ')}
        {...rest}
      >
        {label}
      </a>
      {subs?.length && (
        <div>
          {subs.map(x => (
            <a
              key={x.to}
              href={withLocale(x.to, locale)}
              className={[styles.subMenuItem, matchLink(urlLogical, x.to, x.exactMatch) && 'match'].filter(Boolean).join(' ')}
            >
              {x.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default LinkMenu;
