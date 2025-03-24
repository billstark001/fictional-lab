import { styled } from "@linaria/react";
import { cx } from "@linaria/core";
import { LinkProps } from "./Link";
import useWithLocale from "@/lib/locale/useWithLocale";
import { matchLink } from "@/lib/url";

const MenuItemContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const MainMenuItem = styled.a`
  display: block;
  padding: 16px;
  text-decoration: none;

  font-size: large;

  color: var(--gray-5);
  border-bottom: 1px solid var(--blue-50);

  &.match {
    position: relative;
    padding-left: 24px;
    &::before {
      content: '';
      position: absolute;
      top: 6px;
      bottom: 6px;
      left: 4px;
      width: 6px;
      border-radius: 10000px;
      background-color: var(--blue-40);
    }
  }
`;

const SubMenuItem = styled.a`
  display: block;
  padding: 10px;
  margin-left: 16px;

  text-decoration: none;
  color: var(--gray-20);

  &.match {
    position: relative;
    &::before {
      content: '';
      position: absolute;
      top: 4px;
      bottom: 4px;
      left: -12px;
      width: 6px;
      border-radius: 10000px;
      background-color: var(--blue-50);
    }
  }

  border-top: 1px solid var(--blue-60);
  &:first-child {
    border-top: none;
  }
`;

export function LinkMenu({ to, label, subs, className, locale, urlLogical, exactMatch, ...rest }: LinkProps & { locale: string, urlLogical: string }) {
  const isActive = matchLink(urlLogical, to, exactMatch);
  const withLocale = useWithLocale();
  
  return (
    <MenuItemContainer>
      <MainMenuItem
        href={withLocale(to, locale)}
        className={cx(isActive && "match", className)}
        {...rest}
      >
        {label}
      </MainMenuItem>
      {subs?.length && (
        <div>
          {subs.map(x => (
            <SubMenuItem
              key={x.to}
              href={withLocale(x.to, locale)}
              className={cx(matchLink(urlLogical, x.to, x.exactMatch) && 'match')}
            >
              {x.label}
            </SubMenuItem>
          ))}
        </div>
      )}
    </MenuItemContainer>
  );
}

export default LinkMenu;