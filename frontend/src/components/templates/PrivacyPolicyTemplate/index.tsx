"use client";

import { useCallback, useState } from "react";
import { Header } from "@/components/layouts/Header";
import { type EventType } from "@/type/Event";

/**
 * PrivacyPolicyTemplate
 *
 * @package templates
 */
import style from "./styles.module.css";

/**
 * PrivacyPolicyTemplate
 * @returns {JSX.Element}
 */
export const PrivacyPolicyTemplate = () => {
  /* state定義 */
  const [inputArticleSearch, setInputArticleSearch] = useState<string>("");
  /* action定義 */
  /**
   * キーワード検索Input
   * @param {e}
   */
  const handleInputSearch: EventType["onChangeInput"] = useCallback((e) => {
    setInputArticleSearch(e.target.value);
  }, []);

  return (
    <Header
      searchInputValue={inputArticleSearch}
      handleInputSearch={handleInputSearch}
    />
  );
};
