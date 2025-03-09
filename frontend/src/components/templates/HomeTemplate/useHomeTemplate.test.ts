import { act } from "react";
import { useRouter } from "next/navigation";
import { renderHook } from "@testing-library/react";
import { mockUseRouter } from "jest.setup";

import { useHomeTemplate } from "./useHomeTemplate";

describe("useSignUpTemplate, Hooksテスト", () => {
  describe("【関数テスト】handleInputSearch", () => {
    test("【正常系】inputArticleSearchを更新できること", () => {
      const expectValue = "検索";

      const eventObject = {
        target: {
          value: expectValue,
        },
      } as React.ChangeEvent<HTMLInputElement>;
      const { result } = renderHook(() => useHomeTemplate());
      expect(result.current.inputArticleSearch).toBe("");
      act(() => result.current.handleInputSearch(eventObject));
      expect(result.current.inputArticleSearch).toBe(expectValue);
    });
  });
  describe("【関数テスト】handleShowMoreArticles", () => {
    test("【正常系】articleDisplayLengthが+10されること", () => {
      const { result } = renderHook(() => useHomeTemplate());
      const initialLength = result.current.articleDisplayLength;
      act(() => {
        result.current.handleShowMoreArticles();
      });
      expect(result.current.articleDisplayLength).toBe(initialLength + 10);
    });
  });
  describe("【関数テスト】handleSortChange", () => {
    test("【正常系】sortKeyを変更できること", () => {
      const { result } = renderHook(() => useHomeTemplate());
      expect(result.current.sortKey).toBe("newest");
      const eventObject = {
        target: { value: "oldest" },
      } as React.ChangeEvent<HTMLSelectElement>;
      act(() => {
        result.current.handleSortChange(eventObject);
      });
      expect(result.current.sortKey).toBe("oldest");
    });
  });
});
