import ReactMarkdown, { Options } from 'react-markdown';
import { withBaseUrl } from '../url';
import useWithLocale from '../locale/useWithLocale';

const LANG_PREFIX = '/:lang:';

const options: Options = {
  components: {
    a(props) {
      const withLocale = useWithLocale();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { href, node, ...rest } = props;
      const hrefReplaced = 
      href?.startsWith(LANG_PREFIX)
        ? withLocale(href.substring(LANG_PREFIX.length))
        : withBaseUrl(href);
      return <a href={hrefReplaced} {...rest} />;
    }
  }
};

export function Markdown({ children }: { children: string }) {
  // const html = micromark(children)
  // return <div {...rest} dangerouslySetInnerHTML={{ __html: html }} />
  return <ReactMarkdown
    {...options}
  >{children}</ReactMarkdown>;
}

export default Markdown;