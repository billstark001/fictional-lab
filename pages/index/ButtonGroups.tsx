import { ButtonGroup, LinkButton } from "@/lib/components/Buttons";
import Localized from "@/lib/locale/Localized";
import { useLocaleRecord } from "@/lib/locale/useLocaleRecord";
import useWithLocale from "@/lib/locale/useWithLocale";
import { css, cx } from "@linaria/core";
import { HTMLAttributes } from "react";
import { FaNewspaper, FaMicrochip } from "react-icons/fa6";


export const TopButtonGroup = (props: HTMLAttributes<HTMLDivElement>) => {

  const { languageCode } = useLocaleRecord();
  const withLocale = useWithLocale();
  const { className, ...rest } = props;

  return <ButtonGroup className={cx(css`
    button {
      line-height: 24px;
      padding: 1px 8px;
    }
  `, className)} {...rest}>

    {languageCode !== 'en' && <a href={withLocale('/', 'en')}>
      <button>
        English Page
      </button>
    </a>}

    {languageCode !== 'zh' && <a href={withLocale('/', 'zh')}>
      <button>
        中文页面
      </button>
    </a>}

    {languageCode !== 'ja' && <a href={withLocale('/', 'ja')}>
      <button>
        日本語ページ
      </button>
    </a>}

  </ButtonGroup>;
};

export const MiddleButtonGroup = (props: HTMLAttributes<HTMLDivElement>) => {

  const withLocale = useWithLocale();

  return <ButtonGroup {...props}>
    <a href={withLocale('/research')}>
      <LinkButton>
        <FaMicrochip />
        <Localized>{
          ({ locale }) => locale === 'zh'
            ? '研究室概要' : locale === 'ja'
              ? '研究室概要' : 'Lab Introduction'
        }</Localized>
      </LinkButton>
    </a>
  </ButtonGroup>;
};

export const BottomButtonGroup = (props: HTMLAttributes<HTMLDivElement>) => {

  const withLocale = useWithLocale();

  return <ButtonGroup {...props}>
    <a href={withLocale('/news')}>
      <LinkButton>
        <FaNewspaper />
        <Localized>{
          ({ locale }) => locale === 'zh'
            ? '浏览所有新闻' : locale === 'ja'
              ? 'すべてのニュース' : 'View All Newses'
        }</Localized>
      </LinkButton>
    </a>
    <a href={withLocale('/articles')}>
      <LinkButton>
        <FaNewspaper />
        <Localized>{
          ({ locale }) => locale === 'zh'
            ? '浏览所有文章' : locale === 'ja'
              ? 'すべての文章' : 'View All Articles'
        }</Localized>
      </LinkButton>
    </a>
  </ButtonGroup>;
};