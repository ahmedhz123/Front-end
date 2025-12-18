import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Footer = () => {
  return (
    <Box sx={{ p: 1.5, backgroundColor: "#2a3445" }}>
      <Typography sx={{textAlign: "center", color: "#fff"}} variant="h6">
        Designed and developed by <b style={{ color: "#a6505d" }}>Ahmed Zaki</b>{" "}
        &copy;{new Date().getFullYear()}
      </Typography>
    </Box>
  );
};

export default Footer;
