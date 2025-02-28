export { onBeforeRoute };
 
import { extractLocale } from '@/lib/locale';
 
import type { OnBeforeRouteSync } from 'vike/types';
 
const onBeforeRoute: OnBeforeRouteSync = (pageContext): ReturnType<OnBeforeRouteSync> => {
  
  const { pathname, href } = pageContext.urlParsed;
  const extracted = extractLocale(pathname, href);

  return {
    pageContext: {
      // Make `locale` available as `pageContext.locale`
      // Vike's router will use pageContext.urlLogical instead of pageContext.urlOriginal
      ...extracted,
    } as any
  };
};