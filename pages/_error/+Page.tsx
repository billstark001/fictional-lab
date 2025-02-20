import Localized from "@/lib/locale/Localized";
import useWithLocale from "@/lib/locale/useWithLocale";
import { css } from "@linaria/core";
import { FaHome } from "react-icons/fa";
import { usePageContext } from "vike-react/usePageContext";

const BackToHomepage = () => {
  const homepageHref = useWithLocale()('/');

  return (
    <a href={homepageHref}>
      <p
        className={css`
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 10px;
        `}
      >
        <FaHome />
        <Localized>
          {({ languageCode }) => {
            if (languageCode === 'ja') {
              return 'ホームページへ戻る';
            }
            if (languageCode === 'zh') {
              return '返回主页';
            }
            return 'Back to Homepage';
          }}
        </Localized>
      </p>
    </a>
  );
};

export default function Page() {
  const { is404 } = usePageContext();

  return is404 ? (
    <>
      <h1>
        <Localized>
          {({ languageCode }) => {
            if (languageCode === 'ja') {
              return '404 ページが見つかりません';
            }
            if (languageCode === 'zh') {
              return '404 页面未找到';
            }
            return '404 Page Not Found';
          }}
        </Localized>
      </h1>
      <p>
        <Localized>
          {({ languageCode }) => {
            if (languageCode === 'ja') {
              return 'このページは見つかりませんでした。';
            }
            if (languageCode === 'zh') {
              return '无法找到该页面。';
            }
            return 'This page could not be found.';
          }}
        </Localized>
      </p>
      <BackToHomepage />
    </>
  ) : (
    <>
      <h1>
        <Localized>
          {({ languageCode }) => {
            if (languageCode === 'ja') {
              return '500 内部サーバーエラー';
            }
            if (languageCode === 'zh') {
              return '500 内部服务器错误';
            }
            return '500 Internal Server Error';
          }}
        </Localized>
      </h1>
      <p>
        <Localized>
          {({ languageCode }) => {
            if (languageCode === 'ja') {
              return '何かがうまくいかなかったようです。';
            }
            if (languageCode === 'zh') {
              return '出了点问题。';
            }
            return 'Something went wrong.';
          }}
        </Localized>
      </p>
      <BackToHomepage />
    </>
  );
}