export { onBeforeRoute };
 
import { extractLocale } from '@/lib/locale';
import { modifyUrl } from 'vike/modifyUrl';
import type { PageContext, Url } from 'vike/types';
 
import type { OnBeforeRouteSync } from 'vike/types';
 
const onBeforeRoute: OnBeforeRouteSync = (pageContext): ReturnType<OnBeforeRouteSync> => {
  
  const extracted = extractLocale(pageContext.urlParsed);

  return {
    pageContext: {
      // Make `locale` available as `pageContext.locale`
      // Vike's router will use pageContext.urlLogical instead of pageContext.urlOriginal
      ...extracted,
    } as any
  };
};