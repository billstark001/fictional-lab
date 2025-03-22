import { IconButton } from "@/lib/components/Buttons";
import { useSetLocale } from "@/lib/locale/useSetLocale";
import { darkModeQuery, lightModeQuery, useTheme } from "@/lib/theme";
import { useDisclosure } from "@/lib/react/useDisclosure";
import { useState, useCallback, MouseEvent } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { FaEarthAsia } from "react-icons/fa6";
import { Menu } from "./Menu";
import Localized from "@/lib/locale/Localized";
import { css } from "@linaria/core";

function Language(props: {
  onSelect?: (lang: string) => void,
}) {
  return <div className={css`
    display: flex;
    flex-direction: column;
    padding: 4px;

    width: 140px;

    font-size: large;
    text-align: center;

    div {
      margin: 0 12px;
      padding: 8px 0;

      cursor: pointer;

      &:not(:first-child) {
        border-top: 1px solid var(--gray-4);
      }
    }
  `}>
    <div onClick={() => props.onSelect?.('en')}>
      <Localized>{
        ({ languageCode }) =>
          languageCode === 'ja' ? '英語'
            : languageCode === 'zh' ? '英语'
              : 'English'
      }</Localized>
    </div>
    <div onClick={() => props.onSelect?.('ja')}>
      <Localized>{
        ({ languageCode }) =>
          languageCode === 'ja' ? '日本語'
            : languageCode === 'zh' ? '日语'
              : 'Japanese'
      }</Localized>
    </div>
    <div onClick={() => props.onSelect?.('zh')}>
      <Localized>{
        ({ languageCode }) =>
          languageCode === 'ja' ? '中国語'
            : languageCode === 'zh' ? '简体中文'
              : 'Simplified Chinese'
      }</Localized>
    </div>
  </div>;
}


const hideOnDarkMode = css`
  ${darkModeQuery} & {
    display: none;
  }
`;

const hideOnLightMode = css`
  ${lightModeQuery} & { 
    display: none;
  }
`;

export const Settings = () => {
  const { toggleTheme } = useTheme();

  const [pos, setPos] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
  const d = useDisclosure();
  const setLocale = useSetLocale();

  const onClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    setPos({
      x: e.clientX,
      y: e.clientY,
    });
    d.onOpen();
    e.preventDefault();
    e.stopPropagation();
  }, [d.onOpen, setPos]);

  return <>
    <IconButton onClick={toggleTheme}>
      <FaMoon className={hideOnLightMode} />
      <FaSun className={hideOnDarkMode} />
    </IconButton>

    <IconButton onClick={onClick}>
      <FaEarthAsia />
    </IconButton>
    <Menu {...d}
      positionX={pos.x} positionY={pos.y}
      variation='bottom-left'
      v={20}
      h={-20}
    >
      <Language onSelect={(l) => {
        setLocale(l);
        d.onClose();
      }} />
    </Menu>
  </>;
};


export default Settings;