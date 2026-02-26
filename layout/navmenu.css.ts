import { style } from '@vanilla-extract/css';

const dark = `[data-theme='dark']`;

export const menuOverlay = style({
  position: 'absolute',
  zIndex: 201,
  right: 0,
  top: 0,
  height: '100vh',
  backgroundColor: 'transparent',
  transition: 'background-color 0.3s ease',
});

export const menuOverlayActive = style({
  left: '-100vw',
  backgroundColor: 'rgba(0,0,0,0.25)',
});

export const menuContainer = style({
  position: 'absolute',
  zIndex: 202,
  top: 0,
  width: '240px',
  right: '-240px',
  height: '100vh',
  overflowY: 'auto',
  backgroundColor: 'var(--blue-95)',
  transition: 'all 0.3s ease',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  justifyContent: 'space-between',
  borderLeft: '1px solid var(--gray-50)',
  boxShadow: '0 0 10px #0003',
  selectors: {
    [`${dark} &`]: { boxShadow: '0 0 10px #fff1' },
  },
});

export const menuContainerActive = style({
  right: 0,
});

export const closeButton = style({
  position: 'absolute',
  right: '1rem',
  top: '1rem',
  border: 'none',
  fontSize: 'x-large',
  padding: '0.25rem',
  boxShadow: 'none',
  background: 'transparent',
  backgroundColor: 'transparent',
});

export const menuFooterContainer = style({
  padding: '20px',
  fontSize: '13px',
});
