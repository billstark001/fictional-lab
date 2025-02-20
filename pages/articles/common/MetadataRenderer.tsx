import { FaCalendarAlt, FaUser } from 'react-icons/fa';
import { Metadata } from '@/lib/metadata/parseMetadata';
import { css, cx } from '@linaria/core';

// 定义样式
const container = css`
  color: var(--gray-1);
  margin-bottom: 1.5rem;
  font-family: 'Arial', sans-serif;

  &.card {
    padding: 16px;
    border: 1px solid var(--gray-4);
    border-radius: 20px;
  }
`;

const titleStyle = css`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const descStyle = css`
  font-size: 1rem;
  color: var(--gray-3);
  margin-bottom: 1rem;
`;

const metaContainer = css`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const metaRow = css`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: var(--gray-4);

  svg {
    color: var(--blue-4);
  }
`;

const tagsStyle = css`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;

  span {
    background-color: var(--blue-6);
    color: var(--gray-1);
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    font-size: 0.85rem;
  }
`;


const langMap: Record<string, Record<string, string>> = {
  en: {
    title: "Title",
    description: "Description",
    authors: "Authors",
    created: "Created",
    updated: "Updated",
    tags: "Tags",
  },
  zh: {
    title: "标题",
    description: "描述",
    authors: "作者",
    created: "创建时间",
    updated: "更新时间",
    tags: "标签",
  },
  ja: {
    title: "タイトル",
    description: "説明",
    authors: "著者",
    created: "作成日",
    updated: "更新日",
    tags: "タグ",
  },
};

export interface MetadataRendererProps {
  metadata: Metadata;
  lang?: string;
  isCard?: boolean;
  to?: string;
}

export function MetadataRenderer(props: MetadataRendererProps) {
  const { metadata, lang: langProp, isCard, to } = props;
  const {
    title,
    desc,
    authors,
    created,
    updated,
    tags,
  } = metadata;
  const lang = langProp || metadata.lang || 'en';

  const translations = langMap[langProp || '']
    || langMap[langProp?.substring(0, 2) || '']
    || langMap[metadata.lang || '']
    || langMap[metadata.lang?.substring(0, 2) || '']
    || langMap.en;

  return (
    <div className={cx(container, isCard && 'card')}>
      {isCard 
        ? <a href={to} target='_blank' rel="noreferrer"><h1 className={titleStyle}>{title}</h1></a>
        : <h1 className={titleStyle}>{title}</h1>}
      {isCard && desc && <p className={descStyle}>{desc}</p>}

      <div className={metaContainer}>
        {authors && authors.length > 0 && (
          <div className={metaRow}>
            <FaUser />
            <span>
              {translations.authors}: {authors.join(", ")}
            </span>
          </div>
        )}

        {created && (
          <div className={metaRow}>
            <FaCalendarAlt />
            <span>
              {translations.created}: {new Date(created).toLocaleDateString(lang)}
            </span>
          </div>
        )}

        {updated && (
          <div className={metaRow}>
            <FaCalendarAlt />
            <span>
              {translations.updated}: {new Date(updated).toLocaleDateString(lang)}
            </span>
          </div>
        )}

        {tags && tags.length > 0 && (
          // <div>
          //   <strong>{translations.tags}:</strong>

          // </div>
          <div className={tagsStyle}>
            {tags.map((tag, index) => (
              <span key={index}>{tag}</span>
            ))}
          </div>
        )}

      </div>

      {/* {uncategorized && (
        <div className={uncategorizedStyle}>
          <strong>Uncategorized:</strong>
          <pre>{JSON.stringify(uncategorized, null, 2)}</pre>
        </div>
      )} */}
    </div>
  );
}

export default MetadataRenderer;