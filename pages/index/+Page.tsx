
import Localized from '@/lib/locale/Localized';
import WelcomeContent from './WelcomeContent';
import NewsBox, { AllNewsButton, NewsStack } from './NewsBox';
import { useData } from 'vike-react/useData';
import type getNewsList from '../news/getNewsList';
import useWithLocale from '@/lib/locale/useWithLocale';
import { generateHtmlId } from '@/lib/html/generateHtmlId';

export default function Page() {

  const { records } = useData<Awaited<ReturnType<typeof getNewsList>>>();
    const withLocale = useWithLocale();

  return (
    <div>

      <WelcomeContent />

      <h1><Localized>{
        ({ locale }) => locale === 'zh'
          ? '新闻' : locale === 'ja'
            ? 'ニュース' : 'News'
      }</Localized></h1>

      <NewsStack>
        {records.map(({ filename, metadata }) => <NewsBox
          key={filename}
          to={'/news#' + generateHtmlId(`${metadata.created}_${filename}`)}
          {...metadata}
        />)}
      </NewsStack>

      <AllNewsButton href={withLocale('/news')} />
    </div>
  );
}
