import { useLocaleRecord } from "@/lib/locale/useLocaleRecord";
import useWithLocale from "@/lib/locale/useWithLocale";
import { Metadata } from "@/lib/metadata/parseMetadata";
import { mediaQueryLessOrEqual, mediaQueryOnRange } from "@/lib/responsive";
import { styled } from "@linaria/react";
import { DateTime } from "luxon";
import { FC, HTMLAttributes, useMemo } from "react";
import { FaCalendar } from "react-icons/fa";


const ImageBox = styled.img`
  --length: 320px;

  ${mediaQueryLessOrEqual('lg')} {
    --length: 240px;
  }

  ${mediaQueryLessOrEqual('sm')} {
    --length: 320px;
  }

  object-fit: cover;
  max-height: var(--length);
  width: var(--length);
  min-height: calc(var(--length) * 9 / 16);

  border: 1px solid var(--gray-50);
  border-radius: 12px;
`;

const TitleBox = styled.h1`
  text-align: center;
  color: var(--blue-5);
`;

const ContentBox = styled.p`
  line-height: 1.5em;
  color: var(--gray-40);
`;


const NewsBoxContainer = styled.a`
  --length: 380px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: var(--length);

  transition: background-color 0.1s ease-in-out;
  background-color: transparent;
  border-radius: 20px;
  padding: 1em;
  padding-top: 2em;

  &:hover {
    background-color: #7771;
  }
  &:active {
    background-color: #7772;
  }
`;

export const NewsStack = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;

  ${NewsBoxContainer}:nth-child(1n+4) {
    display: none;
  }

  ${mediaQueryOnRange('md')} {
    ${NewsBoxContainer}:nth-child(1n+3) {
      display: none;
    }
  }

  ${mediaQueryLessOrEqual('sm')} {
    flex-direction: column;
    justify-content: flex-start;
    padding: 0 16px;
  }


` as FC<HTMLAttributes<HTMLDivElement>>;

export const NewsBox = (props: Metadata & { to?: string }) => {
  const { title, desc, image, created, to } = props;
  const { locale } = useLocaleRecord();
  const withLocale = useWithLocale();


  const dateStr = useMemo(() => {
    if (!created) {
      return undefined;
    }
    const dateObject = DateTime.fromMillis(created || 0);
    const dateStr = dateObject.setLocale(locale).toLocaleString({
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });

    return dateStr;
  }, [created, locale]);

  return <NewsBoxContainer href={withLocale(to)}>
    <ImageBox src={image} />
    {title ? <TitleBox>{title}</TitleBox> : undefined}
    {dateStr ? <span>
      <FaCalendar />
      {' '}
      {dateStr}
    </span> : undefined}
    <ContentBox>{desc}</ContentBox>
  </NewsBoxContainer>;
};

export default NewsBox;
