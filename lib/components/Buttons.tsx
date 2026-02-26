import { forwardRef, ButtonHTMLAttributes, HTMLAttributes } from "react";
import * as styles from './components.css';

// #region icon button

export const IconButton = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(function IconButton(props, ref) {
  const { className, ...rest } = props;
  return <button
    ref={ref}
    className={['clickable-icon', styles.iconButton, className].filter(Boolean).join(' ')}
    {...rest}
  />;
});

// #endregion

// #region link button

export const LinkButton = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(function LinkButton({ className, ...props }, ref) {
  return <button
    ref={ref}
    className={[styles.linkButtonFrame, className].filter(Boolean).join(' ')}
    {...props}
  />;
});

// #endregion

export const ButtonGroup = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(function ButtonGroup({ className, ...props }, ref) {
  return <div
    className={[styles.buttonGroupFrame, className].filter(Boolean).join(' ')}
    {...props}
    ref={ref}
  />;
});
