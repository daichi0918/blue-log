/**
 * useArticleTemplate
 *
 * @package templates
 */
import { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchArticleAPI } from "@/apis/articleApi";
import { AuthContext } from "@/contexts/AuthContext";
import { type ArticleType } from "@/type/Article";
import { type EventType } from "@/type/Event";

/**
 * useArticleTemplate
 */
export const useArticleTemplate = () => {
  const param = useParams();
  // 認証情報を取得
  const { isAuth, user } = useContext(AuthContext);
  /* state */
  const [isLiked, setIsLiked] = useState(false);
  const [likeCounter, setLikeCounter] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showModal, setShowModal] = useState(false);
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
  /**
   * Xへ遷移
   */
  const navigateToX = (url: string | null) => {
    window.open(url ?? "https://twitter.com", "_blank");
  };
  /**
   * GitHubへ遷移
   */
  const navigateToGithub = (url: string | null) => {
    window.open(url ?? "https://github.com", "_blank");
  };
  /**
   * Facebookへ遷移
   */
  const navigateToFacebook = (url: string | null) => {
    window.open(url ?? "https://facebook.com", "_blank");
  };

  useEffect(() => {
    void fetchArticleById();
    if (article) {
      setIsLiked(article.isLiked);
      setIsBookmarked(article.isBookmarked);
      setLikeCounter(article.likeCount);
    }
  }, [article, fetchArticleById]);

  return {
    isAuth,
    user,
    isLiked,
    likeCounter,
    isBookmarked,
    showModal,
    inputArticleSearch,
    article,
    isOpen,
    setShowModal,
    handleInputSearch,
    toggleMenu,
    navigateToX,
    navigateToGithub,
    navigateToFacebook,
  };
};
