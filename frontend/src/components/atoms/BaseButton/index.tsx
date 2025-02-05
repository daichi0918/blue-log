import type { CSSProperties, FC, JSX } from "react";
import { memo } from "react";

import style from "./styles.module.css";

/**
 * Footer
 *
 * @package molecules
 */

type BaseButtonProps = {
  color: "primary" | "secondary";
  size: "small" | "medium";
  text: string;
  additionalStyle?: CSSProperties;
} & JSX.IntrinsicElements["button"];

/**
 * BaseButton
 * @returns {JSX.Element}
 */
export const BaseButton: FC<BaseButtonProps> = memo((props) => {
  const { color, size, text, additionalStyle, onClick } = props;
  return (
    <button
      className={`${style.button} ${style[color]} ${style[size]}`}
      style={{ ...style, ...additionalStyle }}
      onClick={onClick}
    >
      {text}
    </button>
  );
});
