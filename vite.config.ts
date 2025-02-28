import react from '@vitejs/plugin-react';
import vike from 'vike/plugin';
import { loadEnv, UserConfig } from 'vite';
import wyw from '@wyw-in-js/vite';
import transformAssets from './vite-plugins/transform-assets';
import collectMetadataAndResources from './vite-plugins/collect-metadata-and-resources';
import forceCss200 from './vite-plugins/force-css-200';

const mode = process.env.NODE_ENV;
if (mode) {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};
}

const config: UserConfig = {
  base: process.env.VITE_BASE_PATH || '/',
  plugins: [
    forceCss200(),
    wyw({
      include: ['**/*.{ts,tsx}'],
      babelOptions: {
        presets: ['@babel/preset-typescript', '@babel/preset-react'],
      },
    }),
    transformAssets(),
    collectMetadataAndResources({
      moduleId: 'news',
      matchDirs: ['./pages/news/_news'],
      parseMarkdownOptions: {
        parseTitle: false,
        parseDesc: false,
        descLength: 120,
      }
    }),
    // TODO use collected metadata in articles page
    // collectMetadataAndResources({
    //   moduleId: 'articles',
    //   matchDirs: ['./pages/articles/_articles'],
    //   parseMarkdownOptions: {
    //     descLength: 320,
    //   }
    // }),
    react(),
    vike(),
  ],
  resolve: {
    alias: {
      '@': __dirname
    },
  },
  server: {
    watch: {
      ignored: ['**/node_modules/**'], 
      usePolling: false,        
    },
  },
};

export default config;
