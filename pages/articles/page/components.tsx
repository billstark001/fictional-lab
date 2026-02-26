import Markdown from "@/lib/react/MarkdownRenderer";
import { ArticlePageContext } from '../common/types';
import ShadowDom from '@/lib/react/ShadowDom';
import MetadataRenderer from '../common/MetadataRenderer';

export const Container = (props: ArticlePageContext) => {
  const { extension, head, body, text, metadata, locale } = props;
  return <div>
    <MetadataRenderer metadata={metadata} lang={locale} />
    {extension === 'md'
      ? <Markdown children={text} />
      : <ShadowDom head={head} body={body} />}
  </div>;
};
