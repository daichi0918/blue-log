/**
 * useArticleTemplate
 *
 * @package templates
 */
import { useCallback, useContext, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  addLikeApi,
  deleteLikeApi,
  fetchArticleAPI,
  saveBookmarkApi,
  unsaveBookmarkApi,
} from "@/apis/articleApi";
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
  const [isLiked, setIsLiked] = useState(false);
  const [likeCounter, setLikeCounter] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);

  /* action定義 */
  const toggleLike = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      // TODO: 記事一覧画面では、いいね!ボタン押下した後に記事詳細ページに遷移するからそこの制御の実装
      if (!isAuth) {
        setShowModal(true);
      } else {
        setIsLiked((prev) => !prev);
        setLikeCounter((prev) => (isLiked ? prev - 1 : prev + 1));
        if (isLiked) {
          void deleteLikeApi(String(param.id ?? article?.id));
        } else {
          void addLikeApi(String(param.id ?? article?.id));
        }
      }
    },
    [isAuth, param.id, isLiked, article?.id],
  );

  const toggleBookmark = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      // TODO: 記事一覧画面では、いいね!ボタン押下した後に記事詳細ページに遷移するからそこの制御の実装
      if (!isAuth) {
        setShowModal(true);
      } else {
        setIsBookmarked((prev) => !prev);
        if (isBookmarked) {
          void unsaveBookmarkApi(String(param.id ?? article?.id));
        } else {
          void saveBookmarkApi(String(param.id ?? article?.id));
        }
      }
    },
    [isAuth, param.id, isBookmarked, article?.id],
  );
  useEffect(() => {
    if (article) {
      setIsLiked(article.isLiked);
      setIsBookmarked(article.isBookmarked);
      setLikeCounter(article.likeCount);
    }
  }, [article]);
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

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      const threeDots = document.getElementById("threeDots");
      const userIcon = document.getElementById("userIcon");
      if (
        isOpen &&
        threeDots &&
        userIcon && // メニューが存在しているか
        event.target instanceof Node && // 型チェック
        !threeDots.contains(event.target) && // メニュー外をクリックした場合
        !userIcon.contains(event.target)
      ) {
        setIsOpen(false);
      }
    },
    [isOpen],
  );

  useEffect(() => {
    // イベントリスナー追加
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // クリーンアップ
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

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
      setIsFollowing(res?.code === 200 && false);
    } catch (error) {
      console.error("フォロー処理に失敗しました:", error);
    }
  }, [param.id]);

  useEffect(() => {
    void fetchArticleById();
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
    isLiked,
    isBookmarked,
    likeCounter,
    toggleLike,
    toggleBookmark,
  };
};
