import Markdown from "@/lib/react/MarkdownRenderer";
import { DateTime } from 'luxon';
import { NewsRecord } from "./types";
import { generateHtmlId } from "@/lib/html/generateHtmlId";
import { useLocaleRecord } from "@/lib/locale/useLocaleRecord";
import cx from 'clsx';
import * as styles from './news.css';

export const NewsCard = (props: NewsRecord) => {
  const { filename, metadata, content } = props;
  const { locale } = useLocaleRecord();
  const { tags, created } = metadata;

  const id = generateHtmlId(`${created}_${filename}`);

  const dateStr = DateTime.fromMillis(created || 0)
    .setLocale(locale)
    .toLocaleString({ weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });

  return <div className={cx(styles.newsCardContainer, !metadata.image && 'no-image')}>
    <div className={`${styles.timelineCircle} dot`} />

    <div className="timeline">
      <div className={styles.dateContainer}>{dateStr}</div>
    </div>

    <div className="content">
      <div className={styles.idTag}>
        <div className="id-tag" id={id} style={{ position: 'absolute', top: '-100px' }} />
      </div>

      {tags && tags.length > 0 && (
        <div className={styles.tagsStyle}>
          {tags.map((tag, index) => <span key={index}>{tag}</span>)}
        </div>
      )}

      <div className={styles.newsContentPadding}>
        <Markdown>{content}</Markdown>
      </div>
    </div>

    {metadata.image && <img className={`${styles.newsImage} image`} src={metadata.image} />}
  </div>;
};

export default NewsCard;
