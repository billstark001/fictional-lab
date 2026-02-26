import { style, globalStyle } from '@vanilla-extract/css';

export const errorCard = style({
  color: 'red',
  border: '1px solid var(--gray-50)',
  borderRadius: '0.5em',
  padding: '1em',
});

export const authorListWrapper = style({
  display: 'inline',
  fontStyle: 'italic',
});

globalStyle(`${authorListWrapper} > .author:nth-child(n+2)::before`, { content: "', '" });
globalStyle(`${authorListWrapper} > .author.highlight`, { fontWeight: 'bold' });

export const publicationWrapper = style({
  margin: '0.6em 0',
});

export const doiLink = style({
  color: 'var(--blue-40)',
  textDecoration: 'none',
  margin: '0 6px',
  selectors: {
    '&:hover': { textDecoration: 'underline' },
  },
});
