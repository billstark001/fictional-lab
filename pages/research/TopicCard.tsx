import Markdown from "@/lib/react/MarkdownRenderer";
import * as styles from './research.css';

export type TopicCardProps = {
  image?: string;
  content: string;
};

export const TopicCard = (props: TopicCardProps) => {
  const { image, content } = props;
  return <div className={styles.topicContainer}>
    <img src={image} className={styles.topicImage} />
    <div className={styles.topicContent}>
      <Markdown>{content}</Markdown>
    </div>
  </div>;
};
