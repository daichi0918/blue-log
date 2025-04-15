export const formatDate = (isoString: string): string => {
  const date = new Date(isoString);
  return `${date.getUTCFullYear()}年${date.getUTCMonth() + 1}月${date.getUTCDate()}日`;
};
