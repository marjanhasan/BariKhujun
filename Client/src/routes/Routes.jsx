import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/home/Home";
import Dashboard from "../layouts/DashBoard";
import ErrorElement from "../components/error/ErrorElement";
import Discover from "../pages/discover/Discover";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import AddHouse from "../components/owner/AddHouse";
import MyHouse from "../components/owner/MyHouse";
import Bookings from "../components/renter/Bookings";
import Loader from "../components/loader/Loader";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorElement />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/discover",
        element: <Discover />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/l",
        element: <Loader />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "/dashboard/addhouse",
        element: <AddHouse />,
      },
      {
        path: "/dashboard/myhouse",
        element: <MyHouse />,
      },
      {
        path: "/dashboard/booked",
        element: <Bookings />,
      },
    ],
  },
]);
