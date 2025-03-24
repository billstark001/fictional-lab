import { framedByMaxWidth } from "@/layout/style";
import { cx, css } from "@linaria/core";
import { styled } from "@linaria/react";
import { forwardRef, ButtonHTMLAttributes, HTMLAttributes } from "react";
import { darkModeQuery } from "../theme";

// #region icon button

export const IconButton = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(function IconButton(props, ref) {
  const { className, ...rest } = props;
  return <button ref={ref} className={cx(
    'clickable-icon',
    css`
      display: flex;
      justify-content: center;
      align-items: center;
      border: inherit;
      background: inherit;
      color: inherit;
      box-shadow: inherit;
      padding: 0.5em 0.6em;
      &:hover, &:active {
        color: white;
      }
      &:focus {
        box-shadow: inherit;
      }
      ${darkModeQuery} & {
        background: inherit;
      }
    `,
    className,
  )} {...rest} />;
});

// #endregion

// #region link button

const LinkButtonFrame = styled.button`

  transition: background-color 0.1s ease-in-out;
  background: transparent;
  background-color: transparent;
  border-radius: 6px;

  :where(&) {
    padding: 0.8em 3.2em;
  }

  &:hover {
    background: transparent;
    background-color: #7771;
  }
  &:active {
    background: transparent;
    background-color: #7772;
  }
  
  ${darkModeQuery} & {
    background: inherit;
  }

  border: 1px solid var(--blue-40);
  color: var(--blue-5);

  display: flex;
  flex-direction: row;
  gap: 8px;

  font-size: large;

  .svg {
    height: 1.2em;
  }
`;

export const LinkButton = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(function LinkButton(props, ref) {
  return <LinkButtonFrame ref={ref} {...props} />;
});

// #endregion



const ButtonGroupFrame = styled.div`
  ${framedByMaxWidth}
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px;
`;

export const ButtonGroup = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(function ButtonGroup(props, ref) {
  return <ButtonGroupFrame {...props} ref={ref} />;
});