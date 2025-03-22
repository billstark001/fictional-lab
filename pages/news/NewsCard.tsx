import Markdown from "@/lib/react/MarkdownRenderer";
import { DateTime } from 'luxon';
import { css, cx } from "@linaria/core";

import { NewsRecord } from "./types";
import { styled } from "@linaria/react";
import { FC, ImgHTMLAttributes } from "react";
import { mediaQueryLessOrEqual } from "@/lib/responsive";
import { generateHtmlId } from "@/lib/html/generateHtmlId";
import { useLocaleRecord } from "@/lib/locale/useLocaleRecord";

const tagsStyle = css`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;

  span {
    background-color: var(--blue-6);
    color: var(--gray-1);
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    font-size: 0.85rem;
  }
`;

const NewsCardContainer = styled.div`

  --point-width: 30px;
  --timeline-width: 160px;
  --image-width: 300px;

  display: grid;
  grid-template-columns: var(--point-width) var(--timeline-width) 1fr var(--image-width);
  gap: 1em;
  align-items: start;

  padding-bottom: 2em;

  ${mediaQueryLessOrEqual('lg')} {
    --image-width: 240px;
  }

  ${mediaQueryLessOrEqual('md')} {
    --timeline-width: 80px;
    --image-width: 180px;
  }

  ${mediaQueryLessOrEqual('sm')} {
    grid-template-columns: var(--point-width) 1fr;
    .image, .timeline, .content {
      grid-column: 2 / 4;
      padding-bottom: 0px;
      position: static !important;
    }

    .timeline, .dot {
      margin-bottom: 0px !important;
    }
  }


  &.no-image {
    grid-template-columns: var(--point-width) var(--timeline-width) 1fr;
  }

  .timeline, .dot {
    position: sticky;
    top: 100px;
    margin-bottom: 2em;
  }

  .content {

  }

  .image {

  }


  position: relative;
  &::before {
    content: '';
    position: absolute;
    background-color: var(--cyan-5);
    width: 4px;
    height: 100%;
    left: 10.5px;
  }
`;

const NewsImage = styled.img`
  object-fit: cover;
  max-height: 400px;
  width: 100%;
  border-radius: 12px;
  border: 1px solid var(--gray-4);
` as unknown as FC<ImgHTMLAttributes<HTMLImageElement>>;

const DateContainer = styled.div`
  color: var(--blue-3);
  font-size: large;
  font-weight: bold;
`;

const TimelineCircle = styled.div`
  width: 25px;
  height: 25px;
  background-color: var(--gray-7);
  border: 4px solid var(--cyan-4);
  border-radius: 50%;
  z-index: 1;

`;

const IdTag = styled.div`
  position: relative;
  width: 0;
  height: 0;

  .id-tag {
    position: absolute;
    top: -100px;
  }
`;

export const NewsCard = (props: NewsRecord) => {
  const { filename, metadata, content } = props;
  const { locale } = useLocaleRecord();
  const { tags, created } = metadata;

  const id = generateHtmlId(`${created}_${filename}`);

  const dateObject = DateTime.fromMillis(created || 0);
  const dateStr = dateObject.setLocale(locale).toLocaleString({
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  return <NewsCardContainer className={cx(
    !metadata.image && 'no-image',
  )}>

    <TimelineCircle className="dot"/>


    <div className="timeline">
      <DateContainer>{dateStr}</DateContainer>
    </div>

    <div className="content">

    <IdTag>
      <div className="id-tag" id={id} />
    </IdTag>
    
      {tags && tags.length > 0 && (
        // <div>
        //   <strong>{translations.tags}:</strong>

        // </div>
        <div className={tagsStyle}>
          {tags.map((tag, index) => (
            <span key={index}>{tag}</span>
          ))}
        </div>
      )}

      <div className={css`
        padding-left: 0.8em;
        p {
          margin: 0.5em 0;
        }
        h1, h2, h3, h4, h5, h6 {
          margin: 0;
          margin-top: 0.5rem;
          margin-bottom: 0.5rem;
        }
      `}>
        <Markdown>{content}</Markdown>
      </div>
    </div>

    {
      metadata.image
      && <NewsImage className="image" src={(metadata.image)} />
    }
  </NewsCardContainer>;
};

export default NewsCard;