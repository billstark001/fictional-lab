import { styled } from '@linaria/react';
import { FaBars, FaBarsStaggered } from "react-icons/fa6";
import { darkModeQuery } from '@/lib/theme';
import { css, cx } from '@linaria/core';
import { useEffect, useRef, useState } from 'react';
import { mediaQueryMoreOrEqual, mediaQueryLessOrEqual } from '@/lib/responsive';
import { useDisclosure } from '@/lib/react/useDisclosure';
import { framedByMaxWidth } from './style';
import { throttle } from "throttle-debounce";

// import logoC from '../assets/img/logo_c.png';
// import logoW from '../assets/img/logo_w.png';
import NavMenu from './NavMenu';
import { IconButton } from '@/lib/components/Buttons';
import Settings from './Settings';
import Links from './Links';
import useWithLocale from '@/lib/locale/useWithLocale';

const NavBarContainer = styled.div`
  position: fixed;
  top: 0; 
  width: 100%;
  background-color: var(--gray-7);
  border-bottom: 1px solid var(--gray-5);
  z-index: 50;

  backdrop-filter: blur(10px);
  transition: background-color 0.1 ease;
  box-shadow: 0 0 10px #0003;

  ${darkModeQuery} & {
    box-shadow: 0 0 10px #fff1;
  }

  &.transparent {
    background-color: #ffffff18;
    color: black;
    border-bottom: 1px solid dimgray;

    ${darkModeQuery} & {
      background-color: #00000018;
      color: white;
    }
  }
`;

const NavBarWrapper = styled.div`
  padding: 20px;
  height: 80px;
  ${framedByMaxWidth}

  ${mediaQueryLessOrEqual('sm')} {
    height: 64px;
    padding: 16px;
  }

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  line-height: 1.8em;

  & > .container {
    display: flex;
    gap: 10px;
  }
`;

const LogoWrapper = styled.div`
  /* width: 240px; */
  font-size: 48px;
  font-weight: bold;
  font-family: 'Times New Roman', Times, serif;
  height: min-content;
  line-height: 100%;
  img {
    width: 100%;
    height: 100%;
  }

  ${mediaQueryLessOrEqual('sm')} {
    font-size: 36px;
  }
`;

export function Logo() {
  return (
    <LogoWrapper>
      Fictional Lab
      {/* <img src={variation === 'colorful' ? logoC : logoW} /> */}
    </LogoWrapper>
  );
}


const hideOnLgSize = css`
  ${mediaQueryMoreOrEqual('lg')} {
    display: none; 
  }
`;


export function NavBar() {
  const d = useDisclosure();
  const ref = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isTransparent, setIsTransparent] = useState(true);

  useEffect(() => {
    const _h = () => {
      const height = document.documentElement.scrollTop;
      const isTransparent = height < 650;
      setIsTransparent(isTransparent);
    };

    const h = throttle(50, _h);

    _h();
    document.addEventListener('scroll', h);
    return () => {
      document.removeEventListener("scroll", h);
    };
  }, []);

  const withLocale = useWithLocale();

  return (
    <NavBarContainer ref={containerRef} className={cx(isTransparent && 'transparent')}>
      <NavBarWrapper>
        <div className='container'>
          <a href={withLocale('/')} className={css`
            color: inherit;
            transition: opacity 0.1s ease-in-out;
            &:hover { color: inherit; opacity: 0.7; }
            &:active { color: inherit; opacity: 0.8; }
          `}>
            <Logo />
          </a>
        </div>

        <div className='container'>
          <Links />

          <IconButton
            className={hideOnLgSize}
            ref={ref}
            onClick={d.onToggle}
          >
            {d.isOpen ? <FaBarsStaggered /> : <FaBars />}
          </IconButton>
          <NavMenu active={d.isOpen} onClose={d.onClose} footer={
            <div className={css`
              display: flex;
              flex-direction: row;
              gap: 16px;
            `}>
              <Settings />
            </div>
          }>
            <Links isMenu />
          </NavMenu>
        </div>
      </NavBarWrapper>
    </NavBarContainer>
  );
}

export default NavBar;