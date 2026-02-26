import { useLocaleRecord } from "@/lib/locale/useLocaleRecord";
import useWithLocale from "@/lib/locale/useWithLocale";
import { Metadata } from "@/lib/metadata/parseMetadata";
import { DateTime } from "luxon";
import { FC, HTMLAttributes, useMemo } from "react";
import { FaCalendar } from "react-icons/fa";
import cx from 'clsx';
import * as styles from './index.css';

export const NewsStack: FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={cx(styles.newsStack, className)} {...props} />
);

export const NewsBox = (props: Metadata & { to?: string }) => {
  const { title, desc, image, created, to } = props;
  const { locale } = useLocaleRecord();
  const withLocale = useWithLocale();

  const dateStr = useMemo(() => {
    if (!created) return undefined;
    return DateTime.fromMillis(created || 0)
      .setLocale(locale)
      .toLocaleString({ weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
  }, [created, locale]);

  return <a href={withLocale(to)} className={styles.newsBoxContainer}>
    <img src={image} className={styles.imageBox} />
    {title ? <h1 className={styles.titleBox}>{title}</h1> : undefined}
    {dateStr ? <span><FaCalendar /> {dateStr}</span> : undefined}
    <p className={styles.contentBox}>{desc}</p>
  </a>;
};

export default NewsBox;
