import { styled } from '@linaria/react';
import { framedByMaxWidth } from './style';
import bgImage from '../assets/flux/social_systems_and_image1.jpg?url';
import bgImageDark from '../assets/flux/innovation_image2.jpg?url';
import { Wave } from './Wave';
import { css } from '@linaria/core';
import { mediaQueryLessOrEqual } from '@/lib/responsive';
import { darkModeQuery } from '@/lib/theme';

const BannerContainer = styled.div<{ img: string, img2: string }>`
  --wave-height: 120px;
  --banner-height: 600px;
  width: 100%;
  background-image: ${p => p.img};
  background-size: cover;
  background-position: center;
  color: white;
  height: calc(var(--banner-height) + var(--wave-height));

  ${mediaQueryLessOrEqual('md')} {
    --banner-height: 400px;
  }

  ${darkModeQuery} & {
    background-image: ${p => p.img2};
  }
`;

const BannerWrapper = styled.div`
  ${framedByMaxWidth}
  padding-top: 110px;
  padding-bottom: 30px;
  height: var(--banner-height);
`;

export function Banner() {
  return (
    <BannerContainer img={`url(${bgImage})`} img2={`url(${bgImageDark})`}>
      <BannerWrapper id="banner">
      </BannerWrapper>
      <Wave className={css`
        width: 100%;
        height: var(--wave-height);
        path {
          transition: fill 0.1s ease;
        }
      `}/>
    </BannerContainer>
  );
}

export default Banner;