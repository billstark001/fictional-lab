import { style } from '@vanilla-extract/css';

export const metadataContainer = style({
  color: 'var(--gray-5)',
  marginBottom: '1.5rem',
  fontFamily: "'Arial', sans-serif",
});

export const metadataContainerCard = style({
  padding: '16px',
  border: '1px solid var(--gray-50)',
  borderRadius: '20px',
});

export const titleStyle = style({
  fontSize: '2.5rem',
  fontWeight: 'bold',
  marginBottom: '0.5rem',
});

export const descStyle = style({
  fontSize: '1rem',
  color: 'var(--gray-40)',
  marginBottom: '1rem',
});

export const metaContainerRow = style({
  display: 'flex',
  flexDirection: 'row',
  gap: '10px',
});

export const metaRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  fontSize: '0.9rem',
  color: 'var(--gray-50)',
});

export const tagsStyle = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.5rem',
});
