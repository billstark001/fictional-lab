// https://vike.dev/Head

import logoUrl from "../assets/logo.svg";

import { injectThemeScript } from "@/lib/theme";

export default function HeadDefault() {
  return (
    <>
      <link rel="icon" href={logoUrl} />
      {/* this assures FOUC is avoided */}
      <script>{injectThemeScript}</script>
    </>
  );
}
