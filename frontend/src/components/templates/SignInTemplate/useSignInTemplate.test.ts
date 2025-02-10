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
  test("【異常系】nullを入力した場合、emailが更新されないこと", () => {
    const eventObject = {
      target: {
        value: null,
      },
    } as unknown as React.ChangeEvent<HTMLInputElement>;

    const { result } = renderHook(() => useSignInTemplate());
    act(() => result.current.handleInputEmail(eventObject));

    expect(result.current.email).toBe(""); // 更新されないことを確認
  });
});
