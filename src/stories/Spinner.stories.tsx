import type { Meta, StoryObj } from "@storybook/react";
import { Spinner } from "../components/Spinner/Spinner";
import type { SpinnerProps } from "../components/Spinner/Spinner";

const meta: Meta<typeof Spinner> = {
  title: "UI/Spinner",
  component: Spinner,
};

export default meta;
type SpinnerStory = StoryObj<typeof Spinner>;

export const Basic: SpinnerStory = {};

export const WithTitle: SpinnerStory = {
  args: {
    title: "Some data is loading",
    className: "block text-center",
  },
  render: (args: SpinnerProps) => <Spinner {...args} />,
};
