import { style, globalStyle } from '@vanilla-extract/css';
import { mediaQueryLessOrEqual } from '@/lib/responsive';

export const tagsStyle = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.5rem',
});

globalStyle(`${tagsStyle} span`, {
  backgroundColor: 'var(--blue-80)',
  color: 'var(--gray-5)',
  padding: '0.2rem 0.5rem',
  borderRadius: '4px',
  fontSize: '0.85rem',
});

export const newsCardContainer = style({
  vars: {
    '--point-width': '30px',
    '--timeline-width': '160px',
    '--image-width': '300px',
  },
  display: 'grid',
  gridTemplateColumns: 'var(--point-width) var(--timeline-width) 1fr var(--image-width)',
  gap: '1em',
  alignItems: 'start',
  paddingBottom: '2em',
  position: 'relative',
  '@media': {
    [mediaQueryLessOrEqual('lg', false)]: { vars: { '--image-width': '240px' } },
    [mediaQueryLessOrEqual('md', false)]: {
      vars: { '--timeline-width': '80px', '--image-width': '180px' },
    },
    [mediaQueryLessOrEqual('sm', false)]: {
      gridTemplateColumns: 'var(--point-width) 1fr',
    },
  },
});

globalStyle(`${newsCardContainer}.no-image`, {
  gridTemplateColumns: 'var(--point-width) var(--timeline-width) 1fr',
});

globalStyle(`${newsCardContainer}::before`, {
  content: "''",
  position: 'absolute',
  backgroundColor: 'var(--cyan-60)',
  width: '4px',
  height: '100%',
  left: '10.5px',
});

globalStyle(`${newsCardContainer} .timeline`, {
  position: 'sticky',
  top: '100px',
  marginBottom: '2em',
});
globalStyle(`${newsCardContainer} .dot`, {
  position: 'sticky',
  top: '100px',
  marginBottom: '2em',
});

globalStyle(`${newsCardContainer} .image`, {
  '@media': {
    [mediaQueryLessOrEqual('sm', false)]: {
      gridColumn: '2 / 4',
      paddingBottom: '0px',
      position: 'static',
    },
  },
});
globalStyle(`${newsCardContainer} .timeline`, {
  '@media': {
    [mediaQueryLessOrEqual('sm', false)]: {
      gridColumn: '2 / 4',
      paddingBottom: '0px',
      position: 'static',
      marginBottom: '0px',
    },
  },
});
globalStyle(`${newsCardContainer} .content`, {
  '@media': {
    [mediaQueryLessOrEqual('sm', false)]: {
      gridColumn: '2 / 4',
      paddingBottom: '0px',
      position: 'static',
    },
  },
});
globalStyle(`${newsCardContainer} .dot`, {
  '@media': {
    [mediaQueryLessOrEqual('sm', false)]: { marginBottom: '0px' },
  },
});

export const newsImage = style({
  objectFit: 'cover',
  maxHeight: '400px',
  width: '100%',
  borderRadius: '12px',
  border: '1px solid var(--gray-50)',
});

export const dateContainer = style({
  color: 'var(--blue-40)',
  fontSize: 'large',
  fontWeight: 'bold',
});

export const timelineCircle = style({
  width: '25px',
  height: '25px',
  backgroundColor: 'var(--gray-95)',
  border: '4px solid var(--cyan-50)',
  borderRadius: '50%',
  zIndex: 1,
});

export const idTag = style({
  position: 'relative',
  width: 0,
  height: 0,
});

export const newsContentPadding = style({
  paddingLeft: '0.8em',
});

globalStyle(`${newsContentPadding} p`, { margin: '0.5em 0' });
globalStyle(`${newsContentPadding} h1, ${newsContentPadding} h2, ${newsContentPadding} h3, ${newsContentPadding} h4, ${newsContentPadding} h5, ${newsContentPadding} h6`, {
  margin: 0,
  marginTop: '0.5rem',
  marginBottom: '0.5rem',
});
