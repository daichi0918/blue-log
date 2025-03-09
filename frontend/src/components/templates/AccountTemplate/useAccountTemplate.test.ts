import { act } from "react";
import { type ArticleCardType } from "@/type/ArticleCard";
import { renderHook } from "@testing-library/react";

import { useAccountTemplate } from "./useAccountTemplate";

describe("useAccountTemplate, Hooksテスト", () => {
  describe("【関数テスト】handleInputSearch", () => {
    test("【正常系】inputArticleSearchが更新されること", () => {
      const expectValue = "検索キーワード";
      const eventObject = {
        target: {
          value: expectValue,
        },
      } as React.ChangeEvent<HTMLInputElement>;

      const { result } = renderHook(() => useAccountTemplate());

      expect(result.current.inputArticleSearch).toBe(""); // 初期状態

      // handleInputSearchを呼び出す
      act(() => result.current.handleInputSearch(eventObject));

      // 入力値が更新されていることを確認
      expect(result.current.inputArticleSearch).toBe(expectValue);
    });
  });

  describe("【関数テスト】handleLoadMore", () => {
    test("【正常系】displayCountが更新されること", () => {
      const { result } = renderHook(() => useAccountTemplate());

      expect(result.current.displayCount).toBe(5); // 初期状態

      // handleLoadMoreを呼び出す
      act(() => result.current.handleLoadMore());

      // displayCountが+10されていることを確認
      expect(result.current.displayCount).toBe(15);

      // 再度呼び出す
      act(() => result.current.handleLoadMore());

      // displayCountがさらに+10されていることを確認
      expect(result.current.displayCount).toBe(25);
    });
  });

  describe("【関数テスト】handleSortChange", () => {
    test("【正常系】sortKeyが更新されること", () => {
      const { result } = renderHook(() => useAccountTemplate());

      expect(result.current.sortKey).toBe("newest"); // 初期状態

      const eventObject = {
        target: {
          value: "oldest",
        },
      } as React.ChangeEvent<HTMLSelectElement>;

      // handleSortChangeを呼び出す
      act(() => result.current.handleSortChange(eventObject));

      // sortKeyが"oldest"に更新されていることを確認
      expect(result.current.sortKey).toBe("oldest");
    });
  });

  describe("【関数テスト】sortArticles", () => {
    // 共通のarticlesを定義
    const articles: ArticleCardType[] = [
      {
        id: 1,
        title: "記事1",
        tags: ["tag1", "tag2"],
        createdAt: "2025-03-01T00:00:00Z",
        updatedAt: "2025-03-01T00:00:00Z",
        user: {
          id: 1,
          name: "ユーザー1",
          image: null,
          profile: "プロフィール1",
          twitter: "@user1",
          github: "https://github.com/user1",
          facebook: "https://facebook.com/user1",
        },
        likeCount: 10,
        isLiked: false,
        isBookmarked: true,
      },
      {
        id: 2,
        title: "記事2",
        tags: ["tag2", "tag3"],
        createdAt: "2025-03-02T00:00:00Z",
        updatedAt: "2025-03-02T00:00:00Z",
        user: {
          id: 2,
          name: "ユーザー2",
          image: "https://example.com/user2.jpg",
          profile: "プロフィール2",
          twitter: "@user2",
          github: "https://github.com/user2",
          facebook: "https://facebook.com/user2",
        },
        likeCount: 20,
        isLiked: true,
        isBookmarked: false,
      },
      {
        id: 3,
        title: "記事3",
        tags: ["tag1", "tag3"],
        createdAt: "2025-03-03T00:00:00Z",
        updatedAt: "2025-03-03T00:00:00Z",
        user: {
          id: 3,
          name: "ユーザー3",
          image: "https://example.com/user3.jpg",
          profile: "プロフィール3",
          twitter: "@user3",
          github: "https://github.com/user3",
          facebook: "https://facebook.com/user3",
        },
        likeCount: 30,
        isLiked: true,
        isBookmarked: true,
      },
    ];
    test("【正常系】記事がソートされること（oldest）", () => {
      const { result } = renderHook(() => useAccountTemplate());

      // ソート前
      expect(result.current.sortArticles(articles)).toEqual([
        articles[2],
        articles[1],
        articles[0],
      ]);

      // "oldest"でソートされる
      act(() =>
        result.current.handleSortChange({
          target: { value: "oldest" },
        } as React.ChangeEvent<HTMLSelectElement>),
      );

      // state 更新後、sortArticlesを再実行してソートを確認
      expect(result.current.sortArticles(articles)).toEqual([
        articles[0],
        articles[1],
        articles[2],
      ]);
    });

    test("【正常系】記事がソートされること（likes）", () => {
      const { result } = renderHook(() => useAccountTemplate());

      // "likes"でソートされる
      act(() =>
        result.current.handleSortChange({
          target: { value: "likes" },
        } as React.ChangeEvent<HTMLSelectElement>),
      );

      expect(result.current.sortArticles(articles)).toEqual([
        articles[2],
        articles[1],
        articles[0],
      ]);
    });
  });
});
