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
  const [title, setTitle] = useState<string>("");
  const [tags, setTags] = useState<Array<string>>([]);
  const [tagInput, setTagInput] = useState<string>("");
  const [text, setText] = useState<string>("");

  /* action定義 */
  /**
   * キーワード検索Input
   * @param {e}
   */
  const handleInputSearch: EventType["onChangeInput"] = useCallback((e) => {
    setInputArticleSearch(e.target.value);
  }, []);

  /**
   * タイトル
   * @param {e}
   */
  const handleInputTitle: EventType["onChangeInput"] = useCallback((e) => {
    setTitle(e.target.value);
  }, []);

  /**
   * タグ
   * @param {e}
   */
  const handleInputTags: EventType["onChangeInput"] = useCallback(
    (e) => {
      const value = e.target.value;

      // スペースが入力されたら確定
      if (value.includes(" ")) {
        const newTag = value.trim(); // 前後の空白を削除
        if (newTag && !tags.includes(newTag)) {
          setTags((prev) => [...prev, newTag]); // タグを追加
        }
        setTagInput(""); // 入力欄をリセット
      } else {
        setTagInput(value); // 入力状態を更新
      }
    },
    [tags],
  );

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  /**
   * 本文
   * @param {e}
   */
  const handleTextAreaText: EventType["onChangeTextArea"] = useCallback((e) => {
    setText(e.target.value);
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
          <form>
            <section className={style.section}>
              <label className={style.label} htmlFor={"title"}>
                タイトル
              </label>
              <InputForm
                id={"title"}
                value={title}
                onChange={handleInputTitle}
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
              <div className={style.tagsContainer}>
                <div className={style.tagWrapper}>
                  {tags.map((tag, index) => (
                    <span key={index} className={style.tag}>
                      <p>#{tag}</p>
                      <button
                        type="button"
                        className={style.tagRemoveButton}
                        onClick={() => handleRemoveTag(tag)}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>

                <InputForm
                  id={"tag"}
                  value={tagInput}
                  placeholder={"スペース区切りで5つまで作成可能"}
                  onChange={handleInputTags}
                  additionalStyle={{
                    height: "40px",
                    width: "100%",
                  }}
                  disabled={tags.length >= 5}
                />
              </div>
            </section>
            <section className={style.section}>
              <label className={style.label} htmlFor={"text"}>
                本文
              </label>
              <section className={style.textWrapper}>
                <div className={style.basicTextWrapper}>
                  <p>Markdown形式で入力</p>
                  <textarea
                    className={style.textarea}
                    onChange={handleTextAreaText}
                  >
                    {text}
                  </textarea>
                </div>
                <div className={style.previewTextWrapper}>
                  <p>プレビュー</p>
                  <ReactMarkdown className={style.markdown}>
                    {text}
                  </ReactMarkdown>
                </div>
              </section>
            </section>
          </form>
        </main>
      </PageContainer>
      <Footer />
    </>
  );
};
