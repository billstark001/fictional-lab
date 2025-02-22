import { cx, css } from "@linaria/core";
import { forwardRef, ButtonHTMLAttributes } from "react";

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
    `,
    className,
  )} {...rest} />;
});

export default IconButton;