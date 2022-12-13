import { render, screen } from "@testing-library/react";
import { App } from "./App";

// const mockSampleApp = vi.fn();
// vi.mock("./components/Sample/SampleApp", () => ({
//   SampleApp: () => mockSampleApp(),
// }));

render(<App />);

test("App loads and shows header", () => {
  expect(
    screen.getByRole("heading", { level: 1, name: "App" })
  ).toBeInTheDocument();
  // expect(mockSampleApp).toHaveBeenCalledTimes(1);
});
