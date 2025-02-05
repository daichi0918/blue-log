import { CSSProperties, JSX } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { BaseButton } from ".";

type BaseButtonProps = {
  color: "primary" | "secondary"; // 例として3種類
  size: "small" | "medium";
  text: string;
  additionalStyle?: CSSProperties;
} & JSX.IntrinsicElements["button"];

export default {
  title: "atoms/BaseButton",
  component: BaseButton,
  tags: ["autodocs"],
  args: {} as BaseButtonProps,
} as Meta;

type Story = StoryObj<typeof BaseButton>;

export const PrimaryButton: Story = {
  args: {
    color: "primary",
    size: "small",
    text: "Button",
  },
};

export const SecondaryButton: Story = {
  args: {
    color: "secondary",
    size: "small",
    text: "Button",
  },
};
