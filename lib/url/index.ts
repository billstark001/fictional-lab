import urlJoin from "url-join";

let _p = import.meta.env.VITE_BASE_PATH || '/';
if (!_p.startsWith('/')) {
  _p = '/' + _p;
}
if (!_p.endsWith('/')) {
  _p += '/';
}
export const BASE_PATH = _p;
export const BASE_PATH_NO_TRAILING_SLASH = _p.substring(0, _p.length - 1);


export const matchLink = (currentIn: string, match: string, exact = false) => {
  // sanitize current path
  let current = currentIn || '/';
  if (current.startsWith(BASE_PATH)) {
    current = current.substring(BASE_PATH.length - 1) || '/'; 
  } else if (current === BASE_PATH_NO_TRAILING_SLASH) {
    current = '/';
  }

  match = match || '';
  if (!match.endsWith('/')) {
    match += "/";
  }
  if (match === '/') {
    return exact
      ? current === '/' || !current
      : true;
  }
  return exact
    ? current === match || current + '/' === match
    : current.startsWith(match) || current === match.substring(0, match.length - 1);
};

export const withBaseUrl = (url?: string) => {
  if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
    return url;
  }
  return urlJoin(BASE_PATH, url || '');
};