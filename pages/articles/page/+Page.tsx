import { Container } from "./components";
import { useData } from "vike-react/useData";
import { ArticlePageContext } from "../common/types";

export default function Page () {
  const r = useData() as ArticlePageContext;
  return (
    <Container {...r}/>
  );
}
