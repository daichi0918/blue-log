export const formatDate = (isoString: string): string => {
  const date = new Date(isoString);
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
};
