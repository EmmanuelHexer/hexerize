import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./AppContext/AppContext";
import { HelmetProvider } from "react-helmet-async";

// Wait for CSS to load before rendering to prevent FOUC
const renderApp = () => {
  createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <HelmetProvider>
        <BrowserRouter>
          <AppProvider>
            <App />
          </AppProvider>
        </BrowserRouter>
      </HelmetProvider>
    </React.StrictMode>,
  );
};

// Check if document is already loaded
if (document.readyState === 'loading') {
  // DOM still loading, wait for it
  document.addEventListener('DOMContentLoaded', renderApp);
} else {
  // DOM already loaded, render immediately
  renderApp();
}
