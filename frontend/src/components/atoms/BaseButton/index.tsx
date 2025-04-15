import type { CSSProperties, JSX } from "react";
import { memo } from "react";

import style from "./styles.module.css";

/**
 * BaseButton
 *
 * @package atoms
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
export const BaseButton = memo((props: BaseButtonProps) => {
  const {
    color,
    size,
    text,
    additionalStyle,
    onClick,
    type = "button",
  } = props;
  return (
    <button
      className={`${style.button} ${style[color]} ${style[size]}`}
      style={{ ...style, ...additionalStyle }}
      onClick={onClick}
      type={type}
    >
      {text}
    </button>
  );
});
