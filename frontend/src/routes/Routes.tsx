import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import SearchPage from "../pages/SearchPage";

const Routes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />, // Define your route and the component to render
      children: [
        {
          path:"",
          element: <Home/>
        },
        {
          path: "search",
          element: <SearchPage/>
        }
      ]
    },
  ]);

  return <RouterProvider router={router} />; // Provide the router to RouterProvider
};

export default Routes;
