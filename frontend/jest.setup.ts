import "@testing-library/jest-dom";

// `useRouter` のモック関数
export const mockUseRouter = () => ({
  push: jest.fn(),
  replace: jest.fn(),
  prefetch: jest.fn(),
});

// `usePathname` のモック関数
export const mockUsePathname = jest.fn(() => "/");

// `useParams` のモック関数
export const mockUseParams = jest.fn(() => ({ id: "123" }));

// Jest のモック適用
jest.mock("next/navigation", () => ({
  useParams: mockUseParams,
  useRouter: jest.fn(() => mockUseRouter()),
  usePathname: mockUsePathname,
}));
