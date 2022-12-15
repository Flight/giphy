import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { SearchApp } from "./components/Search/SearchApp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SearchApp />,
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);

const GiphyApp = () => (
  <div className="container mx-auto max-w-5xl p-5">
    <h1 className="text-3xl font-bold pb-5 text-center text-neutral">
      Find your perfect gif
    </h1>
    <RouterProvider router={router} />
    <a href="http://giphy.com" target="_blank" rel="noreferrer">
      <img
        alt="Powered by GIPHY"
        src="public/images/Poweredby_100px-White_VertLogo.png"
        width={101}
        height={36}
        className="block mx-auto mt-4"
      />
    </a>
  </div>
);

export { GiphyApp };
