export const triggerDownload = (href: string, filename='file') => {
  const anchor = document.createElement("a");
  anchor.href = href;
  anchor.download = filename;
  anchor.click();
};

export default triggerDownload;