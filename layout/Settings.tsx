import { IconButton } from "@/lib/components/Buttons";
import { useSetLocale } from "@/lib/locale/useSetLocale";
import { useTheme } from "@/lib/theme";
import { useDisclosure } from "@/lib/react/useDisclosure";
import { useState, useCallback, MouseEvent } from "react";
import { FaMoon, FaSun, FaEarthAsia } from "react-icons/fa6";
import { Menu } from "./Menu";
import Localized from "@/lib/locale/Localized";
import * as styles from './settings.css';

function Language(props: { onSelect?: (lang: string) => void }) {
  return <div className={styles.languageMenu}>
    <div className={styles.languageMenuItem} onClick={() => props.onSelect?.('en')}>
      <Localized>{
        ({ languageCode }) =>
          languageCode === 'ja' ? '英語'
            : languageCode === 'zh' ? '英语'
              : 'English'
      }</Localized>
    </div>
    <div className={styles.languageMenuItem} onClick={() => props.onSelect?.('ja')}>
      <Localized>{
        ({ languageCode }) =>
          languageCode === 'ja' ? '日本語'
            : languageCode === 'zh' ? '日语'
              : 'Japanese'
      }</Localized>
    </div>
    <div className={styles.languageMenuItem} onClick={() => props.onSelect?.('zh')}>
      <Localized>{
        ({ languageCode }) =>
          languageCode === 'ja' ? '中国語'
            : languageCode === 'zh' ? '简体中文'
              : 'Simplified Chinese'
      }</Localized>
    </div>
  </div>;
}

export const Settings = () => {
  const { toggleTheme } = useTheme();
  const [pos, setPos] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
  const d = useDisclosure();
  const setLocale = useSetLocale();

  const onClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    setPos({ x: e.clientX, y: e.clientY });
    d.onOpen();
    e.preventDefault();
    e.stopPropagation();
  }, [d.onOpen, setPos]);

  return <>
    <IconButton onClick={toggleTheme}>
      <FaMoon className={styles.hideOnLightMode} />
      <FaSun className={styles.hideOnDarkMode} />
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
