import { ReactNode } from "react";
import { NavBar } from './NavBar';
import { Footer } from './Footer';
import { Banner } from './Banner';
import { LocaleRecordProvider, useDynamicLocaleRecord } from '@/lib/locale/useLocaleRecord';
import { useData } from 'vike-react/useData';
import * as styles from './layout.css';
import '@/layout/style/global.css';

export default function Layout({ children }: { children: ReactNode }) {
  const { isErrorPage } = useData<any>() ?? {};
  const dynamicLocaleRecord = isErrorPage
    ? useDynamicLocaleRecord()
    : undefined;
  return <LocaleRecordProvider value={dynamicLocaleRecord}>
    <div className={styles.container}>
      <NavBar />
      <Banner />
      <div className={styles.pageContent}>{children}</div>
      <Footer />
    </div>
  </LocaleRecordProvider>;
}
