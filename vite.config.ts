import react from '@vitejs/plugin-react';
import vike from 'vike/plugin';
import { loadEnv, UserConfig } from 'vite';
import wyw from '@wyw-in-js/vite';
// import babel from 'vite-plugin-babel';
import transformAssets from './vite-plugins/transform-assets';
import collectMetadataAndResources from './vite-plugins/collect-metadata-and-resources';
import forceCss200 from './vite-plugins/force-css-200';
// import devServer from "@hono/vite-dev-server";

const mode = process.env.NODE_ENV;
if (mode) {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
}

const config: UserConfig = {
  base: process.env.VITE_BASE_PATH || '/',
  plugins: [
    wyw({
      include: ['**/*.{ts,tsx}'],
      exclude: ['node_modules/**'],
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
    // devServer({
    //   entry: "hono-entry.ts",
    //   exclude: [
    //     /^\/@.+$/,
    //     /.*\.(ts|tsx|vue)($|\?)/,
    //     /.*\.(s?css|less)($|\?)/,
    //     /^\/favicon\.ico$/,
    //     /.*\.(svg|png)($|\?)/,
    //     /^\/(public|assets|static)\/.+/,
    //     /^\/node_modules\/.*/,
    //   ],
    //   injectClientScript: false,
    // }),
    forceCss200(),
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
