import Localized from '@/lib/locale/Localized';
import { ReactNode } from 'react';
import {
  FaEnvelope,
  FaResearchgate,
  FaGraduationCap,
  FaGoogleScholar,
  FaLinkedin,
  FaTwitter
} from 'react-icons/fa6';
import * as styles from './people.css';

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

type LinkDefinition = {
  name: string,
  prefix: string,
  icon: ReactNode,
  desc?: 'use-value' | string | ReactNode,
};

const linkDefs: readonly Readonly<LinkDefinition>[] = [
  { name: 'email', prefix: 'mailto:', icon: <FaEnvelope />, desc: 'use-value' },
  { name: 'twitter', prefix: 'https://x.com/', icon: <FaTwitter />, desc: 'Twitter / X' },
  { name: 'linkedIn', prefix: 'https://www.linkedin.com/in/', icon: <FaLinkedin />, desc: 'LinkedIn' },
  { name: 'researchMap', prefix: 'https://researchmap.jp/', icon: <FaResearchgate />, desc: 'ResearchMap' },
  { name: 'researchGate', prefix: 'https://researchmap.jp/', icon: <FaResearchgate />, desc: 'ResearchGate' },
  { name: 'googleScholar', prefix: 'https://scholar.google.com/citations?user=', icon: <FaGoogleScholar />, desc: 'Google Scholar' },
];

const PhotoBox = (props: PhotoBoxProps) => {
  const { name, position, degree, department, links = {}, bio, background, photoUrl } = props;
  return (
    <div className={styles.profileContainer}>
      <div className={styles.infoSection}>
        <h1 className={styles.personName}>{name}</h1>
        <h2 className={styles.personPosition}>{position}</h2>
        <p className={styles.subInfo}><FaGraduationCap /> {degree}</p>
        <p className={styles.subInfo}>{department}</p>

        <div className={styles.personLinks}>
          {linkDefs.map((d) => {
            if (!links[d.name]) return undefined;
            const l = links[d.name];
            const desc = d.desc === 'use-value' ? l : d.desc;
            return <a key={d.name} href={d.prefix + l} target='_blank' rel='noreferrer'>
              {d.icon} {desc}
            </a>;
          })}
        </div>

        <hr className={styles.divider} />

        <div className={styles.section}>
          <p>{bio}</p>
        </div>

        {!!background && <div className={styles.section}>
          <h3><Localized zh='履历' ja='略歴'>Background</Localized></h3>
          <p className={styles.backgroundPreWrap}>{background}</p>
        </div>}
      </div>

      <div className={styles.photoSection}>
        <img src={photoUrl} alt="Photo" />
      </div>
    </div>
  );
};

export default PhotoBox;
