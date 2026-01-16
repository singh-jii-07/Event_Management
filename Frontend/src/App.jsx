import Allevent from "./Components/Allevent";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import Signup from "./Components/Signup";
import Navbar from "./Components/Navbar";

import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";

function App() {

  // 👇 Inline Layout (Navbar + Outlet)
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
          element: <Allevent />,
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
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
