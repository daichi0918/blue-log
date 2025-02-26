import type { CSSProperties, FC, JSX } from "react";
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
export const InputForm: FC<InputFormProps> = memo((props) => {
  const {
    id,
    type = "text",
    placeholder,
    value,
    onChange,
    additionalStyle,
  } = props;
  return (
    <input
      id={id}
      className={style.input}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={{ ...style, ...additionalStyle }}
    />
  );
});
