export default {
  presets: [
    // '@babel/preset-env',
    '@babel/preset-react',
    ['@babel/preset-typescript', { allExtensions: true, isTSX: true }],
  ],
  assumptions: {
    noDocumentAll: true,
    noClassCalls: true,
  }
};
