import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { Hono } from "hono";
import { compress } from "hono/compress";
import { loadEnv } from "vite";
import app from "./hono-entry";
// import app from "./hono-entry.js";


const mode = process.env.NODE_ENV;
if (mode) {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
}

let basePath = process.env.VITE_BASE_PATH || '';
while (basePath.endsWith('/')) {
  basePath = basePath.substring(0, basePath.length - 1);
}
const normalizedBasePath = basePath.startsWith('/') ? basePath : `/${basePath}`;

const nodeApp = new Hono();

nodeApp.use(compress());

// static path
nodeApp.use(
  `${normalizedBasePath}/*`,
  serveStatic({
    root: `./dist/client/`,
    rewriteRequestPath(path) {
      return path.startsWith(normalizedBasePath)
        ? path.substring(normalizedBasePath.length)
        : path;
    },
  }),
);

// ssr
nodeApp.route(normalizedBasePath, app);

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

console.log(`Server listening on http://localhost:${port}`);
serve({
  fetch: nodeApp.fetch,
  port: port,
});
