/**
 * useArticleEditTemplate
 *
 * @package templates
 */
import { useCallback, useContext, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchArticleAPI, updateArticleApi } from "@/apis/articleApi";
import { NAVIGATION_LIST, NAVIGATION_PATH } from "@/constants/navigation";
import { AuthContext } from "@/contexts/AuthContext";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import { type EventType } from "@/type/Event";

/**
 * useArticleEditTemplate
 */
export const useArticleEditTemplate = () => {
  // 認証リダイレクトを実行
  useAuthRedirect();

  const router = useRouter();
  const param = useParams();
  const { user } = useContext(AuthContext);

  /* state定義 */
  const [title, setTitle] = useState<string>("");
  const [tags, setTags] = useState<Array<string>>([]);
  const [tagInput, setTagInput] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
    setIsLoading(true);
    try {
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
    } finally {
      setIsLoading(false);
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

  return {
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
  };
};
