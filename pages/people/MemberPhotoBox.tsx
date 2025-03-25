import React, { ReactNode, SVGProps } from 'react';
import { styled } from '@linaria/react';
import { mediaQueryLessOrEqual, mediaQueryMoreOrEqual } from '@/lib/responsive';
import { useLocaleRecord } from '@/lib/locale/useLocaleRecord';
import Localized from '@/lib/locale/Localized';

const DEFAULT_PHOTO = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2VlZWVlZSIvPjxwYXRoIGQ9Ik0xMDAgNjVjMTIgMCAyMiAxMCAyMiAyMnMtMTAgMjItMjIgMjItMjItMTAtMjItMjIgMTAtMjIgMjItMjJ6bTAgNjBjMjUgMCA0NiAxMSA0NiAyNXY1SDU0di01YzAtMTQgMjEtMjUgNDYtMjV6IiBmaWxsPSIjYWFhYWFhIi8+PC9zdmc+';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

`;

const Photo = styled.div`
  --photo-size: 200px;
  width: var(--photo-size);
  height: var(--photo-size);
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 1rem;

  ${mediaQueryMoreOrEqual('xl')} {
    --photo-size: 240px;
  }

  ${mediaQueryLessOrEqual('sm')} {
    --photo-size: 280px;
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Name = styled.h3`
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
  font-weight: 600;
  text-align: center;
`;

const Year = styled.span`
  font-size: 0.9rem;
  font-weight: normal;
  color: var(--gray-20);
  margin-left: 0.5rem;
`;

const Email = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.75rem;
  color: var(--blue-50);
  text-decoration: none;
  font-size: 0.9rem;
  
  &:hover {
    color: var(--blue-40)
  }
  
  svg {
    margin-right: 0.4rem;
  }
`;

const ResearchArea = styled.p`
  margin: 0;
  font-size: 0.9rem;
  text-align: left;
  width: 100%;
  color: var(--gray-20);
`;


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

const noDescTag = <Localized
  ja='記述なし。'
  zh='暂无描述。'
>
  No description.
</Localized>;

// for unknown reason, importing this icon from react-icons
// will cause significant rendering slack
function MdEmail(props: SVGProps<SVGSVGElement>) {
  return <svg viewBox='0 0 24 24' height='1em' fill='currentColor' {...props}>
    <path fill='none' d='M0 0h24v24H0z' />
    <path d='M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z' />
  </svg>;
};

export const MemberPhotoBox: React.FC<MemberPhotoBoxProps> = ({
  name,
  email,
  photo,
  researchArea,
  academicYear
}) => {
  return (
    <Container>
      <Photo>
        <img src={photo || DEFAULT_PHOTO} alt={`${name}`} />
      </Photo>
      <Name>
        {parseName(name)}
        {!!academicYear && <Year>({academicYear})</Year>}
      </Name>
      {!!email && <Email href={`mailto:${email}`}>
        <MdEmail />
        {email}
      </Email>}
      <ResearchArea>{researchArea || noDescTag}</ResearchArea>
    </Container>
  );
};

export default MemberPhotoBox;

// #region multilingual

export type MemberInfo = MemberPhotoBoxProps & {
  lang?: string;
}

export const filterMemberInfoWithLocale = (
  info: MemberInfo[],
  locale: string,
): MemberInfo => {
  const langCode = locale.length > 2 ? locale.substring(0, 1) : locale;
  const accumulate: Partial<MemberInfo> = {};
  let langExactReturn: MemberInfo | undefined = undefined;
  let langCodeReturn: MemberInfo | undefined = undefined;
  let langCodePartialReturn: MemberInfo | undefined = undefined;
  for (const i of info) {
    Object.assign(accumulate, i);
    if (i.lang === locale) {
      langExactReturn = i;
    }
    else if (i.lang === langCode) {
      langCodeReturn = i;
    }
    else if (i.lang && i.lang.length > 2 && i.lang.substring(0, 2) === langCode) {
      langCodePartialReturn = i;
    }
  }
  return {
    ...accumulate,
    ...langExactReturn || langCodeReturn || langCodePartialReturn
  } as MemberInfo;
};

// #endregion

// #region grid

const MembersGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  width: 100%;

  padding: 1em 0;
  
  ${mediaQueryLessOrEqual('lg')} {
    grid-template-columns: repeat(3, 1fr);
  }
  
  ${mediaQueryLessOrEqual('md')} {
    grid-template-columns: repeat(2, 1fr);
  }
  
  ${mediaQueryLessOrEqual('sm')} {
    grid-template-columns: 1fr;
  }
`;

export type MemberInfoList = (MemberInfo | MemberInfo[])[];

export const MembersGrid: React.FC<{ items: MemberInfoList }> = (props) => {
  const { items } = props;

  const { locale } = useLocaleRecord();

  return <MembersGridContainer>
    {items.map((info, index) => {
      const item = Array.isArray(info)
        ? filterMemberInfoWithLocale(info, locale)
        : info;
      if (!item) {
        return undefined;
      }
      return <MemberPhotoBox key={index} {...item} />;
    })}
  </MembersGridContainer>;
};


// #endregion