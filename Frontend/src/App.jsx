import Allevent from "./Components/Allevent";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import Signup from "./Components/Signup";
import Navbar from "./Components/Navbar";
import EventDetails from "./Components/EventDetails";

import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import CreateEvent from "./Components/CreateEvent";
import EditEvent from "./Components/EditEvent";

function App() {
  
  const Layout = () => (
    <>
      <Navbar />
      <Outlet />
    </>
  );

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "signup",
          element: <Signup />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "allevent",
          element: <Allevent />,
        },
        {
          path: "event/:id",
          element: <EventDetails/>,
        },
        {
          path:"create",
          element:<CreateEvent/>
        },
        {
          path:"edit/:id",
          element:<EditEvent/>
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
