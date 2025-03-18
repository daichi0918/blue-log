/**
 * useAccountTemplate
 *
 * @package templates
 */
import { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  fetchArticlesByUserId,
  fetchBookmarkedArticlesByUserIdAPI,
  fetchLikedArticlesByUserIdAPI,
} from "@/apis/articleApi";
import { fetchUserById } from "@/apis/authApi";
import { AuthContext } from "@/contexts/AuthContext";
import { type ArticleCardType } from "@/type/ArticleCard";
import { type UserType } from "@/type/User";
import { sortArticles } from "@/utils/sortArticles";

/**
 * useAccountTemplate
 */
export const useAccountTemplate = () => {
  const param = useParams();
  const MENU_ITEMS = ["投稿した記事", "いいねした記事", "保存した記事"];

  const { isAuth, user } = useContext(AuthContext);
  /* state定義 */
  const [displayArticles, setDisplayArticles] = useState<
    Array<ArticleCardType>
  >([]);
  const [postedArticles, setPostedArticles] = useState<Array<ArticleCardType>>(
    [],
  );
  const [likedArticles, setLikedArticles] = useState<Array<ArticleCardType>>(
    [],
  );
  const [savedArticles, setSavedArticles] = useState<Array<ArticleCardType>>(
    [],
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [displayCount, setDisplayCount] = useState<number>(5);
  const [sortKey, setSortKey] = useState<string>("newest");
  const [currentUser, setCurrentUser] = useState<UserType | undefined>(
    undefined,
  );

  /* action定義 */
  /**
   * もっと見るボタン押下時の処理
   */
  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + 10);
  };
  /**
   * 記事並べ替え関数
   */
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortKey(e.target.value);
  };

  /**
   * 特定のユーザーが投稿した記事を取得・反映
   */
  const fetchUserPostedArticles = useCallback(async (): Promise<void> => {
    if (postedArticles.length === 0) {
      const res = await fetchArticlesByUserId(String(param.id));
      const data = res?.data && typeof res.data === "object" ? res.data : [];
      setPostedArticles(data);
      setDisplayArticles(sortArticles(data, sortKey));
    } else {
      setDisplayArticles(sortArticles(postedArticles, sortKey));
    }
  }, [param.id, postedArticles, sortKey]);
  /**
   * 特定のユーザーがいいねした記事を取得・反映
   */
  const fetchUserLikedArticles = useCallback(async (): Promise<void> => {
    if (likedArticles.length === 0) {
      const res = await fetchLikedArticlesByUserIdAPI(String(param.id));
      const data = res?.data && typeof res.data === "object" ? res.data : [];
      setLikedArticles(data);
      setDisplayArticles(sortArticles(data, sortKey));
    } else {
      setDisplayArticles(sortArticles(likedArticles, sortKey));
    }
  }, [param.id, likedArticles, sortKey]);

  /**
   * 特定のユーザー取得
   */
  const fetchUser = useCallback(async (): Promise<void> => {
    const res = await fetchUserById(String(param.id));
    setCurrentUser(
      res?.data && typeof res.data === "object" ? res.data : undefined,
    );
  }, [param]);

  /**
   * 特定のユーザーが保存した記事を取得・反映
   */
  const fetchUserSavedArticles = useCallback(async (): Promise<void> => {
    if (savedArticles.length === 0) {
      const res = await fetchBookmarkedArticlesByUserIdAPI(String(param.id));
      const data = res?.data && typeof res.data === "object" ? res.data : [];
      setSavedArticles(data);
      setDisplayArticles(sortArticles(data, sortKey));
    } else {
      setDisplayArticles(sortArticles(savedArticles, sortKey));
    }
  }, [param.id, savedArticles, sortKey]);

  useEffect(() => {
    // ユーザー取得
    void fetchUser();
    // 記事一覧取得
    switch (selectedIndex) {
      case 0:
        void fetchUserPostedArticles();
        break;
      case 1:
        void fetchUserLikedArticles();
        break;
      case 2:
        void fetchUserSavedArticles();
        break;
    }
  }, [
    selectedIndex,
    fetchUserPostedArticles,
    fetchUserLikedArticles,
    fetchUserSavedArticles,
    fetchUser,
    sortKey,
    param.id,
  ]);

  return {
    MENU_ITEMS,
    isAuth,
    user,
    displayArticles,
    postedArticles,
    likedArticles,
    savedArticles,
    selectedIndex,
    displayCount,
    sortKey,
    currentUser,
    setSelectedIndex,
    handleLoadMore,
    handleSortChange,
    sortArticles,
    fetchUserPostedArticles,
    fetchUserLikedArticles,
    fetchUser,
    fetchUserSavedArticles,
  };
};
