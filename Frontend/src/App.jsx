import Allevent from "./Components/Allevent"
import Login from "./Components/Login"
import Profile from "./Components/Profile"
import Signup from "./Components/Signup"
import { RouterProvider,createBrowserRouter  } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
  {
    path: "/",
    element: <Allevent />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
]);

  return (
    <>
     <RouterProvider router={router} />;
    </>
  )
}

export default App
