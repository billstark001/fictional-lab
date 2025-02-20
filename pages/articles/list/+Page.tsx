import MetadataRenderer from "../common/MetadataRenderer";
import { ArticlePageRecord } from "../common/types";
import { useData } from "vike-react/useData";

export default function Page() {
  const { articles } = useData() as unknown as {
    articles: ArticlePageRecord[];
  };
  return <>
    {articles.map(a => <MetadataRenderer
      key={a.url}
      to={a.url}
      metadata={a.metadata}
      isCard
    />
    )}
  </>;
}