import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import "./style.css";
import WindowIcon from "@mui/icons-material/Window";
import Typography from "@mui/material/Typography";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import Box from "@mui/material/Box";
import { alpha, styled, useTheme } from "@mui/material/styles";
import Menu, { type MenuProps } from "@mui/material/Menu";
import React from "react";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import {
  SportsEsportsOutlined,
  ElectricBikeOutlined,
  LaptopChromebookOutlined,
  MenuBookOutlined,
  Close,
} from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import ListComp from "./ListComp";
const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 220,
    color: "rgb(55, 65, 81)",
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
        ...theme.applyStyles("dark", {
          color: "inherit",
        }),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
    ...theme.applyStyles("dark", {
      color: theme.palette.grey[300],
    }),
  },
}));

const ThirdHeader: React.FC = () => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  // ordinary menu

  const handleClose = () => {
    setAnchorEl(null);
  };
  // 🔹 event type is React.MouseEvent<HTMLButtonElement>
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  //===== Drawer ======
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: "top" | "left" | "bottom" | "right", open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (event.type === "keydown") {
        return;
      }

      setState({ ...state, [anchor]: open });
    };
  return (
    <Container
      sx={{
        mt: "50px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      maxWidth="xl"
    >
      <Box>
        <Button
          sx={{
            backgroundColor:
              theme.palette.mode == "light" ? "transparent" : "#1c2025",
            display: "flex",
            position: "relative",
            alignItems: "center",
            justifyContent: "center",
            textTransform: "capitalize",
            p: 1.2,
            width: "220px",
            color:
              theme.palette.mode === "light"
                ? theme.palette.text.secondary
                : "#93b8d1",
          }}
          disableElevation
          onClick={handleClick}
        >
          <Box display={"-webkit-flex"} gap={0.5}>
            <WindowIcon />
            <Typography fontWeight={500}>Categories</Typography>
          </Box>
          <Box flexGrow={1} />
          <KeyboardArrowRightOutlinedIcon />
        </Button>
        <StyledMenu
          id="demo-customized-menu"
          slotProps={{
            list: {
              "aria-labelledby": "demo-customized-button",
            },
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose} disableRipple>
            <ElectricBikeOutlined />
            Bikes
          </MenuItem>
          <MenuItem onClick={handleClose} disableRipple>
            <LaptopChromebookOutlined />
            Electronics
          </MenuItem>

          <MenuItem onClick={handleClose} disableRipple>
            <MenuBookOutlined />
            Books
          </MenuItem>
          <MenuItem onClick={handleClose} disableRipple>
            <SportsEsportsOutlined />
            Games
          </MenuItem>
        </StyledMenu>
      </Box>
      {useMediaQuery("(max-width: 1099px)") && (
        <IconButton onClick={toggleDrawer("top", true)}>
          <MenuIcon />
        </IconButton>
      )}
      <Drawer
        onClose={toggleDrawer("top", false)}
        anchor="top"
        open={state["top"]}
        sx={{
          height: "100%",
          zIndex: 3,
          position: "fixed",
          inset: 0,
          ".MuiDrawer-paper.MuiDrawer-paperAnchorTop": {
            background: "#393939",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      >
        <Box className="flex flex-col w-[60%]">
          <IconButton
            onClick={toggleDrawer("top", false)}
            className="self-end"
            sx={{
              color: "white",
              "&:hover": {
                backgroundColor: "transparent",
                color: "crimson",
              },
              "&:hover svg": {
                rotate: "180deg",
                cursor: "pointer",
              },
              "& svg": { transition: "0.3s ease-in-out" },
            }}
          >
            <Close />
          </IconButton>
          {[
            { title: "Home", links: ["Link1", "Link2", "Link3"] },
            { title: "Mega Menu", links: ["Link1", "Link2"] },
            { title: "Full Screen Menu", links: ["Link1"] },
            { title: "Pages", links: ["Link1", "Link2"] },
            { title: "User Account", links: ["Link1", "Link2", "Link3"] },
            { title: "Vendor Account", links: ["Link1"] },
          ].map((t) => {
            return (
              <Accordion key={t.title} elevation={0} sx={{ color: "white" }}>
                <AccordionSummary
                  sx={{ color: "white" }}
                  expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Typography component="span">{t.title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List>
                    {t.links.map((link) => {
                      return (
                        <>
                          <ListItem>
                            <ListItemButton>{link}</ListItemButton>
                          </ListItem>
                        </>
                      );
                    })}
                  </List>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </Box>
      </Drawer>
      {/* Ordinary select boxes */}
      {useMediaQuery("(min-width: 1100px)") && (
        <Box
          sx={{
            display: "flex",
            gap: "20px",
            justifyContent: "space-around",
            flex: 0.97,
            marginLeft: "10px",
          }}
        >
          <ListComp
            title={"Home"}
            choices={["Market", "Gadget", "Grocery", "Fashion"]}
          />
          <ListComp
            title={"Mega Menu"}
            choices={["Home", "User Account", "Vendor Account", "Sale Page"]}
          />
          <ListComp
            title={"Full Screen Menu"}
            choices={["T-Shirts", "Shirts", "Shoes", "Sunglasses", "Jackets"]}
          />
          <ListComp
            title={"Pages"}
            choices={["Sale page", "Vendor", "Shop", "Auth"]}
          />
          <ListComp
            title={"User Account"}
            choices={[
              "Orders",
              "Profile",
              "Address",
              "Support Tickets",
              "Wishlist",
            ]}
          />
          <ListComp
            title={"Vendor Account"}
            choices={["Dashboard", "Products", "Orders", "Profile"]}
          />
        </Box>
      )}

      {/* ==Ordinary select boxes ==*/}
    </Container>
  );
};

export default ThirdHeader;
