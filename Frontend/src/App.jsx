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
import AboutPage from "./pages/AboutPage";
import AdminDashboard from "./pages/AdminDashboard";
import ScrollToTop from "./Components/ScrollToTop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AnimatePresence, motion } from "framer-motion";

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

function PageWrapper({ children }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

function Layout() {
  const location = useLocation();
  const showFooter = ["/", "/event", "/allevent", "/about"].includes(location.pathname);

  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait">
        <PageWrapper key={location.pathname}>
          <Outlet />
        </PageWrapper>
      </AnimatePresence>
      {showFooter && <Footer />}
      <ScrollToTop />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
        toastStyle={{
          background: "#111827",
          border: "1px solid rgba(124,58,237,0.3)",
          color: "#F8FAFC",
          borderRadius: "12px",
        }}
      />
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
        { path: "profilepage", element: <ProfilePage /> },
        { path: "edit/:id", element: <EditEvent /> },
        { path: "about", element: <AboutPage /> },
      ],
    },
    // Admin dashboard — full-screen, no shared Navbar/Footer
    { path: "/admin", element: <AdminDashboard /> },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
