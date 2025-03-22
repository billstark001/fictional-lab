

import { PublicationList } from './components';

import pubsWork from './_pub_working.bib';
import pubsConf from './_pub_conference.bib';
import pubsJour from './_pub_journal.bib';
import Localized from '@/lib/locale/Localized';
import Heading from '@/lib/components/Heading';


export default function Page() {
  return <>
    <Heading hashtag='working'>
      <Localized>{({ locale }) =>
        locale === 'zh' ? '工作中的出版物'
          : locale === 'ja' ? '作業中の出版物'
            : 'Working Publications'
      }</Localized>
    </Heading>
    <PublicationList entries={pubsWork} headCharacter='W' />
    
    <Heading hashtag='journal'>
      <Localized>{({ locale }) =>
        locale === 'zh' ? '期刊论文'
          : locale === 'ja' ? 'ジャーナル論文'
            : 'Journal Papers'
      }</Localized>
    </Heading>
    <PublicationList entries={pubsJour} headCharacter='J' />

    <Heading hashtag='conf'>
      <Localized>{({ locale }) =>
        locale === 'zh' ? '会议论文'
          : locale === 'ja' ? '会議論文'
            : 'Conference Papers'
      }</Localized>
    </Heading>
    <PublicationList entries={pubsConf} headCharacter='C' />
  </>;
}