import { act } from "react";
import { renderHook } from "@testing-library/react";
import { mockUseParams } from "jest.setup";

import { useArticleTemplate } from "./useArticleTemplate";

describe("useSignUpTemplate, Hooksテスト", () => {
  beforeEach(() => {
    // useParams のモックデータをテストごとに設定
    mockUseParams.mockReturnValue({ id: "123" });
  });
  describe("【関数テスト】handleInputSearch", () => {
    test("【正常系】inputArticleSearchを更新できること", () => {
      const expectValue = "検索";

      const eventObject = {
        target: {
          value: expectValue,
        },
      } as React.ChangeEvent<HTMLInputElement>;
      const { result } = renderHook(() => useArticleTemplate());
      expect(result.current.inputArticleSearch).toBe("");
      act(() => result.current.handleInputSearch(eventObject));
      expect(result.current.inputArticleSearch).toBe(expectValue);
    });
  });
});
