import react from '@vitejs/plugin-react';
import vike from 'vike/plugin';
import { UserConfig } from 'vite';
import wyw from '@wyw-in-js/vite';
import transformAssets from './vite-plugins/transform-assets';
import mdImgSplit from './vite-plugins/md-img-split';

const config: UserConfig = {
  plugins: [
    wyw({
      include: ['**/*.{ts,tsx}'],
      babelOptions: {
        presets: ['@babel/preset-typescript', '@babel/preset-react'],
      },
    }),
    transformAssets(),
    mdImgSplit(),
    react(),
    vike(),
  ],
  resolve: {
    alias: {
      '@': __dirname
    },
  },
};

export default config;
