
import { styled } from '@linaria/react';

import MapEmbed from '@/lib/MapEmbed';
import { framedByMaxWidth } from './style';
import { mediaQueryLessOrEqual, mediaQueryMoreOrEqual } from '@/lib/responsive';
import Settings from './Settings';
import { Logo } from './NavBar';
import FooterContent from './FooterContent';

const FooterContainer = styled.div`
  border-top: 1px solid var(--gray-60);
  width: 100%;

  background-color: var(--blue-80);
`;

const MapWrapper = styled.div`
  width: 100%;
  height: 600px;

  ${mediaQueryLessOrEqual('md')} {
    height: 500px;
  }

  ${mediaQueryLessOrEqual('sm')} {
    height: 400px;
  }
`;

const CopyrightContainer = styled.div`
  ${framedByMaxWidth}
  padding-top: 8px;
  padding-bottom: 8px;

  min-height: 50px;
  margin: 0 auto;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  font-size: small;
`;

const SettingContainer = styled(CopyrightContainer)`
  font-size: medium;
  padding-bottom: 0;
  gap: 16px;

  ${mediaQueryLessOrEqual('sm')} {
    display: none;
  }
`;

const FooterContentContainer = styled.div`
  ${framedByMaxWidth}
  padding-top: 48px;
  padding-bottom: 48px;

  --section-gap: 16px;

  display: grid;
  grid-template-columns: 1fr; /* 默认单列布局 */
  gap: var(--section-gap);

  ${mediaQueryMoreOrEqual('md')} {
    grid-template-columns: repeat(2, 1fr); /* 中等屏幕及以上显示两列 */
    gap: var(--section-gap); /* 列间距 */
  }

  section {
    display: flex;
    flex-direction: column; /* 确保 section 内部内容向上对齐 */
    align-items: flex-start; /* 确保 section 内部内容向左对齐 */
  }

  .wrap {
    white-space: pre-wrap;
  }
`;

const LogoContainer = styled.div`
  ${framedByMaxWidth}
  width: 100%;
  padding-top: 32px;
`;

export function Footer() {


  return <FooterContainer>
    <LogoContainer>
      <Logo />
    </LogoContainer>

    <FooterContentContainer>
      <FooterContent />
    </FooterContentContainer>

    <MapWrapper>
      <MapEmbed />
    </MapWrapper>
    
    <SettingContainer>
      <Settings />
    </SettingContainer>
    <CopyrightContainer>
      © 2024-2025 Fictional Lab. Powered by
      React, Vite, Vike & Linaria.
    </CopyrightContainer>
  </FooterContainer>;
}