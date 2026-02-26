import { IframeHTMLAttributes } from "react";
import { useThemeQuery } from "./theme";
import cx from 'clsx';
import * as styles from './map.css';

export type MapEmbedProps = {
  latitude?: number;
  longitude?: number;
  mapType?: 'google' | 'openstreetmap' | 'amap';
  zoom?: number;
  additionalParams?: string;
} & IframeHTMLAttributes<HTMLIFrameElement>;

const MapEmbed = (props: MapEmbedProps) => {
  const {
    latitude = 37.7749,
    longitude = -122.4194,
    mapType = "openstreetmap",
    zoom = 12,
    additionalParams,
    className,
    ...iframeProps
  } = props;

  const _p = additionalParams ? '&' + additionalParams : '';

  const getMapUrl = () => {
    switch (mapType) {
      case "google":
        return `https://www.google.com/maps/embed/v1/view?key=YOUR_GOOGLE_API_KEY&center=${latitude},${longitude}&zoom=${zoom}&maptype=roadmap${_p}`;
      case "openstreetmap":
        return `https://www.openstreetmap.org/export/embed.html?bbox=${longitude - 0.03}%2C${latitude - 0.03}%2C${longitude + 0.03}%2C${latitude + 0.03}&layer=mapnik${_p}`;
      case "amap":
        return `https://amap.com/maps?center=${longitude},${latitude}&zoom=${zoom}${_p}`;
      default:
        return "";
    }
  };

  const isDark = useThemeQuery() === 'dark';

  return <iframe
    src={getMapUrl()}
    className={cx(styles.mapFrame, className)}
    allowFullScreen
    loading="lazy"
    title="Map Embed"
    style={{
      filter: isDark
        ? 'invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%)'
        : undefined,
    }}
    {...iframeProps}
  />;
};

export default MapEmbed;
