import { css, cx } from "@linaria/core";
import { styled } from "@linaria/react";
import { PropsWithChildren, ReactNode, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { darkModeQuery } from "@/lib/theme";
import { IconButton } from "@/lib/components/Buttons";
import { IoMdClose } from "react-icons/io";

const MenuOverlay = styled.div`
  position: absolute;
  z-index: 201;
  right: 0;
  top: 0;
  height: 100vh;
  background-color: transparent;
  transition: background-color 0.3s ease;

  &.active {
    left: -100vw;
    background-color: rgba(0, 0, 0, 0.25);
  }
`;

const MenuContainer = styled.div`
  position: absolute;
  z-index: 202;
  top: 0;
  width: 240px;
  right: -240px;
  height: 100vh;
  overflow-y: auto;
  background-color: var(--blue-95);
  transition: all 0.3s ease;

  &.active {
    right: 0;
  }

  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;

  /* border & shadow */
  border-left: 1px solid var(--gray-50);
  box-shadow: 0 0 10px #0003;
  ${darkModeQuery} & {
    box-shadow: 0 0 10px #fff1;
  }
`;

const closeButton = css`
  position: absolute;
  right: 1rem;
  top: 1rem;

  border: none;
  font-size: x-large;
  padding: 0.25rem;
  box-shadow: none;

  background-color: transparent;
`;

const FooterContainer = styled.div`
  padding: 20px;
  font-size: 13px;
  & a {
    display: block;
    text-decoration: none;
    margin: 8px 0;
  }
`;

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

  return ReactDOM.createPortal(
    <>
      <MenuOverlay 
        className={cx(show && active && 'active')} 
        onClick={onClose}
      />
      <MenuContainer className={cx(show && active && 'active')}>
        <div />
        
        <div>
          {children}
        </div>

        <FooterContainer>
          {footer}
        </FooterContainer>

        <div />

        <IconButton className={closeButton} onClick={onClose}>
          <IoMdClose />
        </IconButton>
      </MenuContainer>
    </>, 
    document.getElementById('nav-menu-root')!
  );
};

export default NavMenu;