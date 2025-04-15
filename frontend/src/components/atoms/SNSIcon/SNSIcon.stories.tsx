import { Meta, StoryObj } from "@storybook/react";
import { IconContext, IconType } from "react-icons";
import { FaFacebook, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

import { SNSIcon } from ".";

type LikeIconProps = {
  Icon: IconType;
  onClick: () => void;
  iconContextValue: React.ComponentProps<typeof IconContext.Provider>["value"];
};

export default {
  title: "atoms/SNSIcon",
  component: SNSIcon,
  tags: ["autodocs"],
  args: {} as LikeIconProps,
} as Meta;

type Story = StoryObj<typeof SNSIcon>;

export const TwitterIcon: Story = {
  args: {
    Icon: FaXTwitter,
    iconContextValue: { size: "20px" },
  },
};

export const GitHubIcon: Story = {
  args: {
    Icon: FaGithub,
    iconContextValue: { size: "20px" },
  },
};

export const FacebookIcon: Story = {
  args: {
    Icon: FaXTwitter,
    iconContextValue: { size: "20px" },
  },
};
