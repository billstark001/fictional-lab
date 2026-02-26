import { useCallbackRef } from "@/lib/react/useCallbackRef";
import { HTMLAttributes, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import cx from 'clsx';
import * as styles from './menu.css';

export type MenuWrapperProps = {
  variation: 'top-left' | 'bottom-left' | 'top-right' | 'bottom-right';
  h: number;
  v: number;
};

export const Menu = (props: HTMLAttributes<HTMLDivElement> & {
  isOpen?: boolean;
  positionX?: number;
  positionY?: number;
  onClose?: () => void;
  onOpen?: () => void;
  onToggle?: () => void;
} & Partial<MenuWrapperProps>) => {

  if (!props.isOpen) {
    return undefined;
  }

  const {
    isOpen, positionX, positionY,
    onClose,
    h = 10, v = 0, variation = 'top-left',
    className,
    ...rest
  } = props;

  const menuRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useCallbackRef(onClose);
  const getIsOpenRef = useCallbackRef(() => isOpen);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!getIsOpenRef()) return;
      if (!menuRef.current || (e.target && !menuRef.current.contains(e.target as any))) {
        onCloseRef?.();
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  });

  return createPortal(
    <div className={styles.menuContainerFixed} style={{ left: positionX, top: positionY }}>
      <div
        ref={menuRef}
        className={cx(styles.menuWrapper, variation, className)}
        style={{ '--menu-h': `${h}px`, '--menu-v': `${v}px` } as React.CSSProperties}
        {...rest}
      />
    </div>,
    document.getElementById('portal-root')!,
  );
};
