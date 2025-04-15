import { act } from "react";
import { renderHook } from "@testing-library/react";
import { mockUseParams } from "jest.setup";

import { useArticleTemplate } from "./useArticleTemplate";

describe("useSignUpTemplate, Hooksテスト", () => {
  beforeEach(() => {
    // useParams のモックデータをテストごとに設定
    mockUseParams.mockReturnValue({ id: "123" });
  });

  describe("【関数テスト】toggleMenu", () => {
    test("【正常系】toggleMenuでisOpenの状態が切り替わる", () => {
      const { result } = renderHook(() => useArticleTemplate());
      expect(result.current.isOpen).toBe(false);
      act(() => {
        result.current.toggleMenu();
      });
      expect(result.current.isOpen).toBe(true);
      act(() => {
        result.current.toggleMenu();
      });
      expect(result.current.isOpen).toBe(false);
    });
  });
  describe("【関数テスト】navigateToX, navigateToGithub, navigateToFacebook", () => {
    let windowOpenSpy: jest.SpyInstance;

    beforeEach(() => {
      windowOpenSpy = jest.spyOn(window, "open").mockImplementation();
    });

    afterEach(() => {
      windowOpenSpy.mockRestore();
    });

    test("【正常系】navigateToX で指定URLが開かれる", () => {
      const { result } = renderHook(() => useArticleTemplate());
      act(() => {
        result.current.navigateToX("https://example.com");
      });
      expect(windowOpenSpy).toHaveBeenCalledWith(
        "https://example.com",
        "_blank",
      );
    });

    test("【正常系】navigateToX で URL が null の場合、デフォルトの Twitter が開かれる", () => {
      const { result } = renderHook(() => useArticleTemplate());
      act(() => {
        result.current.navigateToX(null);
      });
      expect(windowOpenSpy).toHaveBeenCalledWith(
        "https://twitter.com",
        "_blank",
      );
    });

    test("【正常系】navigateToGithub で指定URLが開かれる", () => {
      const { result } = renderHook(() => useArticleTemplate());
      act(() => {
        result.current.navigateToGithub("https://example.com");
      });
      expect(windowOpenSpy).toHaveBeenCalledWith(
        "https://example.com",
        "_blank",
      );
    });

    test("【正常系】navigateToGithub で URL が null の場合、デフォルトの GitHub が開かれる", () => {
      const { result } = renderHook(() => useArticleTemplate());
      act(() => {
        result.current.navigateToGithub(null);
      });
      expect(windowOpenSpy).toHaveBeenCalledWith(
        "https://github.com",
        "_blank",
      );
    });

    test("【正常系】navigateToFacebook で指定URLが開かれる", () => {
      const { result } = renderHook(() => useArticleTemplate());
      act(() => {
        result.current.navigateToFacebook("https://example.com");
      });
      expect(windowOpenSpy).toHaveBeenCalledWith(
        "https://example.com",
        "_blank",
      );
    });

    test("【正常系】navigateToFacebook で URL が null の場合、デフォルトの Facebook が開かれる", () => {
      const { result } = renderHook(() => useArticleTemplate());
      act(() => {
        result.current.navigateToFacebook(null);
      });
      expect(windowOpenSpy).toHaveBeenCalledWith(
        "https://facebook.com",
        "_blank",
      );
    });
  });
});
