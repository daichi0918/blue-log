"use client";

/**
 * ArticleEditTemplate
 *
 * @package templates
 */
import { InputForm } from "@/components/atoms/InputForm";
import { LoadingEffect } from "@/components/atoms/LoadingEffect";
import { ArticleFormHeader } from "@/components/layouts/ArticleFormHeader";
import { Footer } from "@/components/layouts/Footer";
import { PageContainer } from "@/components/layouts/PageContainer";
import ReactMarkdown from "react-markdown";

import style from "./styles.module.css";
import { useArticleEditTemplate } from "./useArticleEditTemplate";

/**
 * ArticleEditTemplate
 * @returns {JSX.Element}
 */
export const ArticleEditTemplate = () => {
  const {
    title,
    tags,
    tagInput,
    text,
    isLoading,
    handleInputTitle,
    handleInputTags,
    handleRemoveTag,
    handleTextAreaText,
    handleCreateArticle,
  } = useArticleEditTemplate();

  return (
    <>
      <ArticleFormHeader onSubmit={handleCreateArticle} />
      <PageContainer>
        {isLoading ? (
          <LoadingEffect />
        ) : (
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
        )}
      </PageContainer>
      <Footer />
    </>
  );
};
