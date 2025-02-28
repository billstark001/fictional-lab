
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
import { LocaleRecordProvider, useDynamicLocaleRecord } from '@/lib/locale/useLocaleRecord';

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
  // sometimes, like in the error page,
  // the locale record pre-rendered is only for default locale
  // so it needs to be parsed dynamically
  const dynamicLocaleRecord = useDynamicLocaleRecord();
  return (
    <StrictMode>
      <PageContextProvider pageContext={pageContext}>
        <LocaleRecordProvider value={dynamicLocaleRecord}>
          <LayoutDefault>{children}</LayoutDefault>
        </LocaleRecordProvider>
      </PageContextProvider>
    </StrictMode>
  );
}


function Content({ children }: { children: ReactNode }) {
  return (
    <PageContent>{children}</PageContent>
  );
}
