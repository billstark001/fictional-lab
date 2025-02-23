import useWithLocale from "@/lib/locale/useWithLocale";
import MetadataRenderer from "../common/MetadataRenderer";
import { ArticlePageRecord } from "../common/types";
import { useData } from "vike-react/useData";

export default function Page() {
  const { articles } = useData() as unknown as {
    articles: ArticlePageRecord[];
  };
  const withLocale = useWithLocale();
  return <>
    {articles.map(a => <MetadataRenderer
      key={a.url}
      to={withLocale(a.url)}
      metadata={a.metadata}
      isCard
    />
    )}
  </>;
}