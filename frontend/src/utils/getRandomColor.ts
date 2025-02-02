export const getRandomColor = () => {
  const colors = [
    "#FFD700", // ゴールド
    "#FFB6C1", // ライトピンク
    "#87CEFA", // ライトスカイブルー
    "#98FB98", // パステルグリーン
    "#FFFACD", // レモンシフォン
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};
