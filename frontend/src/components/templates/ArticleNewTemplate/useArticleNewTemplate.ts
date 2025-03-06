/**
 * useArticleNewTemplate
 *
 * @package templates
 */
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { createArticleApi } from "@/apis/articleApi";
import { NAVIGATION_PATH } from "@/constants/navigation";
import { type EventType } from "@/type/Event";

/**
 * useArticleNewTemplate
 */
export const useArticleNewTemplate = () => {
  const router = useRouter();
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
   * 投稿機能実装
   */
  const handleCreateArticle = useCallback(async () => {
    const res = await createArticleApi(title, text, tags);
    if (res?.code >= 400) {
      alert(res.message);
      return;
    }
    if (res?.data) {
      router.push(NAVIGATION_PATH.TOP);
    }
  }, [title, text, router, tags]);

  return {
    title,
    tags,
    tagInput,
    text,
    handleInputTitle,
    handleInputTags,
    handleRemoveTag,
    handleTextAreaText,
    handleCreateArticle,
  };
};
