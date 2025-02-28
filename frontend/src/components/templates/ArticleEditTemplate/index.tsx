"use client";

/**
 * ArticleEditTemplate
 *
 * @package templates
 */
import { useCallback, useContext, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  fetchArticleAPI,
  fetchArticlesByUserId,
  updateArticleApi,
} from "@/apis/articleApi";
import { InputForm } from "@/components/atoms/InputForm";
import { ArticleFormHeader } from "@/components/layouts/ArticleFormHeader";
import { Footer } from "@/components/layouts/Footer";
import { PageContainer } from "@/components/layouts/PageContainer";
import { NAVIGATION_LIST, NAVIGATION_PATH } from "@/constants/navigation";
import { AuthContext } from "@/contexts/AuthContext";
import { type EventType } from "@/type/Event";
import ReactMarkdown from "react-markdown";

import style from "./styles.module.css";

/**
 * ArticleEditTemplate
 * @returns {JSX.Element}
 */
export const ArticleEditTemplate = () => {
  const router = useRouter();
  const param = useParams();
  const { isAuth, user } = useContext(AuthContext);

  /* state定義 */
  const [title, setTitle] = useState<string>("");
  const [tags, setTags] = useState<Array<string>>([]);
  const [tagInput, setTagInput] = useState<string>("");
  const [text, setText] = useState<string>("");

  /* action定義 */
  /**
   * タイトルInput
   * @param {e}
   */
  const handleInputTitle: EventType["onChangeInput"] = useCallback((e) => {
    setTitle(e.target.value);
  }, []);

  /**
   * タグInput
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
   * 本文Input
   * @param {e}
   */
  const handleTextAreaText: EventType["onChangeTextArea"] = useCallback((e) => {
    setText(e.target.value);
  }, []);

  /**
   * 記事データ取得
   */
  const fetchArticleById = useCallback(async (): Promise<void> => {
    const res = await fetchArticleAPI(String(param.id));
    if (res?.data && typeof res.data === "object") {
      if (user?.id !== res?.data?.user.id) {
        router.push(NAVIGATION_LIST.LOGIN);
      } else {
        setTitle(res?.data?.title);
        setText(res?.data?.text);
        setTags(res?.data?.tags);
      }
    }
  }, [param, router, user?.id]);

  /**
   * 記事データ更新
   */
  const handleCreateArticle = useCallback(async () => {
    const res = await updateArticleApi(String(param.id), title, text, tags);
    if (res?.code >= 400) {
      alert(res.message);
      return;
    }
    if (res?.data) {
      router.push(NAVIGATION_PATH.TOP);
    }
  }, [param.id, title, text, router, tags]);

  useEffect(() => {
    // userない時実行すると、不正アクセスになるため
    if (user) void fetchArticleById();
  }, [fetchArticleById, user]);

  return (
    <>
      <ArticleFormHeader onSubmit={handleCreateArticle} />
      <PageContainer>
        <main className={style.main}>
          <form onSubmit={handleCreateArticle}>
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
                  placeholder={
                    tags.length < 5
                      ? "スペース区切りで5つまで作成可能"
                      : "タグは5つまでです"
                  }
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
                    value={text}
                  />
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
