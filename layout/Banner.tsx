import bgImage from '../assets/flux/social_systems_and_image1.jpg?url';
import bgImageDark from '../assets/flux/innovation_image2.jpg?url';
import { Wave } from './Wave';
import * as styles from './banner.css';
import { useThemeQuery } from '@/lib/theme';

export function Banner() {
  const theme = useThemeQuery();
  const bg = theme === 'dark' ? `url(${bgImageDark})` : `url(${bgImage})`;

  return (
    <div
      className={styles.bannerContainer}
      style={{ backgroundImage: bg } as React.CSSProperties}
    >
      <div className={styles.bannerWrapper} id="banner" />
      <Wave className={styles.waveStyle} />
    </div>
  );
}

export default Banner;
