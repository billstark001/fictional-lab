
import Localized from '@/lib/locale/Localized';
import WelcomeContent from './WelcomeContent';

export default function Page() {
  return (
    <div>

      <WelcomeContent />

      <h1><Localized>{
        ({ locale }) => locale === 'zh'
          ? '新闻' : locale === 'ja'
            ? 'ニュース' : 'News'
      }</Localized></h1>

      TODO
    </div>
  );
}
