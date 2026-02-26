import { HTMLAttributes } from 'react';
import cx from 'clsx';
import * as styles from './components.css';

export const FullWidthImage = (props: {
  src: string;
} & HTMLAttributes<HTMLDivElement>) => {
  const { src, children, className, ...rest } = props;

  return <>
    <img src={src} className={styles.fullWidthImage} />
    <div
      className={cx(styles.imageCaption, className)}
      {...rest}
    >
      {children}
    </div>
  </>;
};
