import { CSSProperties, JSX } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { BookmarkIcon } from ".";

type BookmarkIconProps = {
  isbookmarked: boolean;
  width: number;
  height: number;
};

export default {
  title: "atoms/BookmarkIcon",
  component: BookmarkIcon,
  tags: ["autodocs"],
  args: {} as BookmarkIconProps,
} as Meta;

type Story = StoryObj<typeof BookmarkIcon>;

export const BookmarkedIcon: Story = {
  args: {
    isbookmarked: true,
    width: 22,
    height: 22,
  },
};

export const NotBookmarkedIcon: Story = {
  args: {
    isbookmarked: false,
    width: 22,
    height: 22,
  },
};
