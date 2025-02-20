import { useEffect, useRef } from "react";

// eslint-disable-next-line react/prop-types
function ShadowDom({ head = "", body = "" }) {
  const shadowHostRef = useRef<HTMLDivElement>(null);
  const shadowRootRef = useRef<ShadowRoot>(null);

  useEffect(() => {
    if (shadowHostRef.current && !shadowRootRef.current) {
      shadowRootRef.current = shadowHostRef.current.attachShadow({ mode: "open" });
      shadowRootRef.current.innerHTML = `<head>${head}</head><body>${body}</body>`;
    }
  }, []);

  return (
    <div ref={shadowHostRef} />
  );
}

export default ShadowDom;