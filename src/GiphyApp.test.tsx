import { render, screen } from "@testing-library/react";
import { GiphyApp } from "./GiphyApp";

// const mockSampleApp = vi.fn();
// vi.mock("./components/Sample/SampleApp", () => ({
//   SampleApp: () => mockSampleApp(),
// }));

render(<GiphyApp />);

test("GiphyApp loads and shows header", () => {
  expect(
    screen.getByRole("heading", { level: 1, name: "Find your perfect gif" })
  ).toBeInTheDocument();
  // expect(mockSampleApp).toHaveBeenCalledTimes(1);
});
