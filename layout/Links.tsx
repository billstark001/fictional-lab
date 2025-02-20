import Localized from "@/lib/locale/Localized";
import Link from "./Link";
import { css, cx } from "@linaria/core";
import { mediaQueryLessOrEqual } from "@/lib/responsive";


const showOnLgSize = css`
  ${mediaQueryLessOrEqual('md')} {
    display: none;
  }
`;

export const Links = ({ onClick, isMenu }: { onClick?: () => void; isMenu?: boolean }) => {
  const additionalProps: any = !isMenu
    ? { className: cx(showOnLgSize) } 
    : { variant: "menu" };

  const translations: Record<string, Record<string, string>> = {
    en: {
      home: "Home",
      news: "News",
      people: "People",
      research: "Research",
      publications: "Publications",
      workingPublications: "Working Publications",
      journalPapers: "Journal Papers",
      conferencePapers: "Conference Papers",
    },
    ja: {
      home: "ホーム",
      news: "ニュース",
      people: "メンバー",
      research: "研究",
      publications: "出版物",
      workingPublications: "作業中の出版物",
      journalPapers: "ジャーナル論文",
      conferencePapers: "会議論文",
    },
    zh: {
      home: "首页",
      news: "新闻",
      people: "人物",
      research: "研究",
      publications: "出版物",
      workingPublications: "工作中的出版物",
      journalPapers: "期刊论文",
      conferencePapers: "会议论文",
    },
  };

  return (
    <Localized>
      {({ languageCode }) => {
        const t = translations[languageCode] || translations.en; // Default to English if languageCode is not supported

        return (
          <>
            <Link
              to="/"
              label={t.home}
              exactMatch
              subs={[{ to: "/news", label: t.news }]}
              onClick={onClick}
              {...additionalProps}
            />
            <Link
              to="/people"
              label={t.people}
              exactMatch
              onClick={onClick}
              {...additionalProps}
            />
            <Link
              to="/research"
              label={t.research}
              exactMatch
              onClick={onClick}
              {...additionalProps}
            />
            <Link
              to="/publications"
              label={t.publications}
              subs={[
                {
                  to: "/publications#working",
                  label: t.workingPublications,
                  exactMatch: true,
                },
                {
                  to: "/publications#journal",
                  label: t.journalPapers,
                  exactMatch: true,
                },
                {
                  to: "/publications#conf",
                  label: t.conferencePapers,
                  exactMatch: true,
                },
              ]}
              onClick={onClick}
              {...additionalProps}
            />
          </>
        );
      }}
    </Localized>
  );
};

export default Links;