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
  </div>
);

export { GiphyApp };
