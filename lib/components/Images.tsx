import { HTMLAttributes } from 'react';
import { css, cx } from '@linaria/core';

export const FullWidthImage = (props: {
  src: string;
} & HTMLAttributes<HTMLDivElement>) => {

  const { src, children, className, ...rest } = props;

  return <>
    <img
      src={src}
      className={css`
        display: block;
        margin: 32px auto 0px auto;
        :where(&) {
          max-width: 100%;
        }
      `}
    />
    <div
      className={cx(css`
        text-align: center;
        color: var(--gray-50);
        margin: 8px auto 16px auto;
      `, className)}
      {...rest}
    >
      {children}
    </div>
  </>;
};
