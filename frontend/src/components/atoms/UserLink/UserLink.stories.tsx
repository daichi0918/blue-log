import { ReactNode } from "react";
import { Meta, StoryObj } from "@storybook/react";

import { UserLink } from ".";

type UserLinkProps = {
  userId: number;
  children: ReactNode;
};

export default {
  title: "atoms/UserLink",
  component: UserLink,
  tags: ["autodocs"],
  args: {} as UserLinkProps,
} as Meta;

type Story = StoryObj<typeof UserLink>;

export const DefaultUserLink: Story = {
  args: {
    userId: 1,
    children: <div>a</div>,
  },
};
