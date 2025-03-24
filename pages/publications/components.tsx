import { styled } from '@linaria/react';
import React, { useMemo } from 'react';
import { Author, parseAuthor } from './author';
import { Entry } from 'bibtex-js-parser';
import { css, cx } from '@linaria/core';
import { IoIosCopy } from "react-icons/io";


// type defs

interface PublicationProps {
  entry: Entry & { errors?: string[] };
  index?: number | string;
}

// error

const ErrorCard = (props: { errors?: string[], raw: string }) => {
  const { errors, raw } = props;
  if (!errors?.length) {
    return;
  }
  return <div className={css`
    color: red;
    border: 1px solid var(--gray-50);
    border-radius: 0.5em;
    padding: 1em;
  `}>
    <pre><code>{raw}</code></pre>
    Errors occurred while parsing the citation:
    {errors.map((e, i) => <div key={i}>{e}</div>)}
  </div>;
};

// author

const AuthorListWrapper = styled.div`
  display: inline;
  font-style: italic;

  & > .author:nth-child(1n+2)::before {
    content: ', ';
  }

  & > .author.highlight {
    font-weight: bold;
  }
`;

const doHighlightAuthor = (author: Author) => {
  if (!author || author.middle?.length || !author.last || !author.first) {
    return false;
  }
  const first = author.first.toLowerCase().trim();
  const last = author.last.toLowerCase().trim();
  return last === 'doe' && (first === 'jane' || first === 'j.');
};

const formatAuthor = (author: Author) => {
  const fullName = `${author.first} ${author.middle.join(' ')} ${author.last}`.trim();
  return fullName;
};

const AuthorList = (props: PublicationProps) => {
  const authors = useMemo(() => parseAuthor(props.entry.author ?? ''), [props.entry.author]);
  return <AuthorListWrapper>
    {authors.map((author, index) => author && <span
      key={index} className={cx('author', doHighlightAuthor(author) && 'highlight')}
    >{formatAuthor(author)}</span>)}
  </AuthorListWrapper>;
};

const BasicInfo = (props: PublicationProps) => {
  const { entry } = props;

  let journal = '';
  if (entry.journal) {
    journal = `${entry.journal}`;
    if (entry.volume) {
      journal += `, ${entry.volume}`;
      // if (entry.issue) {
      //   journal += `(${entry.issue})`;
      // }
    }
    if (entry.pages) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      journal += `: ${entry.pages}`;
    }
  }

  const venue = entry.journal || entry.booktitle || undefined;

  return <>
    {!!entry.year && <span>({entry.year})</span>}
    <span> {entry.title}.</span>
    {venue && <span> {venue}.</span>}
    {entry.publisher && <span> {entry.publisher}.</span>}
  </>;
};

const PublicationWrapper = styled.div`
  margin: 0.6em 0;
`;

const DOILink = styled.a`
  color: var(--blue-40);
  text-decoration: none;

  margin: 0 6px;
  
  &:hover {
    text-decoration: underline;
  }
`;


export const Publication = ({ entry, index }: PublicationProps) => {
  return (
    <PublicationWrapper>
      {!!index && <span>[{index}] </span>}
      <AuthorList entry={entry} />
      <span>{'. '}</span>
      <BasicInfo entry={entry} />
      {!!entry.doi &&
        <DOILink href={`https://doi.org/${entry.doi}`} target="_blank" rel="noopener noreferrer">
          DOI: {entry.doi}
        </DOILink>}
      <ErrorCard errors={entry.errors} raw={entry.raw} />
      {!!entry.url && 
        <a 
          className='cite-copy clickable-icon' 
          href={entry.url}
        >
          <IoIosCopy />
        </a>}
    </PublicationWrapper>
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