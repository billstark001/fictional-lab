import { Plugin } from 'vite';

export default function forceCss200(): Plugin {
  return {
    name: 'force-css-200',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        // Check if the requested file is a CSS file
        if (req.url && req.url.includes('wyw-in-js.css')) {
          // Set headers to disable caching
          res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
          res.setHeader('Pragma', 'no-cache');
          res.setHeader('Expires', '0');

          // Set HTTP status code to 200
          res.statusCode = 200;
        }
        next(); // Pass the request to the next middleware
      });
    },
  };
}