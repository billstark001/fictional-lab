import { style, globalStyle } from '@vanilla-extract/css';

export const menuItemContainer = style({
  display: 'flex',
  flexDirection: 'column',
});

export const mainMenuItem = style({
  display: 'block',
  padding: '16px',
  textDecoration: 'none',
  fontSize: 'large',
  color: 'var(--gray-5)',
  borderBottom: '1px solid var(--blue-50)',
});

globalStyle(`${mainMenuItem}.match`, {
  position: 'relative',
  paddingLeft: '24px',
});

globalStyle(`${mainMenuItem}.match::before`, {
  content: "''",
  position: 'absolute',
  top: '6px',
  bottom: '6px',
  left: '4px',
  width: '6px',
  borderRadius: '10000px',
  backgroundColor: 'var(--blue-40)',
});

export const subMenuItem = style({
  display: 'block',
  padding: '10px',
  marginLeft: '16px',
  textDecoration: 'none',
  color: 'var(--gray-20)',
  borderTop: '1px solid var(--blue-60)',
  selectors: {
    '&:first-child': { borderTop: 'none' },
  },
});

globalStyle(`${subMenuItem}.match`, { position: 'relative' });

globalStyle(`${subMenuItem}.match::before`, {
  content: "''",
  position: 'absolute',
  top: '4px',
  bottom: '4px',
  left: '-12px',
  width: '6px',
  borderRadius: '10000px',
  backgroundColor: 'var(--blue-50)',
});
