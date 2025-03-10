import { act } from "react";
import { type ArticleCardType } from "@/type/ArticleCard";
import { renderHook } from "@testing-library/react";

import { useAccountTemplate } from "./useAccountTemplate";

describe("useAccountTemplate, Hooksテスト", () => {
  describe("【関数テスト】handleInputSearch", () => {
    test("【正常系】inputArticleSearchが更新されること", () => {
      const expectValue = "検索キーワード";
      const eventObject = {
        target: {
          value: expectValue,
        },
      } as React.ChangeEvent<HTMLInputElement>;

      const { result } = renderHook(() => useAccountTemplate());

      expect(result.current.inputArticleSearch).toBe(""); // 初期状態

      // handleInputSearchを呼び出す
      act(() => result.current.handleInputSearch(eventObject));

      // 入力値が更新されていることを確認
      expect(result.current.inputArticleSearch).toBe(expectValue);
    });
  });

  describe("【関数テスト】handleLoadMore", () => {
    test("【正常系】displayCountが更新されること", () => {
      const { result } = renderHook(() => useAccountTemplate());

      expect(result.current.displayCount).toBe(5); // 初期状態

      // handleLoadMoreを呼び出す
      act(() => result.current.handleLoadMore());

      // displayCountが+10されていることを確認
      expect(result.current.displayCount).toBe(15);

      // 再度呼び出す
      act(() => result.current.handleLoadMore());

      // displayCountがさらに+10されていることを確認
      expect(result.current.displayCount).toBe(25);
    });
  });

  describe("【関数テスト】handleSortChange", () => {
    test("【正常系】sortKeyが更新されること", () => {
      const { result } = renderHook(() => useAccountTemplate());

      expect(result.current.sortKey).toBe("newest"); // 初期状態

      const eventObject = {
        target: {
          value: "oldest",
        },
      } as React.ChangeEvent<HTMLSelectElement>;

      // handleSortChangeを呼び出す
      act(() => result.current.handleSortChange(eventObject));

      // sortKeyが"oldest"に更新されていることを確認
      expect(result.current.sortKey).toBe("oldest");
    });
  });
});
