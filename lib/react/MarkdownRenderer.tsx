import { HTMLAttributes } from 'react';
import ReactMarkdown from 'react-markdown';

export function MarkdownRenderer({ children }: { children: string } & Omit<HTMLAttributes<HTMLDivElement>, 'children'>) {
  // const html = micromark(children)
  // return <div {...rest} dangerouslySetInnerHTML={{ __html: html }} />
  return <ReactMarkdown>{children}</ReactMarkdown>;
}

export default MarkdownRenderer;