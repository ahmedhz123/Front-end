import Fab from "@mui/material/Fab";
import UpIcon from "@mui/icons-material/KeyboardArrowUp";
import Zoom from "@mui/material/Zoom";
import { useEffect, useState } from "react";
const FabComp = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    window.onscroll = () => {
      if (window.scrollY > 150) {
        setShow(true);
      } else {
        setShow(false);
      }
    };
  }, []);
  return (
    <Zoom in={show} style={{ position: "fixed", bottom: 20, right: 20 }}>
      <Fab
        sx={{
          bgcolor: "#1769aa",
          color: "#fff",
          border: "1px solid #2196f3",
          transition: "0.5s",
          "&:hover": {
            color: "#000",
          },
        }}
        aria-label="add"
        size="medium"
        onClick={() => {
          window.scrollTo(0, 0);
        }}
      >
        <UpIcon />
      </Fab>
    </Zoom>
  );
};

export default FabComp;
