import { act } from "react";
import { renderHook } from "@testing-library/react";

import { useSignInTemplate } from "./useSignInTemplate";

describe("useSignInTemplate, Hooksテスト", () => {
  describe("【関数テスト】handleInputEmail", () => {
    test("【正常系】emailを更新できること", () => {
      const expectValue = "テスト";

      const eventObject = {
        target: {
          value: expectValue,
        },
      } as React.ChangeEvent<HTMLInputElement>;
      const { result } = renderHook(() => useSignInTemplate());
      expect(result.current.email).toBe("");
      act(() => result.current.handleInputEmail(eventObject));
      expect(result.current.email).toBe(expectValue);
    });
  });
});
