import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { type ReactNode } from "react";

type props = {
  icon: ReactNode;
  title: string;
  subtitle: string;
};
const IconBox = ({ icon, title, subtitle }: props) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: { xs: "center" },
        alignItems: "center",
        gap: "15px",
        p: 1,
        minWidth: "250px",
        flex: 1,
        flexDirection: { xs: "column", sm: "column", md: "row" },
        textAlign: { xs: "center" },
      }}
    >
      <Box>{icon}</Box>
      <Stack>
        <Typography variant="body1">{title}</Typography>
        <Typography sx={{ color: theme.palette.text.secondary }}>
          {subtitle}
        </Typography>
      </Stack>
    </Box>
  );
};

export default IconBox;
