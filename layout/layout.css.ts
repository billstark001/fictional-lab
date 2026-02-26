import { style } from '@vanilla-extract/css';
import { framedByMaxWidth } from './style';

export const container = style({
  width: '100%',
});

export const pageContent = style({
  ...framedByMaxWidth,
  paddingBottom: '50px',
  minHeight: 'calc(100vh - 116px)',
  opacity: 1,
  transition: 'opacity 0.3s ease-in-out',
  selectors: {
    'body.page-is-transitioning &': {
      opacity: 0,
    },
  },
});
