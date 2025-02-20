import { PageContext } from "vike/types";
import { LocaleRecord } from "@/lib/locale";
import { render } from 'vike/abort';
import getMetadata from "../common/getMetadata";


export default function data(pageContext: PageContext) {

  const { filename } = pageContext.routeParams;

  const payload = getMetadata(filename, pageContext as unknown as LocaleRecord);

  if (!payload) {
    throw render(404, 'Article not found.');
  }
  
  return payload;
}
