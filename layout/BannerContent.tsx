import useIsClient from "@/lib/react/useIsClient";
import { PropsWithChildren } from "react";
import ReactDOM from "react-dom";

export const BannerContent = (props: PropsWithChildren<object>) => {
  const { children } = props;
  const isClient = useIsClient();
  if (!isClient) {
    return null;
  }
  return ReactDOM.createPortal(
    children, 
    document.getElementById('banner')!
  );
};

export default BannerContent;