
import path from "path";
import { LocaleRecord } from "@/lib/locale";
import { PageContext } from "vike/types";
import getNewsList from "../news/getNewsList";

const newsDirectory = path.join(process.cwd(), 'pages/news/_news');
const tagsFilePath = path.join(process.cwd(), 'pages/news/_tags.yaml');

export default async function data(pageContext: PageContext) {

  const data = getNewsList(
    newsDirectory,
    tagsFilePath,
    (pageContext as unknown as LocaleRecord).languageCode,
    true,
  );

  return data;
}