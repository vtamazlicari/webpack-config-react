import { createRoot } from "react-dom/client";
import { App } from "@/components/App";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { About } from "@/pages/about";
import { Shop } from "@/pages/shop";
import { Suspense } from "react";

const root = document.getElementById("root");

if (!root) throw new Error("Root is not defined");

const container = createRoot(root);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/about",
        element: (
          <Suspense fallback="Loading ...">
            <About />
          </Suspense>
        ),
      },
      {
        path: "/shop",
        element: (
          <Suspense fallback="Loading ...">
            <Shop />
          </Suspense>
        ),
      },
    ],
  },
]);

container.render(<RouterProvider router={router} />);
