import { style } from '@vanilla-extract/css';
import { framedByMaxWidth } from './style';
import { mediaQueryLessOrEqual } from '@/lib/responsive';

const dark = `[data-theme='dark']`;

export const bannerContainer = style({
  vars: {
    '--wave-height': '120px',
    '--banner-height': '600px',
  },
  width: '100%',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  color: 'white',
  height: 'calc(var(--banner-height) + var(--wave-height))',
  '@media': {
    [mediaQueryLessOrEqual('md', false)]: {
      vars: { '--banner-height': '400px' },
    },
  },
});

export const bannerWrapper = style({
  ...framedByMaxWidth,
  paddingTop: '110px',
  paddingBottom: '30px',
  height: 'var(--banner-height)',
});

export const waveStyle = style({
  width: '100%',
  height: 'var(--wave-height)',
});
