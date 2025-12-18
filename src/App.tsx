import Header from "./components/Header/Header.tsx";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import HeroSection from "./components/Hero/HeroSection.tsx";
import { useTheme } from "@mui/material/styles";
import type { Theme } from "@mui/material/styles";
import Main from "./components/Main/Main.tsx";
import Footer from "./components/footer/Footer.tsx";
import FabComp from "./components/FabComp.tsx";
import { useState } from "react";
import { DialogContext } from "./context/AlertContext.tsx";
import DialogComp from "./components/DialogComp.tsx";
const App = () => {
  const theme = useTheme() as Theme;
  const [open, setOpen] = useState(false);
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <CssBaseline />
      <Header />
      <Box
        bgcolor={
          theme.palette.background.bg ?? theme.palette.background.default
        }
      >
        <HeroSection />
        <DialogContext.Provider value={{ open, setOpen }}>
          <Main />
          <DialogComp />
        </DialogContext.Provider>
      </Box>
      <Footer />
      <FabComp />
    </Box>
  );
};

export default App;
