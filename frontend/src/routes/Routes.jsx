import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import SearchPage from "../pages/SearchPage";
import LoginWrapper from "../pages/login/LoginWrapper";
import RegisterWrapper from "../pages/register/RegisterWrapper";
import ForgotPassword from "../pages/forgotPassword/ForgotPassword";
import OtpVerification from "../pages/forgotPassword/OtpVerification";
import ResetPassword from "../pages/forgotPassword/ResetPassword";
import UserMenuMobile from "../pages/UserMenuMobile";

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
        },
        {
          path: "login",
          element: <LoginWrapper/>
        },
        {
          path: "register",
          element: <RegisterWrapper/>
        },
        {
          path: "forgot-password",
          element: <ForgotPassword/>
        },
        {
          path: "verification-otp",
          element: <OtpVerification/>
        },
        {
          path: "reset-password",
          element: <ResetPassword/>
        },
        {
          path: "user-menu",
          element: <UserMenuMobile/>
        }
      ]
    },
  ]);

  return <RouterProvider router={router} />; // Provide the router to RouterProvider
};

export default Routes;
