import react from '@vitejs/plugin-react';
import vike from 'vike/plugin';
import { loadEnv, UserConfig } from 'vite';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import transformAssets from './vite-plugins/transform-assets';
import collectMetadataAndResources from './vite-plugins/collect-metadata-and-resources';

const mode = process.env.NODE_ENV;
if (mode) {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
}

const config: UserConfig = {
  base: process.env.VITE_BASE_PATH || '/',
  plugins: [
    vanillaExtractPlugin(),
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
    collectMetadataAndResources({
      moduleId: 'articles',
      matchDirs: ['./pages/articles/_articles'],
      parseMarkdownOptions: {
        descLength: 320,
      },
      extensions: ['md', 'html'],
    }),
    react(),
    vike(),
  ],
  optimizeDeps: {
    include: ['react-icons/fa6', 'react-icons/md'],
    force: true
  },
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
