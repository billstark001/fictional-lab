import { style, globalStyle } from '@vanilla-extract/css';
import { mediaQueryLessOrEqual, mediaQueryOnRange } from '@/lib/responsive';

export const imageBox = style({
  vars: { '--length': '320px' },
  objectFit: 'cover',
  maxHeight: 'var(--length)',
  width: 'var(--length)',
  minHeight: 'calc(var(--length) * 9 / 16)',
  border: '1px solid var(--gray-50)',
  borderRadius: '12px',
  '@media': {
    [mediaQueryLessOrEqual('lg', false)]: { vars: { '--length': '240px' } },
    [mediaQueryLessOrEqual('sm', false)]: { vars: { '--length': '320px' } },
  },
});

export const titleBox = style({
  textAlign: 'center',
  color: 'var(--blue-5)',
});

export const contentBox = style({
  lineHeight: '1.5em',
  color: 'var(--gray-40)',
});

export const newsBoxContainer = style({
  vars: { '--length': '380px' },
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  maxWidth: 'var(--length)',
  transition: 'background-color 0.1s ease-in-out',
  backgroundColor: 'transparent',
  borderRadius: '20px',
  padding: '1em',
  paddingTop: '2em',
  selectors: {
    '&:hover': { backgroundColor: '#7771' },
    '&:active': { backgroundColor: '#7772' },
  },
});

export const newsStack = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-evenly',
  '@media': {
    [mediaQueryLessOrEqual('sm', false)]: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      padding: '0 16px',
    },
  },
});

// Hide 4th+ items always
globalStyle(`.${newsStack} .${newsBoxContainer}:nth-child(n+4)`, { display: 'none' });
// Hide 3rd+ items at md range
globalStyle(`.${newsStack} .${newsBoxContainer}:nth-child(n+3)`, {
  '@media': {
    [mediaQueryOnRange('md', undefined, false)]: { display: 'none' },
  },
});

export const topButtonGroupButtons = style({});

globalStyle(`.${topButtonGroupButtons} button`, {
  lineHeight: '24px',
  padding: '1px 8px',
});

export const indexContainer = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'stretch',
  '@media': {
    [mediaQueryLessOrEqual('md', false)]: { flexDirection: 'column' },
  },
});
