import './global.css';

export const framedByMaxWidth = {
  width: '100%',
  maxWidth: 'calc(var(--layout-max-width) + var(--layout-min-gap) * 2)',
  paddingLeft: 'var(--layout-min-gap)',
  paddingRight: 'var(--layout-min-gap)',
  margin: '0 auto',
} as const;