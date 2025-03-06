import { Meta, StoryObj } from "@storybook/react";

import { LikeIcon } from ".";

type LikeIconProps = {
  isliked: boolean;
  width: number;
  height: number;
};

export default {
  title: "atoms/LikeIcon",
  component: LikeIcon,
  tags: ["autodocs"],
  args: {} as LikeIconProps,
} as Meta;

type Story = StoryObj<typeof LikeIcon>;

export const LikedIcon: Story = {
  args: {
    isliked: true,
    width: 22,
    height: 22,
  },
};

export const NotLikedIcon: Story = {
  args: {
    isliked: false,
    width: 22,
    height: 22,
  },
};
