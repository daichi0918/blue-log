/**
 * useArticleTemplate
 *
 * @package templates
 */
import { useCallback, useContext, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchArticleAPI } from "@/apis/articleApi";
import { followUserApi, unfollowUserApi } from "@/apis/authApi";
import { AuthContext } from "@/contexts/AuthContext";
import { type ArticleType } from "@/type/Article";

/**
 * useArticleTemplate
 */
export const useArticleTemplate = () => {
  const param = useParams();
  const router = useRouter();
  // 認証情報を取得
  const { isAuth, user } = useContext(AuthContext);
  /* state */
  const [showModal, setShowModal] = useState(false);
  const [article, setArticle] = useState<ArticleType>();
  const [isOpen, setIsOpen] = useState(false);
  const [isFollowing, setIsFollowing] = useState(
    article?.user.followers?.includes(user?.id ?? -1),
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  /* action定義 */
  /**
   * 記事データ取得
   */
  const fetchArticleById = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    try {
      const res = await fetchArticleAPI(String(param.id));
      setArticle(
        res?.data && typeof res.data === "object" ? res.data : undefined,
      );
    } finally {
      setIsLoading(false);
    }
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
  /**
   * プロフィール画面への遷移
   */
  const navigateToProfile = useCallback(() => {
    void router.push(`/user/${user?.id}/settings`);
  }, [router, user]);
  /**
   * 編集画面への遷移
   */
  const navigateToArticleEdit = useCallback(() => {
    void router.push(`/article/${String(param.id)}/edit`);
  }, [router, param]);

  /**
   * ユーザーフォロー関数
   */
  /** フォロー処理 */
  const followUser = useCallback(async (): Promise<void> => {
    try {
      const res = await followUserApi(String(param.id));
      // console.log(res?.code);
      setIsFollowing(res?.code === 201 && true);
    } catch (error) {
      console.error("フォロー処理に失敗しました:", error);
    }
  }, [param.id]);

  /**
   * ユーザーアンフォロー関数
   */
  /** フォロー処理 */
  const unfollowUser = useCallback(async (): Promise<void> => {
    try {
      const res = await unfollowUserApi(String(param.id));
      // console.log(res?.code);
      setIsFollowing(res?.code === 200 && false);
    } catch (error) {
      console.error("フォロー処理に失敗しました:", error);
    }
  }, [param.id]);

  useEffect(() => {
    void fetchArticleById();
    // if (article) {
    //   setIsLiked(article.isLiked);
    //   setIsBookmarked(article.isBookmarked);
    //   setLikeCounter(article.likeCount);
    // }
  }, [fetchArticleById]);

  return {
    isAuth,
    user,
    showModal,
    article,
    isOpen,
    isFollowing,
    isLoading,
    setShowModal,
    toggleMenu,
    navigateToX,
    navigateToGithub,
    navigateToFacebook,
    navigateToProfile,
    followUser,
    unfollowUser,
    navigateToArticleEdit,
  };
};
