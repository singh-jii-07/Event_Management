import Allevent from "./Components/Allevent";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import Signup from "./Components/Signup";
import Navbar from "./Components/Navbar";
import EventDetails from "./Components/EventDetails";
import { RouterProvider, createBrowserRouter, Outlet, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import CreateEvent from "./Components/CreateEvent";
import EditEvent from "./Components/EditEvent";
import Events from "./pages/Events";
import Footer from "./Components/Footer";
import ProfilePage from "./pages/ProfilePage";

function Layout() {
  const location = useLocation();

  const showFooter =
    location.pathname === "/" || location.pathname === "/event";

  return (
    <>
      <Navbar />
      <Outlet />
      {showFooter && <Footer />}
    </>
  );
}

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "event", element: <Events /> },
        { path: "login", element: <Login /> },
        { path: "signup", element: <Signup /> },
        { path: "profile", element: <Profile /> },
        { path: "allevent", element: <Allevent /> },
        { path: "event/:id", element: <EventDetails /> },
        { path: "create", element: <CreateEvent /> },
        { path: "profilepage", element: <ProfilePage/> },
        { path: "edit/:id", element: <EditEvent /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
