import { act } from "react";
import { renderHook } from "@testing-library/react";

import { useProfileSettingsTemplate } from "./useProfileSettingsTemplate";

describe("useSignUpTemplate, Hooksテスト", () => {
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
  describe("【関数テスト】handleInputName", () => {
    test("【正常系】profileを更新できること", () => {
      const expectValue = "プロフィール";

      const eventObject = {
        target: {
          value: expectValue,
        },
      } as React.ChangeEvent<HTMLTextAreaElement>;
      const { result } = renderHook(() => useProfileSettingsTemplate());
      expect(result.current.profile).toBe("");
      act(() => result.current.handleTextAreaProfile(eventObject));
      expect(result.current.profile).toBe(expectValue);
    });
  });
  describe("【関数テスト】handleInputTwitter", () => {
    test("【正常系】twitterを更新できること", () => {
      const expectValue = "twitter";

      const eventObject = {
        target: {
          value: expectValue,
        },
      } as React.ChangeEvent<HTMLInputElement>;
      const { result } = renderHook(() => useProfileSettingsTemplate());
      expect(result.current.twitter).toBe("");
      act(() => result.current.handleInputTwitter(eventObject));
      expect(result.current.twitter).toBe(expectValue);
    });
  });
  describe("【関数テスト】handleInputGithub", () => {
    test("【正常系】githubを更新できること", () => {
      const expectValue = "github";

      const eventObject = {
        target: {
          value: expectValue,
        },
      } as React.ChangeEvent<HTMLInputElement>;
      const { result } = renderHook(() => useProfileSettingsTemplate());
      expect(result.current.github).toBe("");
      act(() => result.current.handleInputGithub(eventObject));
      expect(result.current.github).toBe(expectValue);
    });
  });
  describe("【関数テスト】handleInputFacebook", () => {
    test("【正常系】facebookを更新できること", () => {
      const expectValue = "facebook";

      const eventObject = {
        target: {
          value: expectValue,
        },
      } as React.ChangeEvent<HTMLInputElement>;
      const { result } = renderHook(() => useProfileSettingsTemplate());
      expect(result.current.facebook).toBe("");
      act(() => result.current.handleInputFacebook(eventObject));
      expect(result.current.facebook).toBe(expectValue);
    });
  });
});
