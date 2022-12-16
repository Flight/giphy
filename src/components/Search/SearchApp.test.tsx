import { render, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { sampleSearchResults } from "../../dummyData/sampleSearchResults";
import type { SearchProps } from "./Search";
import { SearchApp } from "./SearchApp";

const mockSearch = vi.fn();
vi.mock("./Search", () => ({
  Search: (props: SearchProps) => mockSearch(props),
}));

const mockFetchTrending = vi.fn(() => Promise.resolve(sampleSearchResults));
const mockFetchSearchResults = vi.fn(() =>
  Promise.resolve(sampleSearchResults)
);
vi.mock("../../hooks/useGiphy", () => ({
  useGiphy: () => [mockFetchTrending, mockFetchSearchResults],
}));

test("Renders the Search initial state", async () => {
  render(
    <MemoryRouter>
      <SearchApp />
    </MemoryRouter>
  );

  expect(mockFetchTrending).toHaveBeenCalledTimes(1);
  expect(mockFetchSearchResults).not.toHaveBeenCalled();
  expect(mockSearch).toHaveBeenCalledWith(
    expect.objectContaining({
      searchQuery: "",
      onSearchQueryChange: expect.any(Function),
      searchResults: undefined,
    })
  );

  await waitFor(() => {
    expect(mockSearch).toHaveBeenCalledWith(
      expect.objectContaining({
        searchQuery: "",
        onSearchQueryChange: expect.any(Function),
        searchResults: sampleSearchResults,
      })
    );
  });
});

test("Passing the correct URL search parameter", async () => {
  render(
    <MemoryRouter initialEntries={["/?q=some_string"]}>
      <SearchApp />
    </MemoryRouter>
  );

  setTimeout(async () => {
    expect(mockFetchSearchResults).toHaveBeenCalledTimes(1);
    expect(mockFetchSearchResults).toHaveBeenCalledWith("some_string");
    expect(mockFetchSearchResults).toHaveBeenCalledWith(
      expect.objectContaining({
        searchQuery: "some_string",
        onSearchQueryChange: expect.any(Function),
        searchResults: sampleSearchResults,
      })
    );
  }, 2000); // Waiting for the search string to debounce
});
