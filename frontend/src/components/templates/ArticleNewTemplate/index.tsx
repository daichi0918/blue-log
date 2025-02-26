"use client";

/**
 * AccountNewTemplate
 *
 * @package templates
 */
import { useCallback, useContext, useState } from "react";
import { InputForm } from "@/components/atoms/InputForm";
import { Footer } from "@/components/layouts/Footer";
import { Header } from "@/components/layouts/Header";
import { PageContainer } from "@/components/layouts/PageContainer";
import { AuthContext } from "@/contexts/AuthContext";
import { type EventType } from "@/type/Event";
import ReactMarkdown from "react-markdown";

import style from "./styles.module.css";

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
        <main className={style.main}>
          <section className={style.section}>
            <label className={style.label} htmlFor={"title"}>
              タイトル
            </label>
            <InputForm
              id={"title"}
              additionalStyle={{
                height: "40px",
                fontSize: "2rem",
                fontWeight: "bold",
              }}
            />
          </section>
          <section className={style.section}>
            <label className={style.label} htmlFor={"tag"}>
              タグ
            </label>
            <InputForm
              id={"tag"}
              additionalStyle={{
                height: "40px",
              }}
            />
          </section>
          <section className={style.section}>
            <label className={style.label} htmlFor={"text"}>
              本文
            </label>
            <section className={style.textWrapper}>
              <div className={style.basicTextWrapper}>
                <p>Markdown形式で入力</p>
                <textarea className={style.textarea}></textarea>
              </div>
              <div className={style.previewTextWrapper}>
                <p>プレビュー</p>
                <ReactMarkdown className={style.reactMarkdown}></ReactMarkdown>
              </div>
            </section>
          </section>
        </main>
      </PageContainer>
      <Footer />
    </>
  );
};
