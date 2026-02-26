import { PropsWithChildren, ReactNode, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { IconButton } from "@/lib/components/Buttons";
import { IoMdClose } from "react-icons/io";
import cx from 'clsx';
import * as styles from './navmenu.css';

export const NavMenu = (props: PropsWithChildren<{
  active?: boolean;
  onClose?: () => void;
  footer?: ReactNode;
}>) => {
  const { active, onClose, footer, children } = props;
  const [delayedActive, setDelayedActive] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setDelayedActive(!!active), 100);
    setTimeout(() => setShow(!!active), 1);
  }, [active]);

  if (!active && !delayedActive) {
    return null;
  }

  const isVisible = show && active;

  return ReactDOM.createPortal(
    <>
      <div
        className={cx(styles.menuOverlay, isVisible && styles.menuOverlayActive)}
        onClick={onClose}
      />
      <div className={cx(styles.menuContainer, isVisible && styles.menuContainerActive)}>
        <div />
        <div>{children}</div>
        <div className={styles.menuFooterContainer}>{footer}</div>
        <div />
        <IconButton className={styles.closeButton} onClick={onClose}>
          <IoMdClose />
        </IconButton>
      </div>
    </>,
    document.getElementById('nav-menu-root')!
  );
};

export default NavMenu;
