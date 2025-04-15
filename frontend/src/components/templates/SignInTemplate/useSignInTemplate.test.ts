import { act } from "react";
import { useRouter } from "next/navigation";
import { renderHook } from "@testing-library/react";
import { mockUseRouter } from "jest.setup";

import { useSignInTemplate } from "./useSignInTemplate";

describe("useSignInTemplate, Hooksテスト", () => {
  describe("【関数テスト】handleInputEmail", () => {
    test("【正常系】emailを更新できること", () => {
      const expectValue = "example@test.com";

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
    test("【異常系】nullを入力した場合、emailが更新されないこと", () => {
      const eventObject = {
        target: {
          value: null,
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>;

      const { result } = renderHook(() => useSignInTemplate());
      act(() => result.current.handleInputEmail(eventObject));

      expect(result.current.email).toBe("");
    });
    test("【異常系】undefinedを入力した場合、emailが更新されないこと", () => {
      const eventObject = {
        target: {
          value: undefined,
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>;

      const { result } = renderHook(() => useSignInTemplate());
      act(() => result.current.handleInputEmail(eventObject));

      expect(result.current.email).toBe("");
    });
  });
  describe("【関数テスト】handleInputPassword", () => {
    test("【正常系】passwordを更新できること", () => {
      const expectValue = "test";

      const eventObject = {
        target: {
          value: expectValue,
        },
      } as React.ChangeEvent<HTMLInputElement>;
      const { result } = renderHook(() => useSignInTemplate());
      expect(result.current.password).toBe("");
      act(() => result.current.handleInputPassword(eventObject));
      expect(result.current.password).toBe(expectValue);
    });
    test("【異常系】nullを入力した場合、passwordが更新されないこと", () => {
      const eventObject = {
        target: {
          value: null,
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>;

      const { result } = renderHook(() => useSignInTemplate());
      act(() => result.current.handleInputPassword(eventObject));

      expect(result.current.password).toBe("");
    });
    test("【異常系】undefinedを入力した場合、passwordが更新されないこと", () => {
      const eventObject = {
        target: {
          value: undefined,
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>;

      const { result } = renderHook(() => useSignInTemplate());
      act(() => result.current.handleInputPassword(eventObject));

      expect(result.current.password).toBe("");
    });
  });

  jest.mock("next/navigation");

  describe("【関数テスト】navigateToSignUp", () => {
    test("【正常系】/signup に遷移できること", () => {
      const mockRouter = mockUseRouter();
      const pushMock = jest.fn();

      (useRouter as jest.Mock).mockReturnValue({
        ...mockRouter,
        push: pushMock,
      });

      const { result } = renderHook(() => useSignInTemplate());

      act(() => {
        result.current.navigateToSignUp();
      });

      expect(pushMock).toHaveBeenCalledTimes(1);
      expect(pushMock).toHaveBeenCalledWith("/signup");
    });
  });
});
