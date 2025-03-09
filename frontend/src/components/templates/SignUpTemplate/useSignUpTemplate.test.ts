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
  describe("【関数テスト】handleInputEmail", () => {
    test("【正常系】emailを更新できること", () => {
      const expectValue = "example@test.com";

      const eventObject = {
        target: {
          value: expectValue,
        },
      } as React.ChangeEvent<HTMLInputElement>;
      const { result } = renderHook(() => useSignUpTemplate());
      expect(result.current.email).toBe("");
      act(() => result.current.handleInputEmail(eventObject));
      expect(result.current.email).toBe(expectValue);
    });
  });
  describe("【関数テスト】handleInputPassword", () => {
    test("【正常系】passwordを更新できること", () => {
      const expectValue = "password";

      const eventObject = {
        target: {
          value: expectValue,
        },
      } as React.ChangeEvent<HTMLInputElement>;
      const { result } = renderHook(() => useSignUpTemplate());
      expect(result.current.password).toBe("");
      act(() => result.current.handleInputPassword(eventObject));
      expect(result.current.password).toBe(expectValue);
    });
  });
  describe("【関数テスト】togglePasswordVisibility", () => {
    test("【正常系】パスワードの表示状態を切り替えられること", () => {
      const { result } = renderHook(() => useSignUpTemplate());

      // 初期状態を確認
      expect(result.current.isPasswordVisible).toBe(false);

      // 関数を実行し、状態が true に変わることを確認
      act(() => result.current.togglePasswordVisibility());
      expect(result.current.isPasswordVisible).toBe(true);

      // もう一度実行し、false に戻ることを確認
      act(() => result.current.togglePasswordVisibility());
      expect(result.current.isPasswordVisible).toBe(false);
    });
  });

  jest.mock("next/navigation");

  describe("【関数テスト】navigateToSignIn", () => {
    test("【正常系】/signin に遷移できること", () => {
      const mockRouter = mockUseRouter();
      const pushMock = jest.fn();

      (useRouter as jest.Mock).mockReturnValue({
        ...mockRouter,
        push: pushMock,
      });

      const { result } = renderHook(() => useSignUpTemplate());

      act(() => {
        result.current.navigateToSignIn();
      });

      expect(pushMock).toHaveBeenCalledTimes(1);
      expect(pushMock).toHaveBeenCalledWith("/signin");
    });
  });
});
