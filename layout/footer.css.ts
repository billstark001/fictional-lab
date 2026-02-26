import { style } from '@vanilla-extract/css';
import { framedByMaxWidth } from './style';
import { mediaQueryLessOrEqual, mediaQueryMoreOrEqual } from '@/lib/responsive';

export const footerContainer = style({
  borderTop: '1px solid var(--gray-60)',
  width: '100%',
  backgroundColor: 'var(--blue-80)',
});

export const mapWrapper = style({
  width: '100%',
  height: '600px',
  '@media': {
    [mediaQueryLessOrEqual('md', false)]: { height: '500px' },
    [mediaQueryLessOrEqual('sm', false)]: { height: '400px' },
  },
});

const baseContainer = {
  ...framedByMaxWidth,
  paddingTop: '8px',
  paddingBottom: '8px',
  minHeight: '50px',
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'row' as const,
  justifyContent: 'center',
  alignItems: 'center',
};

export const copyrightContainer = style({
  ...baseContainer,
  fontSize: 'small',
});

export const settingContainer = style({
  ...baseContainer,
  fontSize: 'medium',
  paddingBottom: 0,
  gap: '16px',
  '@media': {
    [mediaQueryLessOrEqual('sm', false)]: { display: 'none' },
  },
});

export const footerContentContainer = style({
  ...framedByMaxWidth,
  paddingTop: '48px',
  paddingBottom: '48px',
  vars: { '--section-gap': '16px' },
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: 'var(--section-gap)',
  '@media': {
    // mediaQueryMoreOrEqual('md') = min-width: 576px
    [mediaQueryMoreOrEqual('md', false)]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
  },
});

export const footerSection = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
});

export const footerWrap = style({
  whiteSpace: 'pre-wrap',
});

export const logoContainer = style({
  ...framedByMaxWidth,
  width: '100%',
  paddingTop: '32px',
});
