import MapEmbed from '@/lib/MapEmbed';
import * as styles from './footer.css';
import Settings from './Settings';
import { Logo } from './NavBar';
import FooterContent from './FooterContent';

export function Footer() {
  return <div className={styles.footerContainer}>
    <div className={styles.logoContainer}>
      <Logo />
    </div>

    <div className={styles.footerContentContainer}>
      <FooterContent />
    </div>

    <div className={styles.mapWrapper}>
      <MapEmbed />
    </div>

    <div className={styles.settingContainer}>
      <Settings />
    </div>
    <div className={styles.copyrightContainer}>
      © 2024-2025 Fictional Lab. Powered by
      React, Vite, Vike & vanilla-extract.
    </div>
  </div>;
}
