import type { Meta, StoryObj } from "@storybook/react";
import type { IGif } from "@giphy/js-types";
import { GifInfoModal as GifInfoModalComponent } from "../components/Search/GifInfoModal";
import type { GifInfoModalProps } from "../components/Search/GifInfoModal";
import { sampleSearchResults } from "./sampleSearchResults";

const meta: Meta<typeof GifInfoModalComponent> = {
  title: "Components/GifInfoModal",
  component: GifInfoModalComponent,
};

export default meta;

export const GifInfoModal: StoryObj<typeof GifInfoModalComponent> = {
  args: {
    gif: sampleSearchResults[0] as unknown as IGif,
    onClose: () => alert("Close triggered!"),
  },
  render: (args: GifInfoModalProps) => <GifInfoModalComponent {...args} />,
};
