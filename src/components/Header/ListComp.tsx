import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import React, { useMemo } from "react";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useTheme, type Theme } from "@mui/material/styles";
type ListCompProps = {
  title: string;
  choices: string[];
};
const ListComp = ({ title, choices }: ListCompProps) => {
  const [anchor, setanchor] = React.useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState<number>(1);
  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setanchor(event.currentTarget);
  };

  //@ts-expect-error ignore
  const handleMenuItemClick = useMemo(
    () =>
      (event: React.MouseEvent<HTMLElement>, index: number): void => {
        setSelectedIndex(index);
        setanchor(null);
        console.log(event);
      }
  );
  const open = Boolean(anchor);
  const handleClose = () => {
    setanchor(null);
  };
  console.log(handleMenuItemClick);
  //Nested Menu
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);
  const [submenuAnchor, setSubmenuAnchor] = React.useState<null | HTMLElement>(
    null
  );
  const handleSubmenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    setSubmenuAnchor(event.currentTarget);
    setOpenIndex(index);
  };

  const handleSubmenuClose = () => {
    setSubmenuAnchor(null);
    setOpenIndex(null);
  };
  const theme: Theme = useTheme();
  return (
    <Box>
      <List
        component="nav"
        aria-label="Device settings"
        sx={{
          backgroundColor: "transparent",
        }}
      >
        <Box
          id="lock-button"
          aria-haspopup="listbox"
          aria-controls="lock-menu"
          aria-label="when device is locked"
          sx={{ cursor: "pointer", display: "flex", flexDirection: "row" }}
          onClick={handleClickListItem}
        >
          <Typography>{title}</Typography>
          <KeyboardArrowRightOutlinedIcon />
        </Box>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchor}
        open={open}
        onClose={handleClose}
        sx={{
          width: "300px !important",
          ".MuiList-root.MuiList-padding.MuiMenu-list": {
            backgroundColor:
              theme.palette.mode === "light" ? "#fff" : "#1e1e1e",
          },
        }}
        slotProps={{
          list: {
            "aria-labelledby": "lock-button",
            role: "listbox",
          },
        }}
      >
        {choices.map((option, index) => (
          <MenuItem
            sx={{
              display: "flex",
              justifyContent: "space-between",
              position: "relative",
            }}
            key={option}
            selected={index === selectedIndex}
            onMouseEnter={(e) => handleSubmenuOpen(e, index)}
            onMouseLeave={handleSubmenuClose}
          >
            {option}
            <ChevronRightIcon />
            <Menu
              id="fade-menu"
              slotProps={{
                list: {
                  "aria-labelledby": "fade-button",
                },
              }}
              sx={{ position: "absolute", left: "0" }}
              anchorEl={submenuAnchor}
              open={openIndex === index}
              onClose={handleSubmenuClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right", // 👈 appears to the right of parent
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left", // 👈 attaches left edge to parent's right edge
              }}
            >
              <MenuItem onClick={handleSubmenuClose}>Profile</MenuItem>
              <MenuItem onClick={handleSubmenuClose}>My account</MenuItem>
              <MenuItem onClick={handleSubmenuClose}>Logout</MenuItem>
            </Menu>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default ListComp;
