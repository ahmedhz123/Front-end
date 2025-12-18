import {
  ElectricBolt,
  CreditScoreOutlined,
  WorkspacePremiumOutlined,
  AccessAlarmOutlined,
} from "@mui/icons-material";
import IconBox from "./IconBox";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
const IconInfo = () => {
  const theme = useTheme();
  return (
    <Stack
      direction={"column"}
      divider={
        useMediaQuery("(min-width: 882px)") ? (
          <Divider orientation="vertical" flexItem />
        ) : (
          <Divider orientation="horizontal" flexItem />
        )
      }
      sx={{
        display: "flex",
        backgroundColor: theme.palette.mode === "dark" ? "#000" : "#fff ",
        flexWrap: "wrap",
        flexDirection: { sm: "row" },
        justifyContent: {xs:"left",sm: "between"},
        alignItems: { xs: "left", sm: "center" },
        gap: {xs: "20px", sx: "5px"}
      }}
    >
      <IconBox
        icon={<ElectricBolt fontSize="large" />}
        title={"Fast Delivery"}
        subtitle="Start from 10$"
      ></IconBox>
      <IconBox
        icon={<WorkspacePremiumOutlined fontSize="large" />}
        title={"Money Guarantee"}
        subtitle="7 Days Back"
      ></IconBox>
      <IconBox
        icon={<AccessAlarmOutlined fontSize="large" />}
        title={"365 Days"}
        subtitle="For free return"
      ></IconBox>
      <IconBox
        icon={<CreditScoreOutlined fontSize="large" />}
        title={"Payments"}
        subtitle="secure system"
      ></IconBox>
    </Stack>
  );
};

export default IconInfo;
