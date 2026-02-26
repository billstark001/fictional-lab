import React, { HTMLAttributes } from 'react';
import { HiLink } from 'react-icons/hi';
import * as styles from './components.css';

export type HeadingProps = {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  hashtag?: string;
} & HTMLAttributes<HTMLHeadingElement>;

const Heading = (props: HeadingProps) => {
  const { level = 1, children, hashtag, ...rest } = props;
  const HeadingTag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' = `h${level}` as any;

  const handleLinkClick = () => {
    if (hashtag && window) {
      const url = new URL(location.origin + location.pathname);
      url.hash = hashtag;
      window.history.pushState({}, '', url);
    }
  };

  const containerClass = [
    styles.headingContainer,
    hashtag ? styles.headingContainerWithHashtag : styles.headingContainerWithoutHashtag,
  ].join(' ');

  return (
    <div className={containerClass} {...rest}>
      {hashtag && <span className={styles.headingHashtag} id={hashtag} />}
      <HeadingTag
        onMouseEnter={(e) => {
          const linkEl = e.currentTarget.querySelector<HTMLElement>('.heading-link');
          if (linkEl) linkEl.style.opacity = '1';
        }}
        onMouseLeave={(e) => {
          const linkEl = e.currentTarget.querySelector<HTMLElement>('.heading-link');
          if (linkEl) linkEl.style.opacity = '0';
        }}
      >
        <span
          className={`heading-link ${styles.headingLink}`}
          role="button"
          onClick={handleLinkClick}
          tabIndex={0}
        >
          <HiLink size={20} />
        </span>
        {children}
      </HeadingTag>
    </div>
  );
};

export default Heading;
