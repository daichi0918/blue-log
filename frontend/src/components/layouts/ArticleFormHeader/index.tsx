"use client";

/**
 * ArticleFormHeader
 *
 * @package layouts
 */
import { memo } from "react";
import { BaseButton } from "@/components/atoms/BaseButton";

import { HeaderArea } from "../HeaderArea";
import style from "./styles.module.css";

type ArticleFormHeaderProps = {
  onSubmit: () => Promise<void>;
};

/**
 * ArticleFormHeader
 * @returns {JSX.Element}
 */
export const ArticleFormHeader = memo((props: ArticleFormHeaderProps) => {
  const { onSubmit } = props;
  return (
    <HeaderArea>
      <div className={style.buttonWrapper}>
        <BaseButton
          color={"primary"}
          size={"medium"}
          text={"投稿"}
          onClick={onSubmit}
        />
      </div>
    </HeaderArea>
  );
});
