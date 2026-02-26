export default {
  presets: [
    // '@babel/preset-env',
    '@babel/preset-react',
    ['@babel/preset-typescript', { allExtensions: true, isTSX: true }],
    '@wyw-in-js/babel-preset',
  ],
  // compact: false,
  assumptions: {
    noDocumentAll: true,
    noClassCalls: true,
  }
};