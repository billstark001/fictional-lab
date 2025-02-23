export const getDescription = (t: string, descLength = 320) => {
  return (t.length > descLength
    ? t.substring(0, descLength) + '……'
    : t).replace(/[\n\r\s]+/g, ' ');
};

export default getDescription;