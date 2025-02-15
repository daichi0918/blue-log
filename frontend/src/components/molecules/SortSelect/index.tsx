"use client";

import type { FC } from "react";
import { memo } from "react";
import { BookmarkIcon } from "@/components/atoms/BookmarkIcon";
import { LikeIcon } from "@/components/atoms/LikeIcon";

import style from "./styles.module.css";

/**
 * SortSelect
 *
 * @package molecules
 */

type SortOption = {
  value: string;
  label: string;
};
type SortSelectProps = {
  // value: string;
  // onChange: (value: string) => void;
  options?: SortOption[];
};

const defaultOptions: SortOption[] = [
  { value: "newest", label: "新しい順" },
  { value: "oldest", label: "古い順" },
  { value: "likes", label: "いいね順" },
];
/**
 * SortSelect
 * @returns {JSX.Element}
 */
export const SortSelect = memo((props: SortSelectProps) => {
  const { options = defaultOptions } = props;
  return (
    <>
      <div className={style.sortTitleWrapper}>
        <p className={style.sortTitle}>並び順</p>
      </div>
      <div className={style.selectWrapper}>
        <select className={style.select}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </>
  );
});
