import { framedByMaxWidth } from "@/layout/style";
import { LocaleRecord } from "@/lib/locale";
import Localized from "@/lib/locale/Localized";
import useWithLocale from "@/lib/locale/useWithLocale";
import { Metadata } from "@/lib/metadata/parseMetadata";
import { mediaQueryLessOrEqual, mediaQueryOnRange } from "@/lib/responsive";
import { styled } from "@linaria/react";
import { DateTime } from "luxon";
import { AnchorHTMLAttributes, FC, HTMLAttributes, useMemo } from "react";
import { FaCalendar, FaNewspaper } from "react-icons/fa";
import { usePageContext } from "vike-react/usePageContext";


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

  border: 1px solid var(--gray-4);
  border-radius: 12px;
`;

const TitleBox = styled.h1`
  text-align: center;
  color: var(--blue-1);
`;

const ContentBox = styled.p`
  line-height: 1.5em;
  color: var(--gray-3);
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
  const { locale } = usePageContext() as unknown as LocaleRecord;
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



const AllNewsButtonFrame = styled.button`

  transition: background-color 0.1s ease-in-out;
  background: transparent;
  background-color: transparent;
  border-radius: 6px;
  padding: 1em 4em;

  &:hover {
    background: transparent;
    background-color: #7771;
  }
  &:active {
    background: transparent;
    background-color: #7772;
  }

  border: 1px solid var(--blue-3);
  color: var(--blue-3);

  display: flex;
  flex-direction: row;
  gap: 8px;

  font-size: lg;
`;

const AllNewsButtonContainer = styled.a`
  ${framedByMaxWidth}

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AllNewsButton = (props: AnchorHTMLAttributes<HTMLAnchorElement>) => {

  return <AllNewsButtonContainer {...props}>
    <AllNewsButtonFrame>
      <FaNewspaper />
      <Localized>{
        ({ locale }) => locale === 'zh'
          ? '浏览所有新闻' : locale === 'ja'
            ? 'すべて' : 'View All'
      }</Localized>
    </AllNewsButtonFrame>
  </AllNewsButtonContainer>;
};