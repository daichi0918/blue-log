import { act } from "react";
import { renderHook } from "@testing-library/react";

import { useHomeTemplate } from "./useHomeTemplate";

describe("useSignUpTemplate, Hooksテスト", () => {
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
