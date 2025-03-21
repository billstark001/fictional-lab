import React, { ReactNode } from 'react';
import { styled } from '@linaria/react';
import { mediaQueryLessOrEqual, mediaQueryMoreOrEqual } from '@/lib/responsive';
import { FaEnvelope } from 'react-icons/fa6';

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
  color: var(--gray-2);
  margin-left: 0.5rem;
`;

const Email = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.75rem;
  color: var(--blue-4);
  text-decoration: none;
  font-size: 0.9rem;
  
  &:hover {
    color: var(--blue-3)
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
  line-height: 1.5;
  color: var(--gray-2);
`;


export type MemberPhotoBoxType = {
  name: string;
  email: string;
  photo?: string;
  researchArea?: ReactNode;
  academicYear?: string;
};

export const MemberPhotoBox: React.FC<MemberPhotoBoxType> = ({
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
        {name}
        {academicYear && <Year>({academicYear})</Year>}
      </Name>
      <Email href={`mailto:${email}`}>
        <FaEnvelope size={18} />
        {email}
      </Email>
      <ResearchArea>{researchArea}</ResearchArea>
    </Container>
  );
};

export default MemberPhotoBox;

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

export const MembersGrid: React.FC<{ items: MemberPhotoBoxType[] }> = ({ items }) => {
  return <MembersGridContainer>
    {items.map((item, index) => <MemberPhotoBox key={index} {...item} />)}
  </MembersGridContainer>;
};
