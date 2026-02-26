import { HTMLAttributes } from 'react';
import * as styles from './people.css';

export const Container = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={[styles.peopleContainer, className].filter(Boolean).join(' ')} {...props} />
);
