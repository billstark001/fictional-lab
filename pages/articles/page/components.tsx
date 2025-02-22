import { styled } from '@linaria/react';
import Markdown from "@/lib/react/MarkdownRenderer";
import { useState } from 'react';
import { ArticlePageContext } from '../common/types';
import ShadowDom from '@/lib/react/ShadowDom';
import MetadataRenderer from '../common/MetadataRenderer';

export const ContainerWrapper = styled.div`

`;

export const Container = (props: ArticlePageContext) => {
  const { extension, head, body, text, metadata, locale } = props;
  return <ContainerWrapper>
    <MetadataRenderer metadata={metadata} lang={locale} />
    {extension === 'md'
      ? <Markdown children={text} />
      : <ShadowDom head={head} body={body} />}
  </ContainerWrapper>;
};