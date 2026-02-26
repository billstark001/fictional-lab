import { HTMLAttributes } from "react";
import cx from 'clsx';
import * as styles from './index.css';

export const Container = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cx(styles.indexContainer, className)} {...props} />
);
