import { style } from '@vanilla-extract/css';

export const hideOnDarkMode = style({
  selectors: {
    "html[data-theme='dark'] &": { display: 'none' },
  },
});

export const hideOnLightMode = style({
  selectors: {
    "html[data-theme]:not([data-theme='dark']) &": { display: 'none' },
  },
});

export const languageMenu = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '4px',
  width: '140px',
  fontSize: 'large',
  textAlign: 'center',
});

export const languageMenuItem = style({
  margin: '0 12px',
  padding: '8px 0',
  cursor: 'pointer',
  selectors: {
    '&:not(:first-child)': { borderTop: '1px solid var(--gray-50)' },
  },
});
