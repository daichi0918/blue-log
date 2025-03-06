import { CSSProperties, JSX } from "react";
import { Meta, StoryObj } from "@storybook/react";

import { InputForm } from ".";

type InputFormProps = {
  additionalStyle?: CSSProperties;
} & JSX.IntrinsicElements["input"];

export default {
  title: "atoms/InputForm",
  component: InputForm,
  tags: ["autodocs"],
  args: {} as InputFormProps,
} as Meta;

type Story = StoryObj<typeof InputForm>;

export const DefaultInput: Story = {};
