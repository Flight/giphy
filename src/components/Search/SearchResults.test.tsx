import type { IGif } from "@giphy/js-types";
import { fireEvent, render, screen } from "@testing-library/react";
import { sampleSearchResults } from "../../dummyData/sampleSearchResults";
import { SearchResults } from "./SearchResults";

const mockOnItemClick = vi.fn();

test("Renders the search results", () => {
  render(
    <SearchResults
      searchResults={sampleSearchResults as unknown as IGif[]}
      isTrending
      onItemClick={mockOnItemClick}
    />
  );

  expect(
    screen.getByRole("heading", {
      level: 2,
      name: "Trending",
    })
  ).toBeInTheDocument();

  const image = screen.queryByRole("img", {
    name: "Scream Movies GIF by Scream",
  });
  expect(image).toHaveAttribute(
    "src",
    "https://media3.giphy.com/media/WRmtN2kf6j3IZMJNwa/200.webp?cid=9cbc9277t1mgzmlccj681q0cm2ecf2l5vt8hm66t0xif3p6a&rid=200.webp&ct=g"
  );
  expect(image).toHaveAttribute("width", "356");
  expect(image).toHaveAttribute("height", "200");

  fireEvent.click(
    screen.getByRole("button", { name: "Scream Movies GIF by Scream" })
  );
  expect(mockOnItemClick).toBeCalledTimes(1);
  expect(mockOnItemClick).toBeCalledWith(sampleSearchResults[0]);
});
