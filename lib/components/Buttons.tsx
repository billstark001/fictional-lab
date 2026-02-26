import { forwardRef, ButtonHTMLAttributes, HTMLAttributes } from "react";
import cx from 'clsx';
import * as styles from './components.css';

// #region icon button

export const IconButton = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(function IconButton(props, ref) {
  const { className, ...rest } = props;
  return <button
    ref={ref}
    className={cx('clickable-icon', styles.iconButton, className)}
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
    className={cx(styles.linkButtonFrame, className)}
    {...props}
  />;
});

// #endregion

export const ButtonGroup = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(function ButtonGroup({ className, ...props }, ref) {
  return <div
    className={cx(styles.buttonGroupFrame, className)}
    {...props}
    ref={ref}
  />;
});
