export const getRandomColor = (): string => {
  const colors = ['#FFD700', '#FFB6C1', '#87CEFA', '#98FB98', '#FFFACD'];
  return colors[Math.floor(Math.random() * colors.length)];
};
