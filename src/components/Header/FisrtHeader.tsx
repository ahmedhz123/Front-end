import { styled, useTheme } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import BedtimeOutlinedIcon from "@mui/icons-material/BedtimeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { useState } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useColorMode } from "../../hook/useColorMode";
const drawerWidth = 240;
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }: { open: boolean }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const options = ["Ar", "En"];
const FirstHeader = () => {
  const theme = useTheme();
  const { mode, toggleColorMode } = useColorMode();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    setSelectedIndex(index);
    setAnchorEl(null);
    console.log(event);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <AppBar position="absolute" sx={{ zIndex: 0 }}>
        <Container
          maxWidth="xl"
          sx={{
            "&": {
              display: "flex",
              alignItems: "center",
              justifyContent: { sm: "space-between", xs: "flex-start" },
              flexDirection: { xs: "column-reverse", sm: "row" },
            },
            mx: { lg: "auto" },
            width: { lg: "90%" },
          }}
        >
          <Stack direction={"row"} gap={2} alignItems={"center"}>
            <Box className="bg-[#E24D60] mr-2 w-[70px] h-[30px] flex items-center justify-center rounded-3xl">
              <Typography sx={{ fontWeight: "bold" }}>Hot</Typography>
            </Box>
            <Typography className="text-[#8c94a1] text-[10px]">
              Free Express Shipping
            </Typography>
          </Stack>
          {useMediaQuery("(max-width: 992px)") && <Box flexGrow={1}></Box>}

          <Box flexGrow={1} />
          <Stack direction={"row"}>
            {mode === "dark" ? (
              <IconButton
                onClick={toggleColorMode}
                sx={{
                  cursor: "pointer",
                  color: "white",
                  "&:hover": {
                    background: "none",
                  },
                }}
              >
                <BedtimeOutlinedIcon />
              </IconButton>
            ) : (
              <IconButton
                onClick={toggleColorMode}
                sx={{
                  cursor: "pointer",
                  color: "white",
                  "&:hover": {
                    background: "none",
                  },
                }}
              >
                <WbSunnyOutlinedIcon />
              </IconButton>
            )}
            <div>
              <List
                component="nav"
                aria-label="Device settings"
                sx={{ height: "fit-content" }}
              >
                <ListItemButton
                  id="lock-button"
                  aria-haspopup="listbox"
                  aria-controls="lock-menu"
                  aria-label="when device is locked"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClickListItem}
                >
                  <ListItemText
                    primary={<KeyboardArrowDownIcon />}
                    secondary={options[selectedIndex]}
                    sx={{
                      display: "flex",
                      color: "white",
                      alignItems: "center",
                      gap: 0.5,
                      "& .MuiTypography-body2": {
                        color: "white",
                        fontWeight: "bold",
                      },
                    }}
                  />
                </ListItemButton>
              </List>
              <Menu
                id="lock-menu"
                anchorEl={anchorEl}
                open={open}
                sx={{
                  ".MuiList-root.MuiList-padding.MuiMenu-list.css-1toxriw-MuiList-root-MuiMenu-list":
                    {
                      backgroundColor:
                        theme.palette.mode === "light" ? "#f7f7f7" : "#252b32",
                    },
                }}
                onClose={handleClose}
                slotProps={{
                  list: {
                    "aria-labelledby": "lock-button",
                    role: "listbox",
                  },
                }}
              >
                {options.map((option, index) => (
                  <MenuItem
                    key={option}
                    selected={index === selectedIndex}
                    onClick={(event) => handleMenuItemClick(event, index)}
                  >
                    {option}
                  </MenuItem>
                ))}
              </Menu>
            </div>
            <IconButton
              sx={{
                cursor: "pointer",
                color: "white",
                "&:hover": {
                  background: "none",
                },
              }}
            >
              <TwitterIcon />
            </IconButton>
            <IconButton
              sx={{
                cursor: "pointer",
                color: "white",
                "&:hover": {
                  background: "none",
                },
              }}
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              sx={{
                cursor: "pointer",
                color: "white",
                "&:hover": {
                  background: "none",
                },
              }}
            >
              <InstagramIcon />
            </IconButton>
          </Stack>
        </Container>
      </AppBar>
    </div>
  );
};

export default FirstHeader;
