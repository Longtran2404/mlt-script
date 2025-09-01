import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// Disable locator-js in production to avoid errors
if (process.env.NODE_ENV === "production") {
  // Override console.error to filter out locator-js errors
  const originalError = console.error;
  console.error = (...args: any[]) => {
    const errorMessage = args[0];
    if (typeof errorMessage === "string" && errorMessage.includes("[locator")) {
      return; // Skip locator-js errors in production
    }
    originalError.apply(console, args);
  };
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
