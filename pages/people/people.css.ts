import { style, globalStyle } from '@vanilla-extract/css';
import { mediaQueryLessOrEqual, mediaQueryMoreOrEqual } from '@/lib/responsive';

const dark = `[data-theme='dark']`;

export const profileContainer = style({
  display: 'flex',
  flexDirection: 'row',
  overflow: 'hidden',
  marginBottom: '20px',
  '@media': {
    [mediaQueryLessOrEqual('md', false)]: { flexDirection: 'column' },
  },
});

export const infoSection = style({
  flex: 2,
  paddingRight: '30px',
  '@media': {
    [mediaQueryLessOrEqual('md', false)]: { paddingRight: 'inherit', paddingBottom: '20px' },
  },
});

export const photoSection = style({
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'var(--gray-80)',
  borderRadius: '20px',
  minWidth: '400px',
  maxHeight: '400px',
  overflow: 'hidden',
  '@media': {
    [mediaQueryLessOrEqual('md', false)]: { minWidth: 'inherit' },
  },
});

globalStyle(`${photoSection} img`, {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: '4px',
});

export const personName = style({
  fontSize: '28px',
  marginBottom: '5px',
  borderBottom: 'inherit',
  '@media': {
    [mediaQueryLessOrEqual('md', false)]: { fontSize: '24px' },
  },
});

export const personPosition = style({
  fontSize: '20px',
  color: 'var(--gray-20)',
  marginBottom: '10px',
  fontWeight: 500,
  borderBottom: 'inherit',
  '@media': {
    [mediaQueryLessOrEqual('md', false)]: { fontSize: '18px' },
  },
});

export const subInfo = style({
  color: 'var(--gray-20)',
  margin: '5px 0',
  fontSize: '16px',
  '@media': {
    [mediaQueryLessOrEqual('md', false)]: { fontSize: '14px' },
  },
});

export const divider = style({
  border: 0,
  height: '1px',
  backgroundColor: 'var(--gray-80)',
  margin: '20px 0',
});

export const section = style({
  marginBottom: '20px',
});

globalStyle(`${section} h3`, { fontSize: '18px', marginBottom: '10px' });
globalStyle(`${section} p`, { color: 'var(--gray-20)' });

export const personLinks = style({
  display: 'flex',
  margin: '15px 0',
  flexWrap: 'wrap',
  gap: '10px',
});

globalStyle(`${personLinks} a`, {
  color: 'var(--blue-50)',
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  transition: 'color 0.3s',
});
globalStyle(`${personLinks} a:hover`, { color: 'var(--blue-40)' });
globalStyle(`${personLinks} a svg`, { marginRight: '5px', fontSize: '18px' });

export const backgroundPreWrap = style({ whiteSpace: 'pre-wrap' });

// MemberPhotoBox styles
export const memberContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
});

export const memberPhoto = style({
  vars: { '--photo-size': '200px' },
  width: 'var(--photo-size)',
  height: 'var(--photo-size)',
  borderRadius: '8px',
  overflow: 'hidden',
  marginBottom: '1rem',
  '@media': {
    // mediaQueryMoreOrEqual('xl') = min-width: 1024px
    [mediaQueryMoreOrEqual('xl', false)]: { vars: { '--photo-size': '240px' } },
    [mediaQueryLessOrEqual('sm', false)]: { vars: { '--photo-size': '280px' } },
  },
});

globalStyle(`${memberPhoto} img`, { width: '100%', height: '100%', objectFit: 'cover' });

export const memberName = style({
  margin: '0 0 0.5rem 0',
  fontSize: '1.2rem',
  fontWeight: 600,
  textAlign: 'center',
});

export const memberYear = style({
  fontSize: '0.9rem',
  fontWeight: 'normal',
  color: 'var(--gray-20)',
  marginLeft: '0.5rem',
});

export const memberEmail = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '0.75rem',
  color: 'var(--blue-50)',
  textDecoration: 'none',
  fontSize: '0.9rem',
  selectors: {
    '&:hover': { color: 'var(--blue-40)' },
  },
});

globalStyle(`${memberEmail} svg`, { marginRight: '0.4rem' });

export const memberResearchArea = style({
  margin: 0,
  fontSize: '0.9rem',
  textAlign: 'left',
  width: '100%',
  color: 'var(--gray-20)',
});

// MembersGrid
export const membersGridContainer = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '1.5rem',
  width: '100%',
  padding: '1em 0',
  '@media': {
    [mediaQueryLessOrEqual('lg', false)]: { gridTemplateColumns: 'repeat(3, 1fr)' },
    [mediaQueryLessOrEqual('md', false)]: { gridTemplateColumns: 'repeat(2, 1fr)' },
    [mediaQueryLessOrEqual('sm', false)]: { gridTemplateColumns: '1fr' },
  },
});

// people page container
export const peopleContainer = style({
  position: 'relative',
});

globalStyle(`${peopleContainer} h1`, {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
});
