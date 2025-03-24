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
import Dashboard from "../layouts/Dashboard";
import MyOrders from "../pages/MyOrders";
import Address from "../pages/Address";
import ProfileWrapper from "../pages/profile/ProfileWrapper";

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
        },
        {
          path: "dashboard",
          element: <Dashboard/>,
          children: [
            {
              path: "profile",
              element: <ProfileWrapper/>

            },
            {
              path : "my-orders",
              element : <MyOrders/>
          },
          {
              path : "address",
              element : <Address/>
          },
          ]
        }
      ]
    },
  ]);

  return <RouterProvider router={router} />; // Provide the router to RouterProvider
};

export default Routes;
