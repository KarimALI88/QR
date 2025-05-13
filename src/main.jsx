import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider } from "@material-tailwind/react";
import { BrowserRouter } from "react-router-dom";
import ContextProvider from "./context/AppContext.jsx";
import "./i18n"; // Import i18n configuration

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <ContextProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
  </ContextProvider>
    </BrowserRouter>
);
