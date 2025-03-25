

import { Hono } from "hono";
import { vikeMiddleware } from "./server/vike-middleware";

const app = new Hono();

/**
 * Vike route
 *
 * @link {@see https://vike.dev}
 **/

app.use('*', vikeMiddleware());

export default app;
