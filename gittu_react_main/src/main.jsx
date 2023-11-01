import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ThemeProvider } from "styled-components";
import ThemeStyles from "./assets/styles/ThemeStyles";
import GlobalStyles from "./assets/styles/GlobalStyles";
import Rainbowkit from "./Rainbowkit.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Rainbowkit>
      <ThemeProvider theme={ThemeStyles}>
        <GlobalStyles />
        <App />
      </ThemeProvider>
    </Rainbowkit>
  </React.StrictMode>
);
