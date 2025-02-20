import { articlesDirectory } from "../common/defs";
import enumerate from "../common/enumerate";

export default async function () {

  const allFiles = await enumerate(articlesDirectory);

  return [...Object.keys(allFiles)]
    .map(file => ({
      url: `/articles/${file}`
    }));
}