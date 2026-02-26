// Previously used for wyw-in-js CSS workaround; no longer needed with vanilla-extract.
import { Plugin } from 'vite';

export default function forceCss200(): Plugin {
  return {
    name: 'force-css-200',
  };
}
