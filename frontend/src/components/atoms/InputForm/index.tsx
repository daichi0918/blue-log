import type { CSSProperties, JSX } from "react";
import { memo } from "react";

import style from "./styles.module.css";

/**
 * InputForm
 *
 * @package atoms
 */

type InputFormProps = {
  additionalStyle?: CSSProperties;
} & JSX.IntrinsicElements["input"];

/**
 * InputForm
 * @returns {JSX.Element}
 */
export const InputForm = memo((props: InputFormProps) => {
  const {
    id,
    type = "text",
    placeholder,
    value,
    onChange,
    onKeyDown,
    additionalStyle,
    disabled,
  } = props;
  return (
    <input
      id={id}
      className={style.input}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      style={{ ...style, ...additionalStyle }}
      disabled={disabled}
    />
  );
});
