import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Loader from "./Components/Loader.jsx";

function Root() {
  const [loaderDone, setLoaderDone] = useState(false);

  return (
    <>
      {!loaderDone && <Loader onComplete={() => setLoaderDone(true)} />}
      {loaderDone && <App />}
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
