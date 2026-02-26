import { LinkProps } from "./Link";
import useIsClient from "@/lib/react/useIsClient";
import useWithLocale from "@/lib/locale/useWithLocale";
import { matchLink } from "@/lib/url";
import cx from 'clsx';
import * as styles from './linkbar.css';

export function LinkBar({ to, label, subs, className, locale, urlLogical, exactMatch, ...rest }: LinkProps & { locale: string, urlLogical: string }) {
  const isActive = matchLink(urlLogical, to, exactMatch);
  const isClient = useIsClient();
  const withLocale = useWithLocale();

  return (
    <div
      className={cx(styles.linkAnchorContainer, isActive && 'match', className)}
      {...rest}
    >
      <a className={styles.linkAnchor} href={withLocale(to, locale)}>
        {label}
      </a>
      {isClient && !!subs?.length && (
        <div className={styles.dropdownMenuContainer}>
          {subs.map(x => (
            <div
              key={x.to}
              className={cx(styles.dropdownMenuItem, matchLink(urlLogical, x.to, x.exactMatch) && 'match')}
            >
              <a href={withLocale(x.to, locale)}>
                {x.label}
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LinkBar;
