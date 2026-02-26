import { style } from '@vanilla-extract/css';
import { framedByMaxWidth } from './style';
import { mediaQueryLessOrEqual, mediaQueryMoreOrEqual } from '@/lib/responsive';

const dark = `[data-theme='dark']`;

export const navBarContainer = style({
  position: 'fixed',
  top: 0,
  width: '100%',
  backgroundColor: 'var(--gray-95)',
  borderBottom: '1px solid var(--gray-60)',
  zIndex: 50,
  backdropFilter: 'blur(10px)',
  transition: 'background-color 0.1s ease',
  boxShadow: '0 0 10px #0003',
  selectors: {
    [`${dark} &`]: { boxShadow: '0 0 10px #fff1' },
  },
});

export const navBarContainerTransparent = style({
  backgroundColor: '#ffffff18',
  color: 'black',
  borderBottom: '1px solid dimgray',
  selectors: {
    [`${dark} &`]: {
      backgroundColor: '#00000018',
      color: 'white',
    },
  },
});

export const navBarWrapper = style({
  ...framedByMaxWidth,
  padding: '20px',
  height: '80px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  lineHeight: '1.8em',
  '@media': {
    [mediaQueryLessOrEqual('sm', false)]: { height: '64px', padding: '16px' },
  },
});

export const navBarInnerContainer = style({
  display: 'flex',
  gap: '10px',
});

export const logoWrapper = style({
  fontSize: '48px',
  fontWeight: 'bold',
  fontFamily: "'Times New Roman', Times, serif",
  height: 'min-content',
  lineHeight: '100%',
  '@media': {
    [mediaQueryLessOrEqual('sm', false)]: { fontSize: '36px' },
  },
});

export const logoLink = style({
  color: 'inherit',
  transition: 'opacity 0.1s ease-in-out',
  selectors: {
    '&:hover': { color: 'inherit', opacity: 0.7 },
    '&:active': { color: 'inherit', opacity: 0.8 },
  },
});

export const hideOnLgSize = style({
  '@media': {
    // mediaQueryMoreOrEqual('lg') = min-width: 768px
    [mediaQueryMoreOrEqual('lg', false)]: { display: 'none' },
  },
});

export const navMenuFooter = style({
  display: 'flex',
  flexDirection: 'row',
  gap: '16px',
});
