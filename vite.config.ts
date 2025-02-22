import react from '@vitejs/plugin-react';
import vike from 'vike/plugin';
import { loadEnv, UserConfig } from 'vite';
import wyw from '@wyw-in-js/vite';
import transformAssets from './vite-plugins/transform-assets';
import genUrlImports from './vite-plugins/gen-url-import';

const mode = process.env.NODE_ENV;
if (mode) {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};
}

const config: UserConfig = {
  base: process.env.VITE_BASE_PATH || '/',
  plugins: [
    wyw({
      include: ['**/*.{ts,tsx}'],
      babelOptions: {
        presets: ['@babel/preset-typescript', '@babel/preset-react'],
      },
    }),
    transformAssets(),
    genUrlImports({
      moduleId: 'news',
      matchDirs: ['./pages/news/_news'],
    }),
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
