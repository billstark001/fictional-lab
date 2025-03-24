import { styled } from "@linaria/react";
import { mediaQueryLessOrEqual } from "@/lib/responsive";

import Markdown from "@/lib/react/MarkdownRenderer";


const TopicContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;

  border: 1px solid var(--gray-60);
  border-radius: 20px;

  padding: 0.8em;
  gap: 1em;

  &:not(:first-child) {
    margin-top: 1.2em;
  }

  &:nth-child(2n+0) {
    flex-direction: row-reverse;

    ${mediaQueryLessOrEqual('sm')} {
      flex-direction: column;
    }
  }
  
  ${mediaQueryLessOrEqual('sm')} {
    flex-direction: column;
  }

  .content {
    width: 100%;
    & > h1:first-child {
      margin-top: 0;
    }
  }
`;

const TopicImage = styled.img`
  object-fit: cover;

  width: 360px;
  max-height: 480px;

  border-radius: 12px;

  ${mediaQueryLessOrEqual('sm')} {
    max-height: 360px;
    width: 100%;
  }
`;

export type TopicCardProps = {
  image?: string;
  content: string;
};

export const TopicCard = (props: TopicCardProps) => {
  const { image, content } = props;
  return <TopicContainer>
    <TopicImage src={image} />
    <div className='content'>
      <Markdown>{content}</Markdown>
    </div>
  </TopicContainer>;
};
