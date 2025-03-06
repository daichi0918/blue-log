import { Meta, StoryObj } from "@storybook/react";

import { UserImage } from ".";

type UserImageProps = {
  image: string | null | undefined;
  userName: string;
};

export default {
  title: "atoms/UserImage",
  component: UserImage,
  tags: ["autodocs"],
  args: {} as UserImageProps,
} as Meta;

type Story = StoryObj<typeof UserImage>;

export const imageIcon: Story = {
  args: {
    image: "https://picsum.photos/200",
    userName: "example",
  },
};

export const NoImageIcon: Story = {
  args: {
    image: null,
    userName: "example",
  },
};
