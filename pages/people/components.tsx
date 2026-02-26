import { HTMLAttributes } from 'react';
import cx from 'clsx';
import * as styles from './people.css';

export const Container = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cx(styles.peopleContainer, className)} {...props} />
);
