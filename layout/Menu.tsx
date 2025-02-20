import { useCallbackRef } from "@/lib/react/useCallbackRef";
import { cx } from "@linaria/core";
import { styled } from "@linaria/react";
import { HTMLAttributes, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const MenuContainer = styled.div`
  z-index: 300;
  position: fixed;
`;

export type MenuWrapperProps = {
  variation: 'top-left' | 'bottom-left' | 'top-right' | 'bottom-right';
  h: number;
  v: number;
};

const MenuWrapper = styled.div<MenuWrapperProps>`
  background-color: var(--gray-7);
  border: 1px solid var(--gray-5);
  box-shadow: 0 0 20px #00000030;

  display: flex;
  flex-direction: column;

  position: absolute;

  min-width: 60px;
  min-height: 16px;

  &.top-left {
    top: ${p => p.v}px;
    left: ${p => p.h}px;
  }

  &.top-right {
    top: ${p => p.v}px;
    right: ${p => p.h}px;
  }

  &.bottom-left {
    bottom: ${p => p.v}px;
    left: ${p => p.h}px;
  }

  &.bottom-right {
    bottom: ${p => p.v}px;
    right: ${p => p.h}px;
  }

  border-radius: 10px;

  & > .menu-item {
    padding: 10px 18px;
  }

  & > .menu-item:nth-child(1n+2) {
    border-top: 1px solid var(--gray-6);
  }

`;

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
    onClose, onOpen, onToggle,
    h = 10, v = 0, variation = 'top-left',
    className,
    ...rest } = props;

  const menuRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useCallbackRef(onClose);
  const getIsOpenRef = useCallbackRef(() => isOpen);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!getIsOpenRef()) {
        return;
      }
      if (!menuRef.current || (e.target && !menuRef.current.contains(e.target as any))) {
        onCloseRef?.();
      }
    };
    document.addEventListener('click', handler);
    return () => {
      document.removeEventListener("click", handler);
    };
  });

  return createPortal(
    <MenuContainer style={{
      left: positionX,
      top: positionY,
    }}>
      <MenuWrapper
        h={h} v={v}
        className={cx(className, variation)}
        {...rest}
        ref={menuRef}
      />
    </MenuContainer>,
    document.getElementById('portal-root')!,
  );
};