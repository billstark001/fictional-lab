import type { OnPageTransitionStartAsync } from "vike/types";

export const onPageTransitionStart: OnPageTransitionStartAsync = async () => {
  // c onsole.log("Page transition start");
  document.querySelector("body")?.classList.add("page-is-transitioning");
};
