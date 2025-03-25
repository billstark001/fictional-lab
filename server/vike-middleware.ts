import { Context, MiddlewareHandler, Next } from 'hono';
import { renderPage } from 'vike/server';

/**
 * Vike middleware for Hono
 * Renders pages using Vike and returns the response
 */
export const vikeMiddleware = (): MiddlewareHandler => {
  return async (c: Context, next: Next) => {
    try {
      
      const pageContextInit = {
        urlOriginal: c.req.url,
        headersOriginal: c.req.raw.headers,
      };
      
      const pageContext = await renderPage(pageContextInit);
      const response = pageContext.httpResponse;
      
      if (!response) {
        return next();
      }

      const { readable, writable } = new TransformStream();
      response.pipe(writable);
      
      const honoResponse = new Response(readable, {
        status: response.statusCode,
        headers: response.headers
      });
      
      return honoResponse;
    } catch (error) {
      console.error('Vike rendering error:', error);
      return c.text('Internal Server Error', 500);
    }
  };
};

export default vikeMiddleware;