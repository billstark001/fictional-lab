import { style, globalStyle } from '@vanilla-extract/css';
import { mediaQueryLessOrEqual } from '@/lib/responsive';

export const topicContainer = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'stretch',
  border: '1px solid var(--gray-60)',
  borderRadius: '20px',
  padding: '0.8em',
  gap: '1em',
  '@media': {
    [mediaQueryLessOrEqual('sm', false)]: { flexDirection: 'column' },
  },
});

globalStyle(`${topicContainer}:not(:first-child)`, { marginTop: '1.2em' });
globalStyle(`${topicContainer}:nth-child(2n)`, { flexDirection: 'row-reverse' });
globalStyle(`${topicContainer}:nth-child(2n)`, {
  '@media': {
    [mediaQueryLessOrEqual('sm', false)]: { flexDirection: 'column' },
  },
});

export const topicContent = style({
  width: '100%',
});

globalStyle(`${topicContent} > h1:first-child`, { marginTop: 0 });

export const topicImage = style({
  objectFit: 'cover',
  width: '360px',
  maxHeight: '480px',
  borderRadius: '12px',
  '@media': {
    [mediaQueryLessOrEqual('sm', false)]: { maxHeight: '360px', width: '100%' },
  },
});
