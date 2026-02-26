import React, { ReactNode, SVGProps } from 'react';
import { useLocaleRecord } from '@/lib/locale/useLocaleRecord';
import Localized from '@/lib/locale/Localized';
import * as styles from './people.css';

const DEFAULT_PHOTO = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2VlZWVlZSIvPjxwYXRoIGQ9Ik0xMDAgNjVjMTIgMCAyMiAxMCAyMiAyMnMtMTAgMjItMjIgMjItMjItMTAtMjItMjIgMTAtMjIgMjItMjJ6bTAgNjBjMjUgMCA0NiAxMSA0NiAyNXY1SDU0di01YzAtMTQgMjEtMjUgNDYtMjV6IiBmaWxsPSIjYWFhYWFhIi8+PC9zdmc+';

export type MemberPhotoBoxProps = {
  name: string | [string, string][];
  email?: string;
  photo?: string;
  researchArea?: ReactNode;
  academicYear?: string;
};

export const parseName = (name: string | [string, string][]): ReactNode => {
  if (Array.isArray(name)) {
    return <span>
      {name.map(([n, read], i) => <ruby key={i}> {n} <rt> {read} </rt></ruby>)}
    </span>;
  }
  return name;
};

const noDescTag = <Localized ja='記述なし。' zh='暂无描述。'>No description.</Localized>;

function MdEmail(props: SVGProps<SVGSVGElement>) {
  return <svg viewBox='0 0 24 24' height='1em' fill='currentColor' {...props}>
    <path fill='none' d='M0 0h24v24H0z' />
    <path d='M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z' />
  </svg>;
}

export const MemberPhotoBox: React.FC<MemberPhotoBoxProps> = ({ name, email, photo, researchArea, academicYear }) => {
  return (
    <div className={styles.memberContainer}>
      <div className={styles.memberPhoto}>
        <img src={photo || DEFAULT_PHOTO} alt={`${name}`} />
      </div>
      <h3 className={styles.memberName}>
        {parseName(name)}
        {!!academicYear && <span className={styles.memberYear}>({academicYear})</span>}
      </h3>
      {!!email && <a href={`mailto:${email}`} className={styles.memberEmail}>
        <MdEmail />
        {email}
      </a>}
      <p className={styles.memberResearchArea}>{researchArea || noDescTag}</p>
    </div>
  );
};

export default MemberPhotoBox;

// #region multilingual

export type MemberInfo = MemberPhotoBoxProps & { lang?: string; }

export const filterMemberInfoWithLocale = (info: MemberInfo[], locale: string): MemberInfo => {
  const langCode = locale.length > 2 ? locale.substring(0, 1) : locale;
  const accumulate: Partial<MemberInfo> = {};
  let langExactReturn: MemberInfo | undefined;
  let langCodeReturn: MemberInfo | undefined;
  let langCodePartialReturn: MemberInfo | undefined;
  for (const i of info) {
    Object.assign(accumulate, i);
    if (i.lang === locale) langExactReturn = i;
    else if (i.lang === langCode) langCodeReturn = i;
    else if (i.lang && i.lang.length > 2 && i.lang.substring(0, 2) === langCode) langCodePartialReturn = i;
  }
  return { ...accumulate, ...langExactReturn || langCodeReturn || langCodePartialReturn } as MemberInfo;
};

// #endregion

// #region grid

export type MemberInfoList = (MemberInfo | MemberInfo[])[];

export const MembersGrid: React.FC<{ items: MemberInfoList }> = (props) => {
  const { items } = props;
  const { locale } = useLocaleRecord();

  return <div className={styles.membersGridContainer}>
    {items.map((info, index) => {
      const item = Array.isArray(info) ? filterMemberInfoWithLocale(info, locale) : info;
      if (!item) return undefined;
      return <MemberPhotoBox key={index} {...item} />;
    })}
  </div>;
};

// #endregion
