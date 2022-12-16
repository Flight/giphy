import type { IGif } from "@giphy/js-types";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { sampleSearchResults } from "../../dummyData/sampleSearchResults";
import type { SpinnerProps } from "../Spinner/Spinner";
import type { GifInfoModalProps } from "./GifInfoModal";
import type { SearchResultsProps } from "./SearchResults";
import { Search } from "./Search";

const mockSpinner = vi.fn();
vi.mock("./Spinner", () => ({
  Spinner: (props: SpinnerProps) => mockSpinner(props),
}));

const mockSearchResults = vi.fn();
vi.mock("./SearchResults", () => ({
  SearchResults: (props: SearchResultsProps) => mockSearchResults(props),
}));

const mockGifInfoModal = vi.fn();
vi.mock("./GifInfoModal", () => ({
  GifInfoModal: (props: GifInfoModalProps) => mockGifInfoModal(props),
}));

const mockOnSearchQueryChange = vi.fn();

test("Renders the search component, fires the events on input change, shows the gif info modal on click", async () => {
  render(
    <Search
      searchQuery="test"
      onSearchQueryChange={mockOnSearchQueryChange}
      searchResults={sampleSearchResults as unknown as IGif[]}
    />
  );

  const searchInput = screen.getByRole("searchbox", {
    name: "Search all the GIFs",
  });
  expect(searchInput).toHaveValue("test");

  fireEvent.change(searchInput, { target: { value: "new value" } });
  expect(mockOnSearchQueryChange).toHaveBeenCalledTimes(1);
  expect(mockOnSearchQueryChange).toHaveBeenCalledWith("new value");

  expect(mockSearchResults).toBeCalledWith(
    expect.objectContaining({
      searchResults: sampleSearchResults,
      isTrending: false,
      onItemClick: expect.any(Function),
    })
  );

  act(() => {
    mockSearchResults.mock.calls[0][0].onItemClick(sampleSearchResults[0]);
  });
  waitFor(() => {
    expect(mockGifInfoModal).toBeCalledWith(
      expect.objectContaining({
        gif: sampleSearchResults[0],
        onClose: expect.any(Function),
      })
    );
  });
});
