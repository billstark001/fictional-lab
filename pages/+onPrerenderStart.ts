import { supportedLocales, defaultLocale } from "@/lib/locale";

export { onPrerenderStart };
 
function onPrerenderStart(prerenderContext: { pageContexts: any[] }) {
  const pageContexts: any[] = [];
  prerenderContext.pageContexts.forEach((pageContext: { urlOriginal: any }) => {
    // Duplicate pageContext for each locale
    supportedLocales.forEach((locale) => {
      // Localize URL
      let { urlOriginal } = pageContext;
      if (locale !== defaultLocale) {
        urlOriginal = `/${locale}${pageContext.urlOriginal}`;
      }
      pageContexts.push({
        ...pageContext,
        urlOriginal,
        // Set pageContext.locale
        locale
      });
    });
  });
  return {
    prerenderContext: {
      pageContexts
    }
  };
}