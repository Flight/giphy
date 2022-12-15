import type { Meta, StoryObj } from "@storybook/react";
import type { IGif } from "@giphy/js-types";
import { Search as SearchComponent } from "../components/Search/Search";
import type { SearchProps } from "../components/Search/Search";
import { sampleSearchResults } from "./sampleSearchResults";

const meta: Meta<typeof SearchComponent> = {
  title: "Components/Search",
  component: SearchComponent,
};

export default meta;

export const Search: StoryObj<typeof SearchComponent> = {
  args: {
    searchQuery: "Hello world!",
    onSearchQueryChange: () => alert("Search query changed!"),
    searchResults: sampleSearchResults as unknown as IGif[],
  },
  render: (args: SearchProps) => <SearchComponent {...args} />,
};
