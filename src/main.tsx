import ReactDOM from "react-dom/client";
import { GiphyApp } from "./GiphyApp";
import "./index.pcss";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<GiphyApp />);
