"use client";

/**
 * AccountNewTemplate
 *
 * @package templates
 */
import { useCallback, useContext, useState } from "react";
import { Footer } from "@/components/layouts/Footer";
import { Header } from "@/components/layouts/Header";
import { PageContainer } from "@/components/layouts/PageContainer";
import { AuthContext } from "@/contexts/AuthContext";
import { type EventType } from "@/type/Event";

/**
 * AccountNewTemplate
 * @returns {JSX.Element}
 */
export const AccountNewTemplate = () => {
  // 認証情報を取得
  const { isAuth, user } = useContext(AuthContext);

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
    <>
      {/* TODO: このページ専用のヘッダーを作成(featured-shared-design使用の際) */}
      <Header
        user={user}
        isAuth={isAuth}
        searchInputValue={inputArticleSearch}
        handleInputSearch={handleInputSearch}
      />
      <PageContainer>
        <main></main>
      </PageContainer>
      <Footer />
    </>
  );
};
