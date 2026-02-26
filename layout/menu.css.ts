import { style, globalStyle } from '@vanilla-extract/css';

export const menuContainerFixed = style({
  zIndex: 300,
  position: 'fixed',
});

export const menuWrapper = style({
  backgroundColor: 'var(--gray-95)',
  border: '1px solid var(--gray-60)',
  boxShadow: '0 0 20px #00000030',
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  minWidth: '60px',
  minHeight: '16px',
  borderRadius: '10px',
});

globalStyle(`${menuWrapper}.top-left`, { top: 'var(--menu-v, 0px)', left: 'var(--menu-h, 0px)' });
globalStyle(`${menuWrapper}.top-right`, { top: 'var(--menu-v, 0px)', right: 'var(--menu-h, 0px)' });
globalStyle(`${menuWrapper}.bottom-left`, { bottom: 'var(--menu-v, 0px)', left: 'var(--menu-h, 0px)' });
globalStyle(`${menuWrapper}.bottom-right`, { bottom: 'var(--menu-v, 0px)', right: 'var(--menu-h, 0px)' });

globalStyle(`${menuWrapper} > .menu-item`, { padding: '10px 18px' });
globalStyle(`${menuWrapper} > .menu-item:nth-child(1n+2)`, {
  borderTop: '1px solid var(--gray-80)',
});
