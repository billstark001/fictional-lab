import { FaBars, FaBarsStaggered } from "react-icons/fa6";
import { useEffect, useRef, useState } from 'react';
import { useDisclosure } from '@/lib/react/useDisclosure';
import { throttle } from "throttle-debounce";
import NavMenu from './NavMenu';
import { IconButton } from '@/lib/components/Buttons';
import Settings from './Settings';
import Links from './Links';
import useWithLocale from '@/lib/locale/useWithLocale';
import * as styles from './navbar.css';

export function Logo() {
  return (
    <div className={styles.logoWrapper}>
      Fictional Lab
    </div>
  );
}

export function NavBar() {
  const d = useDisclosure();
  const ref = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTransparent, setIsTransparent] = useState(true);

  useEffect(() => {
    const _h = () => {
      setIsTransparent(document.documentElement.scrollTop < 650);
    };
    const h = throttle(50, _h);
    _h();
    document.addEventListener('scroll', h);
    return () => document.removeEventListener('scroll', h);
  }, []);

  const withLocale = useWithLocale();

  const containerClass = [
    styles.navBarContainer,
    isTransparent && styles.navBarContainerTransparent,
  ].filter(Boolean).join(' ');

  return (
    <div ref={containerRef} className={containerClass}>
      <div className={styles.navBarWrapper}>
        <div className={styles.navBarInnerContainer}>
          <a href={withLocale('/')} className={styles.logoLink}>
            <Logo />
          </a>
        </div>
        <div className={styles.navBarInnerContainer}>
          <Links />
          <IconButton
            className={styles.hideOnLgSize}
            ref={ref}
            onClick={d.onToggle}
          >
            {d.isOpen ? <FaBarsStaggered /> : <FaBars />}
          </IconButton>
          <NavMenu active={d.isOpen} onClose={d.onClose} footer={
            <div className={styles.navMenuFooter}>
              <Settings />
            </div>
          }>
            <Links isMenu />
          </NavMenu>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
