import type { OnPageTransitionEndAsync } from "vike/types";

export const onPageTransitionEnd: OnPageTransitionEndAsync = async () => {
  // c onsole.log("Page transition end");
  document.querySelector("body")?.classList.remove("page-is-transitioning");
};
