
import { styled } from '@linaria/react';

import { PageContext } from "vike/types";
import { PageContextProvider } from "vike-react/usePageContext";
import { ReactNode, StrictMode } from "react";
import { framedByMaxWidth, globalStyles } from './style';
import { NavBar } from './NavBar';
import { Footer } from './Footer';
import { cx } from '@linaria/core';
import { colors } from './style/color';
import { Banner } from './Banner';

const Container = styled.div`
  width: 100%;
`;


const PageContent = styled.div`
  ${framedByMaxWidth}
  padding-bottom: 50px;
  min-height: calc(100vh - 116px);

  opacity: 1;
  transition: opacity 0.3s ease-in-out;

  body.page-is-transitioning & {
    opacity: 0;
  }
`;

export default function LayoutDefault({ children }: { children: ReactNode }) {
  return (
    <Container className={cx(globalStyles, colors)}>
      <NavBar />
      <Banner />
      <Content>{children}</Content>
      <Footer />
    </Container>
  );
}

export function LayoutRoot({ children, pageContext }: { children: ReactNode; pageContext: PageContext }) {
  return (
    <StrictMode>
      <PageContextProvider pageContext={pageContext}>
        <LayoutDefault>{children}</LayoutDefault>
      </PageContextProvider>
    </StrictMode>
  );
}


function Content({ children }: { children: ReactNode }) {
  return (
    <PageContent>{children}</PageContent>
  );
}
