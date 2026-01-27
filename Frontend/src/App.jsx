import Allevent from "./Components/Allevent";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import Signup from "./Components/Signup";
import Navbar from "./Components/Navbar";

import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import Home from "./pages/Home";

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
          element: <Home/>,
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
          element: <Allevent/>,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
