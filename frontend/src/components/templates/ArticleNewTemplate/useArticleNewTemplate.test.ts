import { act } from "react";
import { renderHook } from "@testing-library/react";

import { useArticleNewTemplate } from "./useArticleNewTemplate";

describe("useArticleNewTemplate, Hooksテスト", () => {
  describe("【関数テスト】handleInputTitle", () => {
    test("【正常系】titleを更新できること", () => {
      const expectValue = "タイトル";

      const eventObject = {
        target: {
          value: expectValue,
        },
      } as React.ChangeEvent<HTMLInputElement>;

      const { result } = renderHook(() => useArticleNewTemplate());
      expect(result.current.title).toBe("");

      act(() => result.current.handleInputTitle(eventObject));
      expect(result.current.title).toBe(expectValue);
    });
  });

  describe("【関数テスト】handleInputTags", () => {
    test("【正常系】タグ入力中の値が更新されること", () => {
      const { result } = renderHook(() => useArticleNewTemplate());

      const eventObject = {
        target: {
          value: "React",
        },
      } as React.ChangeEvent<HTMLInputElement>;

      expect(result.current.tagInput).toBe("");

      act(() => result.current.handleInputTags(eventObject));
      expect(result.current.tagInput).toBe("React");
    });

    test("【正常系】スペースを入力するとタグが追加され、入力欄がリセットされること", () => {
      const { result } = renderHook(() => useArticleNewTemplate());

      const eventObject = {
        target: {
          value: "React ",
        },
      } as React.ChangeEvent<HTMLInputElement>;

      expect(result.current.tags).toEqual([]);
      expect(result.current.tagInput).toBe("");

      act(() => result.current.handleInputTags(eventObject));

      expect(result.current.tags).toEqual(["React"]);
      expect(result.current.tagInput).toBe("");
    });

    test("【正常系】重複したタグは追加されないこと", () => {
      const { result } = renderHook(() => useArticleNewTemplate());

      const firstEvent = {
        target: {
          value: "React ",
        },
      } as React.ChangeEvent<HTMLInputElement>;

      act(() => result.current.handleInputTags(firstEvent));
      expect(result.current.tags).toEqual(["React"]);

      const secondEvent = {
        target: {
          value: "React ",
        },
      } as React.ChangeEvent<HTMLInputElement>;

      act(() => result.current.handleInputTags(secondEvent));

      expect(result.current.tags).toEqual(["React"]);
    });
  });

  describe("【関数テスト】handleRemoveTag", () => {
    test("【正常系】タグを削除できること", () => {
      const { result } = renderHook(() => useArticleNewTemplate());

      // タグを追加
      const firstEvent = {
        target: {
          value: "React ",
        },
      } as React.ChangeEvent<HTMLInputElement>;
      act(() => result.current.handleInputTags(firstEvent));

      const secondEvent = {
        target: {
          value: "JavaScript ",
        },
      } as React.ChangeEvent<HTMLInputElement>;
      act(() => result.current.handleInputTags(secondEvent));

      expect(result.current.tags).toEqual(["React", "JavaScript"]);

      // タグを削除
      act(() => result.current.handleRemoveTag("React"));
      expect(result.current.tags).toEqual(["JavaScript"]);

      // 存在しないタグを削除しても状態が変わらないことを確認
      act(() => result.current.handleRemoveTag("React"));
      expect(result.current.tags).toEqual(["JavaScript"]); // 変わらない
    });
  });

  describe("【関数テスト】handleTextAreaText", () => {
    test("【正常系】textエリアの値が更新されること", () => {
      const { result } = renderHook(() => useArticleNewTemplate());

      const eventObject = {
        target: {
          value: "新しい記事の内容",
        },
      } as React.ChangeEvent<HTMLTextAreaElement>;

      expect(result.current.text).toBe(""); // 初期状態の確認

      // テキストエリアの値を更新
      act(() => result.current.handleTextAreaText(eventObject));

      // 状態が更新されていることを確認
      expect(result.current.text).toBe("新しい記事の内容");
    });
  });
});
