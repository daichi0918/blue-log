import { useEffect, useState } from "react";

export const useRandomColor = () => {
  const [color, setColor] = useState<string | null>(null);

  useEffect(() => {
    const colors = ["#FFD700", "#FFB6C1", "#87CEFA", "#98FB98", "#FFFACD"];
    setColor(colors[Math.floor(Math.random() * colors.length)] ?? "#000000");
  }, []);

  return color;
};
