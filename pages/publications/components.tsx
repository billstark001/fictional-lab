import React, { useMemo } from 'react';
import { Author, parseAuthor } from './author';
import { Entry } from 'bibtex-js-parser';
import { IoIosCopy } from "react-icons/io";
import * as styles from './publications.css';

interface PublicationProps {
  entry: Entry & { errors?: string[] };
  index?: number | string;
}

const ErrorCard = (props: { errors?: string[], raw: string }) => {
  const { errors, raw } = props;
  if (!errors?.length) return undefined;
  return <div className={styles.errorCard}>
    <pre><code>{raw}</code></pre>
    Errors occurred while parsing the citation:
    {errors.map((e, i) => <div key={i}>{e}</div>)}
  </div>;
};

const doHighlightAuthor = (author: Author) => {
  if (!author || author.middle?.length || !author.last || !author.first) return false;
  const first = author.first.toLowerCase().trim();
  const last = author.last.toLowerCase().trim();
  return last === 'doe' && (first === 'jane' || first === 'j.');
};

const formatAuthor = (author: Author) =>
  `${author.first} ${author.middle.join(' ')} ${author.last}`.trim();

const AuthorList = (props: PublicationProps) => {
  const authors = useMemo(() => parseAuthor(props.entry.author ?? ''), [props.entry.author]);
  return <div className={styles.authorListWrapper}>
    {authors.map((author, index) => author && <span
      key={index}
      className={['author', doHighlightAuthor(author) && 'highlight'].filter(Boolean).join(' ')}
    >{formatAuthor(author)}</span>)}
  </div>;
};

const BasicInfo = (props: PublicationProps) => {
  const { entry } = props;
  let journal = '';
  if (entry.journal) {
    journal = `${entry.journal}`;
    if (entry.volume) journal += `, ${entry.volume}`;
    if (entry.pages) journal += `: ${entry.pages}`;
  }
  const venue = entry.journal || entry.booktitle || undefined;
  return <>
    {!!entry.year && <span>({entry.year})</span>}
    <span> {entry.title}.</span>
    {venue && <span> {venue}.</span>}
    {entry.publisher && <span> {entry.publisher}.</span>}
  </>;
};

export const Publication = ({ entry, index }: PublicationProps) => {
  return (
    <div className={styles.publicationWrapper}>
      {!!index && <span>[{index}] </span>}
      <AuthorList entry={entry} />
      <span>{'. '}</span>
      <BasicInfo entry={entry} />
      {!!entry.doi &&
        <a className={styles.doiLink} href={`https://doi.org/${entry.doi}`} target="_blank" rel="noopener noreferrer">
          DOI: {entry.doi}
        </a>}
      <ErrorCard errors={entry.errors} raw={entry.raw} />
      {!!entry.url &&
        <a className='cite-copy clickable-icon' href={entry.url}>
          <IoIosCopy />
        </a>}
    </div>
  );
};

export const PublicationList = ({ entries, headCharacter }: { entries: Entry[], headCharacter?: string }) => {
  return <div>
    {entries.map((pub, i) => <Publication
      key={i} entry={pub as any}
      index={headCharacter ? `${headCharacter}${i + 1}` : (i + 1)}
    />)}
  </div>;
};
