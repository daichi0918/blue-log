import { act } from "react";
import { useRouter } from "next/navigation";
import { renderHook } from "@testing-library/react";
import { mockUseRouter } from "jest.setup";

import { useProfileSettingsTemplate } from "./useProfileSettingsTemplate";

describe("useSignUpTemplate, Hooksテスト", () => {
  describe("【関数テスト】handleInputSearch", () => {
    test("【正常系】inputArticleSearchを更新できること", () => {
      const expectValue = "検索";

      const eventObject = {
        target: {
          value: expectValue,
        },
      } as React.ChangeEvent<HTMLInputElement>;
      const { result } = renderHook(() => useProfileSettingsTemplate());
      expect(result.current.inputArticleSearch).toBe("");
      act(() => result.current.handleInputSearch(eventObject));
      expect(result.current.inputArticleSearch).toBe(expectValue);
    });
  });
  describe("【関数テスト】handleInputName", () => {
    test("【正常系】nameを更新できること", () => {
      const expectValue = "名前";

      const eventObject = {
        target: {
          value: expectValue,
        },
      } as React.ChangeEvent<HTMLInputElement>;
      const { result } = renderHook(() => useProfileSettingsTemplate());
      expect(result.current.userName).toBe("");
      act(() => result.current.handleInputUserName(eventObject));
      expect(result.current.userName).toBe(expectValue);
    });
  });
});
