import { HTMLAttributes } from "react";
import * as styles from './index.css';

export const Container = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={[styles.indexContainer, className].filter(Boolean).join(' ')} {...props} />
);
