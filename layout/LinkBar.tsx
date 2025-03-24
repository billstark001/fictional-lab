import { cx } from "@linaria/core";
import { styled } from "@linaria/react";
import { LinkProps } from "./Link";
import useIsClient from "@/lib/react/useIsClient";
import useWithLocale from "@/lib/locale/useWithLocale";
import { matchLink } from "@/lib/url";

const DropdownMenuContainer = styled.div`
  --menu-width: 240px;
  z-index: 60;
  position: absolute;
  top: calc(100% + 6px);
  left: calc(50% - var(--menu-width) * 0.5);
  width: var(--menu-width);
  height: max-content;
  max-height: 0px;
  overflow: hidden;
  background-color: var(--blue-60);
  color: var(--gray-5);
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.1);
  transition: max-height 1.2s ease;
`;

const DropdownMenuItem = styled.div`
  width: 100%;
  &:not(:last-child) {
    border-bottom: 1px solid var(--gray-40);
  }
  --left-color: var(--blue-50);
  padding: 12px 8px 12px 16px;
  position: relative;
  display: block;

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    content: '';
    height: 100%;
    width: 6px;
    background-color: var(--left-color);
  }

  & a {
    text-decoration: none;
    color: inherit;
    display: block;
  }

  &.match {
    --left-color: var(--blue-5);
  }
`;

const LinkAnchorContainer = styled.div`
  position: relative;

  padding-top: 2px;

  --underscore-color: var(--blue-40);
  --underscore-length: 0%;
  --underscore-pos: 50%;
  --underscore-thickness: 2px;

  .transparent & {
    color: inherit;
    --underscore-color: currentColor;
  }

  &::after {
    content: '';
    border-radius: 10000px;
    border-bottom: var(--underscore-thickness) solid var(--underscore-color);
    position: absolute;
    bottom: -3px;
    left: var(--underscore-pos, 50%);
    width: var(--underscore-length, 0%);
    transition: width 0.3s ease, left 0.3s ease;
  }

  &:hover {
    --underscore-length: 50%;
    --underscore-pos: 25%;

    ${DropdownMenuContainer} {
      display: block;
      max-height: 1000px;
    }
  }

  &.match {
    --underscore-length: 100%;
    --underscore-pos: 0%;
    --underscore-thickness: 4px;
  }
`;

const LinkAnchor = styled.a`
  padding: 3px 10px;
  color: inherit;
  &:hover {
    color: inherit;
  }
`;

export function LinkBar({ to, label, subs, className, locale, urlLogical, exactMatch, ...rest }: LinkProps & { locale: string, urlLogical: string }) {
  const isActive = matchLink(urlLogical, to, exactMatch);
  const isClient = useIsClient();
  const withLocale = useWithLocale();

  return (
    <LinkAnchorContainer
      className={cx(isActive && "match", className)}
      {...rest}
    >
      <LinkAnchor
        href={withLocale(to, locale)}
      >
        {label}
      </LinkAnchor>
      {isClient && !!subs?.length && (
        <DropdownMenuContainer>
          {subs.map(x => (
            <DropdownMenuItem
              key={x.to}
              className={cx(matchLink(urlLogical, x.to, x.exactMatch) && 'match')}
            >
              <a href={withLocale(x.to, locale)}>
                {x.label}
              </a>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContainer>
      )}
    </LinkAnchorContainer>
  );
}

export default LinkBar;