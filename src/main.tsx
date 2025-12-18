import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { ColorModeProvider } from "./providers/ThemeContext.tsx";
import CartComp from "./components/Cart/CartComp.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ColorModeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/cart" element={<CartComp />} />
        </Routes>
      </BrowserRouter>
    </ColorModeProvider>
  </StrictMode>
);
