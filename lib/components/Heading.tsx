import { styled } from '@linaria/react';
import React, { HTMLAttributes } from 'react';
import { HiLink } from 'react-icons/hi';


const Container = styled.div`
  position: relative;
  margin-top: ${props => props.hasHashtag ? '120px' : '20px'};
  margin-bottom: 16px;
`;

const Link = styled.span`
  opacity: 0;
  color: #4a5568;
  margin-left: -24px;
  padding: 0 4px;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
`;

const Hashtag = styled.span`
  position: absolute;
  top: -100px;
  left: 0;
  color: #718096;
  font-size: 0.875rem;
`;

export type HeadingProps = {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  hashtag?: string;
} & HTMLAttributes<HTMLHeadingElement>;

const Heading = (props: HeadingProps) => {
  const {
    level = 1,
    children,
    hashtag,
    ...rest
  } = props;
  const HeadingTag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' = `h${level}` as any;

  const handleLinkClick = () => {
    if (hashtag && window) {
      const url = new URL(location.origin + location.pathname);
      url.hash = hashtag;
      window.history.pushState({}, '', url);
    }
  };

  return (
    <Container {...rest}>
      {hashtag && (
        <Hashtag id={hashtag} />
      )}
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
        <Link
          className="heading-link"
          role="button"
          onClick={handleLinkClick}
          tabIndex={0}
        >
          <HiLink size={20} />
        </Link>
        {children}
      </HeadingTag>
    </Container>
  );
};

export default Heading;