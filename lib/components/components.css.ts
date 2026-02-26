import { style } from '@vanilla-extract/css';

export const iconButton = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: 'inherit',
  background: 'inherit',
  color: 'inherit',
  boxShadow: 'inherit',
  padding: '0.5em 0.6em',
  selectors: {
    '&:hover, &:active': { color: 'white' },
    '&:focus': { boxShadow: 'inherit' },
    "[data-theme='dark'] &": { background: 'inherit' },
  },
});

export const linkButtonFrame = style({
  transition: 'background-color 0.1s ease-in-out',
  background: 'transparent',
  backgroundColor: 'transparent',
  borderRadius: '6px',
  padding: '0.8em 3.2em',
  border: '1px solid var(--blue-40)',
  color: 'var(--blue-5)',
  display: 'flex',
  flexDirection: 'row',
  gap: '8px',
  fontSize: 'large',
  selectors: {
    '&:hover': { background: 'transparent', backgroundColor: '#7771' },
    '&:active': { background: 'transparent', backgroundColor: '#7772' },
    "[data-theme='dark'] &": { background: 'inherit' },
  },
});

export const buttonGroupFrame = style({
  width: '100%',
  maxWidth: 'calc(var(--layout-max-width) + var(--layout-min-gap) * 2)',
  paddingLeft: 'var(--layout-min-gap)',
  paddingRight: 'var(--layout-min-gap)',
  margin: '0 auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  gap: '8px',
});

export const fullWidthImage = style({
  display: 'block',
  margin: '32px auto 0px auto',
  maxWidth: '100%',
});

export const imageCaption = style({
  textAlign: 'center',
  color: 'var(--gray-50)',
  margin: '8px auto 16px auto',
});

export const headingContainer = style({
  position: 'relative',
  marginBottom: '16px',
});

export const headingContainerWithHashtag = style({
  marginTop: '120px',
});

export const headingContainerWithoutHashtag = style({
  marginTop: '20px',
});

export const headingLink = style({
  opacity: 0,
  color: '#4a5568',
  marginLeft: '-24px',
  padding: '0 4px',
  cursor: 'pointer',
  transition: 'opacity 0.2s',
  selectors: {
    '&:hover': { opacity: 1 },
  },
});

export const headingHashtag = style({
  position: 'absolute',
  top: '-100px',
  left: 0,
  color: '#718096',
  fontSize: '0.875rem',
});
