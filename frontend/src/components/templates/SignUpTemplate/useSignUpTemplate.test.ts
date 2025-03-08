import { act } from "react";
import { useRouter } from "next/navigation";
import { renderHook } from "@testing-library/react";
import { mockUseRouter } from "jest.setup";

import { useSignUpTemplate } from "./useSignUpTemplate";

describe("useSignUpTemplate, Hooksテスト", () => {
  describe("【関数テスト】handleInputName", () => {
    test("【正常系】nameを更新できること", () => {
      const expectValue = "名前";

      const eventObject = {
        target: {
          value: expectValue,
        },
      } as React.ChangeEvent<HTMLInputElement>;
      const { result } = renderHook(() => useSignUpTemplate());
      expect(result.current.name).toBe("");
      act(() => result.current.handleInputName(eventObject));
      expect(result.current.name).toBe(expectValue);
    });
  });
});
