
import Localized from '@/lib/locale/Localized';
import WelcomeContent from './WelcomeContent';
import NewsBox, { NewsStack } from './NewsBox';
import { useData } from 'vike-react/useData';
import type getNewsList from '../news/getNewsList';
import { generateHtmlId } from '@/lib/html/generateHtmlId';
import { BottomButtonGroup, MiddleButtonGroup, TopButtonGroup } from './ButtonGroups';

export default function Page() {

  const { records } = useData<Awaited<ReturnType<typeof getNewsList>>>();

  return (
    <div>

      <TopButtonGroup />

      <WelcomeContent />

      <MiddleButtonGroup />

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

      <BottomButtonGroup />
    </div>
  );
}
