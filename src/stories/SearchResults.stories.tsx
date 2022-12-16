import type { Meta, StoryObj } from "@storybook/react";
import type { IGif } from "@giphy/js-types";
import { SearchResults as SearchResultsComponent } from "../components/Search/SearchResults";
import type { SearchResultsProps } from "../components/Search/SearchResults";
import { sampleSearchResults } from "../dummyData/sampleSearchResults";

const meta: Meta<typeof SearchResultsComponent> = {
  title: "Components/SearchResults",
  component: SearchResultsComponent,
};

export default meta;

export const SearchResults: StoryObj<typeof SearchResultsComponent> = {
  args: {
    searchResults: sampleSearchResults as unknown as IGif[],
    isTrending: true,
    onItemClick: (item) => alert(`Item clicked: ${item.title}`),
  },
  render: (args: SearchResultsProps) => <SearchResultsComponent {...args} />,
};
