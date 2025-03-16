import { Meta, StoryObj } from "@storybook/react";

import { LoadingEffect } from ".";

export default {
  title: "atoms/LoadingEffect",
  component: LoadingEffect,
  tags: ["autodocs"],
} as Meta;

type Story = StoryObj<typeof LoadingEffect>;

export const DefaultLoadingEffect: Story = {};
