import type { IGif } from "@giphy/js-types";
import { fireEvent, render, screen } from "@testing-library/react";
import { sampleSearchResults } from "../../dummyData/sampleSearchResults";
import { GifInfoModal } from "./GifInfoModal";

const mockClose = vi.fn();

test("Renders the Gif Info modal and reacts on closing it", () => {
  render(
    <GifInfoModal
      gif={sampleSearchResults[0] as unknown as IGif}
      onClose={mockClose}
    />
  );

  expect(
    screen.getByRole("heading", {
      level: 2,
      name: "Scream Movies GIF by Scream",
    })
  ).toBeInTheDocument();

  const image = screen.getByRole("img");
  expect(image).toHaveAttribute(
    "src",
    "https://media3.giphy.com/media/WRmtN2kf6j3IZMJNwa/giphy.webp?cid=9cbc9277t1mgzmlccj681q0cm2ecf2l5vt8hm66t0xif3p6a&rid=giphy.webp&ct=g"
  );
  expect(image).toHaveAttribute("width", "480");
  expect(image).toHaveAttribute("height", "270");

  expect(screen.getByRole("textbox", { name: "GIF" })).toHaveValue(
    "https://media3.giphy.com/media/WRmtN2kf6j3IZMJNwa/giphy.gif?cid=9cbc9277t1mgzmlccj681q0cm2ecf2l5vt8hm66t0xif3p6a&rid=giphy.gif&ct=g"
  );

  expect(screen.getByRole("textbox", { name: "WebP" })).toHaveValue(
    "https://media3.giphy.com/media/WRmtN2kf6j3IZMJNwa/giphy.webp?cid=9cbc9277t1mgzmlccj681q0cm2ecf2l5vt8hm66t0xif3p6a&rid=giphy.webp&ct=g"
  );

  expect(screen.getByRole("textbox", { name: "MP4" })).toHaveValue(
    "https://media3.giphy.com/media/WRmtN2kf6j3IZMJNwa/giphy.mp4?cid=9cbc9277t1mgzmlccj681q0cm2ecf2l5vt8hm66t0xif3p6a&rid=giphy.mp4&ct=g"
  );

  fireEvent.click(screen.getByTestId("gif-info"));
  expect(mockClose).toBeCalledTimes(1);
});
