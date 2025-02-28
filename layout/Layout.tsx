
import { styled } from '@linaria/react';

import { ReactNode } from "react";
import { framedByMaxWidth, globalStyles } from './style';
import { NavBar } from './NavBar';
import { Footer } from './Footer';
import { cx } from '@linaria/core';
import { colors } from './style/color';
import { Banner } from './Banner';
import { LocaleRecordProvider, useDynamicLocaleRecord } from '@/lib/locale/useLocaleRecord';
import { useData } from 'vike-react/useData';

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

export default function Layout({ children }: { children: ReactNode }) {
  // sometimes, like in the error page,
  // the locale record pre-rendered is only for default locale
  // so it needs to be parsed dynamically
  const { isErrorPage } = useData<any>() ?? {};
  const dynamicLocaleRecord = isErrorPage 
    ? useDynamicLocaleRecord()
    : undefined;
  return <LocaleRecordProvider value={dynamicLocaleRecord}>
    <Container className={cx(globalStyles, colors)}>
      <NavBar />
      <Banner />
      <PageContent>{children}</PageContent>
      <Footer />
    </Container>
  </LocaleRecordProvider>;
}