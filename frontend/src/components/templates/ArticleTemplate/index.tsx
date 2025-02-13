"use client";

import { useCallback, useContext, useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { fetchArticleAPI } from "@/apis/articleApi";
import { Footer } from "@/components/layouts/Footer";
import { Header } from "@/components/layouts/Header";
import { AuthContext } from "@/contexts/AuthContext";
import { type ArticleType } from "@/type/Article";
import { type EventType } from "@/type/Event";

import style from "./styles.module.css";

/**
 * ArticleTemplate
 *
 * @package templates
 */

/**
 * ArticleTemplate
 * @returns {JSX.Element}
 */
export const ArticleTemplate = () => {
  const param = useParams();
  // 認証情報を取得
  const { isAuth, user } = useContext(AuthContext);
  const [inputArticleSearch, setInputArticleSearch] = useState<string>("");
  const [article, setArticle] = useState<ArticleType>();
  const [isOpen, setIsOpen] = useState(false);

  /* action定義 */

  /**
   * キーワード検索Input
   * @param {e}
   */
  const handleInputSearch: EventType["onChangeInput"] = useCallback((e) => {
    setInputArticleSearch(e.target.value);
  }, []);
  /**
   * 記事データ取得
   */
  const fetchArticleById = useCallback(async (): Promise<void> => {
    const res = await fetchArticleAPI(String(param.id));
    console.log("res");
    console.log(res);
    setArticle(
      res?.data && typeof res.data === "object" ? res.data : undefined,
    );
  }, [param]);
  /**
   * 編集・削除トグル制御
   */
  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    void fetchArticleById();
  }, [param, fetchArticleById]);
  return (
    <>
      <Header
        user={user}
        isAuth={isAuth}
        searchInputValue={inputArticleSearch}
        handleInputSearch={handleInputSearch}
      />
      <div className={style.container}>
        <div className={style.actionContainer}>aaa</div>
        <div className={style.contentContainer}>
          <div className={style.titleContainer}>
            <div className={style.titleWrapper}>
              <h1 className={style.title}>{article?.title}</h1>
            </div>
            {article?.isAuthor && (
              <div className={style.meatballMenu}>
                <span className={style.actionDots} onClick={toggleMenu}></span>
                <div className={style.actionMenu}>
                  <ul
                    className={`${style.menuList} ${isOpen ? style.show : ""}`}
                  >
                    <li className={style.menuItem}>
                      <Image
                        src="/edit.svg"
                        alt="edit"
                        width={16}
                        height={16}
                      />
                      <p>編集</p>
                    </li>
                    <li className={style.menuItem}>
                      <Image
                        src="/delete.svg"
                        alt="delete"
                        width={16}
                        height={16}
                      />
                      <p>削除</p>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className={style.sidebarContainer}>ccc</div>
      </div>
      <Footer />
    </>
  );
};
