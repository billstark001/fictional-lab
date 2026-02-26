import { style, globalStyle } from '@vanilla-extract/css';

export const dropdownMenuContainer = style({
  vars: { '--menu-width': '240px' },
  zIndex: 60,
  position: 'absolute',
  top: 'calc(100% + 6px)',
  left: 'calc(50% - var(--menu-width) * 0.5)',
  width: 'var(--menu-width)',
  height: 'max-content',
  maxHeight: '0px',
  overflow: 'hidden',
  backgroundColor: 'var(--blue-60)',
  color: 'var(--gray-5)',
  boxShadow: '0 0 16px rgba(0,0,0,0.1)',
  transition: 'max-height 1.2s ease',
});

export const dropdownMenuItem = style({
  width: '100%',
  vars: { '--left-color': 'var(--blue-50)' },
  padding: '12px 8px 12px 16px',
  position: 'relative',
  display: 'block',
});

globalStyle(`${dropdownMenuItem}:not(:last-child)`, {
  borderBottom: '1px solid var(--gray-40)',
});

globalStyle(`${dropdownMenuItem}::before`, {
  position: 'absolute',
  top: 0,
  left: 0,
  content: "''",
  height: '100%',
  width: '6px',
  backgroundColor: 'var(--left-color)',
});

globalStyle(`${dropdownMenuItem} a`, {
  textDecoration: 'none',
  color: 'inherit',
  display: 'block',
});

globalStyle(`${dropdownMenuItem}.match`, {
  vars: { '--left-color': 'var(--blue-5)' },
});

export const linkAnchorContainer = style({
  position: 'relative',
  paddingTop: '2px',
  vars: {
    '--underscore-color': 'var(--blue-40)',
    '--underscore-length': '0%',
    '--underscore-pos': '50%',
    '--underscore-thickness': '2px',
  },
});

globalStyle(`${linkAnchorContainer}::after`, {
  content: "''",
  borderRadius: '10000px',
  borderBottom: 'var(--underscore-thickness) solid var(--underscore-color)',
  position: 'absolute',
  bottom: '-3px',
  left: 'var(--underscore-pos, 50%)',
  width: 'var(--underscore-length, 0%)',
  transition: 'width 0.3s ease, left 0.3s ease',
});

globalStyle(`.transparent ${linkAnchorContainer}`, {
  color: 'inherit',
  vars: { '--underscore-color': 'currentColor' },
});

globalStyle(`${linkAnchorContainer}:hover`, {
  vars: { '--underscore-length': '50%', '--underscore-pos': '25%' },
});

globalStyle(`${linkAnchorContainer}:hover ${dropdownMenuContainer}`, {
  display: 'block',
  maxHeight: '1000px',
});

globalStyle(`${linkAnchorContainer}.match`, {
  vars: {
    '--underscore-length': '100%',
    '--underscore-pos': '0%',
    '--underscore-thickness': '4px',
  },
});

export const linkAnchor = style({
  padding: '3px 10px',
  color: 'inherit',
  selectors: {
    '&:hover': { color: 'inherit' },
  },
});
