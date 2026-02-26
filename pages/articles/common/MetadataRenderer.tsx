import { FaCalendar, FaUser } from 'react-icons/fa6';
import { Metadata } from '@/lib/metadata/parseMetadata';
import * as styles from '../articles.css';

const langMap: Record<string, Record<string, string>> = {
  en: { title: "Title", description: "Description", authors: "Authors", created: "Created", updated: "Updated", tags: "Tags" },
  zh: { title: "标题", description: "描述", authors: "作者", created: "创建时间", updated: "更新时间", tags: "标签" },
  ja: { title: "タイトル", description: "説明", authors: "著者", created: "作成日", updated: "更新日", tags: "タグ" },
};

export interface MetadataRendererProps {
  metadata: Metadata;
  lang?: string;
  isCard?: boolean;
  to?: string;
}

export function MetadataRenderer(props: MetadataRendererProps) {
  const { metadata, lang: langProp, isCard, to } = props;
  const { title, desc, authors, created, updated, tags } = metadata;
  const lang = langProp || metadata.lang || 'en';

  const translations = langMap[langProp || '']
    || langMap[langProp?.substring(0, 2) || '']
    || langMap[metadata.lang || '']
    || langMap[metadata.lang?.substring(0, 2) || '']
    || langMap.en;

  const containerClass = [
    styles.metadataContainer,
    isCard && styles.metadataContainerCard,
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClass}>
      {isCard
        ? <a href={to} target='_blank' rel="noreferrer"><h1 className={styles.titleStyle}>{title}</h1></a>
        : <h1 className={styles.titleStyle}>{title}</h1>}
      {isCard && desc && <p className={styles.descStyle}>{desc}</p>}

      <div className={styles.metaContainerRow}>
        {authors && authors.length > 0 && (
          <div className={styles.metaRow}>
            <FaUser />
            <span>{translations.authors}: {authors.join(", ")}</span>
          </div>
        )}
        {created && (
          <div className={styles.metaRow}>
            <FaCalendar />
            <span>{translations.created}: {new Date(created).toLocaleDateString(lang)}</span>
          </div>
        )}
        {updated && (
          <div className={styles.metaRow}>
            <FaCalendar />
            <span>{translations.updated}: {new Date(updated).toLocaleDateString(lang)}</span>
          </div>
        )}
        {tags && tags.length > 0 && (
          <div className={styles.tagsStyle}>
            {tags.map((tag, index) => <span key={index}>{tag}</span>)}
          </div>
        )}
      </div>
    </div>
  );
}

export default MetadataRenderer;
