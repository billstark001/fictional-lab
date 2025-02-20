import vikeReact from "vike-react/config";
import type { Config } from "vike/types";
import Layout from "../layout/Layout";

// Default config (can be overridden by pages)
// https://vike.dev/config
export default {

  prerender: true,
  // https://vike.dev/Layout
  Layout,

  // https://vike.dev/head-tags
  title: "Fictional Lab",
  description: "Fictional Lab",
  passToClient: ['urlLogical', 'locale', 'languageCode', 'areaCode'],

  extends: [
    vikeReact,
  ],
} satisfies Config;
