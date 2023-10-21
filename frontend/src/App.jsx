import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Marketplace from "./pages/Marketplace";
import Root from "./pages/root";
import Sell from "./pages/Sell";
import Home from "./pages/home";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        { index: true, element: <Home /> },
        { path: "marketplace", element: <Marketplace /> },
        { path: "sellers", element: <Sell /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
