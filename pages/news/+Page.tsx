import { useData } from "vike-react/useData";
import { NewsPageData } from "./types";
import NewsCard from "./NewsCard";
import Localized from "@/lib/locale/Localized";


export default function Page() {

  const { records } = useData() as NewsPageData;

  return <>
    <h1><Localized>{
      ({ locale }) => locale === 'zh'
        ? '新闻' : locale === 'ja'
          ? 'ニュース' : 'News'
    }</Localized></h1>
    {records.map((record, i) => <NewsCard
      key={i}
      {...record}
    />)}
  </>;
};