import Localized from '@/lib/locale/Localized';
import { mediaQueryLessOrEqual } from '@/lib/responsive';
import { styled } from '@linaria/react';
import { ReactNode } from 'react';
import { FaEnvelope, FaTwitter, FaLinkedin, FaResearchgate, FaGraduationCap } from 'react-icons/fa';

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  overflow: hidden;

  margin-bottom: 20px;
  
  ${mediaQueryLessOrEqual('md')} {
    flex-direction: column;
  }
`;

const InfoSection = styled.div`
  flex: 2;
  padding-right: 30px;
  
  ${mediaQueryLessOrEqual('md')} {
    padding-right: inherit;
    padding-bottom: 20px;
  }
`;

const PhotoSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--gray-6);
  border-radius: 20px;

  min-width: 400px;
  max-height: 400px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px;
  }
  
  ${mediaQueryLessOrEqual('md')} {
    min-width: inherit;
  }
`;

const Name = styled.h1`
  font-size: 28px;
  margin-bottom: 5px;
  
  ${mediaQueryLessOrEqual('md')} {
    font-size: 24px;
  }
`;

const Position = styled.h2`
  font-size: 20px;
  color: var(--gray-2);
  margin-bottom: 10px;
  font-weight: 500;
  
  ${mediaQueryLessOrEqual('md')} {
    font-size: 18px;
  }
`;

const SubInfo = styled.p`
  color: var(--gray-2);
  margin: 5px 0;
  font-size: 16px;
  
  ${mediaQueryLessOrEqual('md')} {
    font-size: 14px;
  }
`;

const Divider = styled.hr`
  border: 0;
  height: 1px;
  background-color: var(--gray-6);
  margin: 20px 0;
`;

const Section = styled.div`
  margin-bottom: 20px;
  
  h3 {
    font-size: 18px;
    margin-bottom: 10px;
  }
  
  p {
    color: var(--gray-2);
    line-height: 1.6;
  }
`;

const Links = styled.div`
  display: flex;
  margin: 15px 0;
  flex-wrap: wrap;
  gap: 10px;
  
  a {
    color: var(--blue-4);
    display: flex;
    align-items: center;
    text-decoration: none;
    transition: color 0.3s;
    
    &:hover {
      color: var(--blue-3);
    }
    
    svg {
      margin-right: 5px;
      font-size: 18px;
    }
  }
`;

export type PhotoBoxProps = {
  name?: ReactNode,
  position?: ReactNode,
  degree?: ReactNode,
  department?: ReactNode,
  links?: Record<string, string>,
  bio?: ReactNode,
  background?: ReactNode,
  photoUrl?: string
};

const PhotoBox = (props: PhotoBoxProps) => {
  const {
    name,
    position,
    degree,
    department,
    links = {},
    bio,
    background,
    photoUrl
  } = props;
  return (
    <ProfileContainer>
      <InfoSection>
        <Name>{name}</Name>
        <Position>{position}</Position>
        <SubInfo><FaGraduationCap /> {degree}</SubInfo>
        <SubInfo>{department}</SubInfo>

        <Links>
          {!!links.email && (
            <a href={`mailto:${links.email}`}>
              <FaEnvelope /> {links.email}
            </a>
          )}
          {!!links.twitter && (
            <a href={links.twitter} target="_blank" rel="noopener noreferrer">
              <FaTwitter /> Twitter
            </a>
          )}
          {!!links.linkedin && (
            <a href={links.linkedin} target="_blank" rel="noopener noreferrer">
              <FaLinkedin /> LinkedIn
            </a>
          )}
          {!!links.researchgate && (
            <a href={links.researchgate} target="_blank" rel="noopener noreferrer">
              <FaResearchgate /> ResearchGate
            </a>
          )}
        </Links>

        <Divider />

        <Section>
          <p>{bio}</p>
        </Section>

        {!!background && <Section>
          <h3><Localized
            zh='履历'
            ja='略歴'
          >
            Background
          </Localized></h3>
          <p>{background}</p>
        </Section>}
      </InfoSection>

      <PhotoSection>
        <img src={photoUrl} alt={`Photo`} />
      </PhotoSection>
    </ProfileContainer>
  );
};

export default PhotoBox;