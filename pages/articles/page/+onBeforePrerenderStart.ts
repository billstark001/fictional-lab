import articlesLanguageRecord from 'articles.lang-gen';
import { articlesDirectory } from '../common/defs';

export default async function () {

  return [...Object.keys(articlesLanguageRecord)]
    .map(fullPath => {
      const name = fullPath.startsWith(articlesDirectory)
        ? fullPath.substring(articlesDirectory.length)
        : fullPath;
      return {
        url: `/articles/${name}`
      };
    });
}