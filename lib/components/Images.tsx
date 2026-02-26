import { HTMLAttributes } from 'react';
import * as styles from './components.css';

export const FullWidthImage = (props: {
  src: string;
} & HTMLAttributes<HTMLDivElement>) => {
  const { src, children, className, ...rest } = props;

  return <>
    <img src={src} className={styles.fullWidthImage} />
    <div
      className={[styles.imageCaption, className].filter(Boolean).join(' ')}
      {...rest}
    >
      {children}
    </div>
  </>;
};
