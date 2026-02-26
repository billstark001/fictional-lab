import { style } from '@vanilla-extract/css';
import { mediaQueryLessOrEqual } from '@/lib/responsive';

export const showOnLgSize = style({
  '@media': {
    // mediaQueryLessOrEqual('md') = max-width: 767px
    [mediaQueryLessOrEqual('md', false)]: { display: 'none' },
  },
});
