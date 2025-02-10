import "@testing-library/jest-dom";

// `useRouter` のモック関数
export const mockUseRouter = () => ({
  push: jest.fn(),
  replace: jest.fn(),
  prefetch: jest.fn(),
});

// `usePathname` のモック関数
export const mockUsePathname = jest.fn(() => "/");

// Jest のモック適用
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => mockUseRouter()),
  usePathname: mockUsePathname,
}));
