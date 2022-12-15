import { render, screen } from "@testing-library/react";
import { GiphyApp } from "./GiphyApp";

const mockSearchApp = vi.fn();
vi.mock("./components/Search/SearchApp", () => ({
  SearchApp: () => mockSearchApp(),
}));

render(<GiphyApp />);

test("GiphyApp loads, shows header and loads the SearchApp component", () => {
  expect(
    screen.getByRole("heading", { level: 1, name: "Find your perfect gif" })
  ).toBeInTheDocument();
  expect(mockSearchApp).toHaveBeenCalledTimes(1);
});
