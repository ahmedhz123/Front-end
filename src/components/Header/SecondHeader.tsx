import Container from "@mui/material/Container";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTheme } from "@emotion/react";
import Badge from "@mui/material/Badge";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import {  useNavigate } from "react-router-dom";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "30px",
  backgroundColor: "transparent",

  paddingTop: 13,
  paddingBottom: 13,
  border: "1px solid #777",
  "&:hover": {
    backgroundColor: "transparent",
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  paddingBottom: 26,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  fontWeight: "bold",
  "& .MuiInputBase-input": {
    padding: " theme.spacing(1, 1, 1, 0)",
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
    },
  },
}));
const options = ["All Categories", "CAR", "Clothes", "Electronics"];
// Badge
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: "0 4px",
  },
}));
//===========================
const SecondHeader = () => {
  const navigate = useNavigate();
  const [length, setLength] = useState(0);
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const open = Boolean(anchorEl);
  //@ts-expect-error no matter
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };
  //@ts-expect-error no matter
  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };
  type Product = {
  category: string;
  desc: string;
  imgs: string[];
  price: number;
  rating: number;
  title: string;
};
  const items: string | null = localStorage.getItem("cartItems");
  const cartItems: Product[] = items ? JSON.parse(items) : null;
  useEffect(() => {
    setLength(cartItems.length);
  }, []);
  useEffect(() => {
    setLength(cartItems.length);
  }, [cartItems]);
  useEffect(() => {
    const items: string | null = localStorage.getItem("cartItems");
    const cartItems = items ? JSON.parse(items) : null;
    setLength(cartItems.length);
  }, [length]);
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Container
      maxWidth="xl"
      className="flex-col md:flex-row gap-[20px] md:gap-[0]"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        mt: "100px",
      }}
    >
      <Stack>
        <IconButton
          sx={{
            "&:hover": {
              background: "none",
            },
          }}
        >
          <ShoppingCartOutlinedIcon
            //@ts-expect-error may be not error
            sx={{ color: theme.palette.mode === "light" ? "#000" : "#fff" }}
          />
        </IconButton>
        <Typography>E-commerce</Typography>
      </Stack>
      <Search
        className="flex-1 sm:flex-[0.6] md:flex-[0.9] lg:flex-[0.6] "
        sx={{
          display: "flex",
          height: "60px",
          width: { xs: "100%", sm: "90%", md: "80%" },
          position: "relative",
          overflow: "hidden",
          border: "1px solid #666",
          transition: "0.3s",
        }}
      >
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          sx={{
            ".MuiInputBase-input": {
              width: "30vw",
            },
          }}
          inputProps={{ "aria-label": "search" }}
        />
        <List
          sx={{
            height: "55px",
            position: "absolute",
            right: 0,
            width: { lg: "26%", xs: "45%", sm: "30%" },
            px: 0,
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            "&:hover": {
              //@ts-expect-error no error
              background: theme.palette.mode === "light" ? "#40474cb5" : "auto",
              border: "none",
              outline: "none",
            },
          }}
        >
          <ListItemButton
            id="lock-button"
            aria-haspopup="listbox"
            aria-controls="lock-menu"
            aria-label="when device is locked"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClickListItem}
            sx={{
              height: "60px",
              background: "#40474c",
              border: "20px",
            }}
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
      </Search>
      <Stack direction={"row"}>
        <IconButton
          onClick={() => {
            navigate("/cart");
          }}
          aria-label="cart"
          sx={{
            "&:hover": {
              background: "none",
            },
          }}
        >
          <StyledBadge badgeContent={length} color="info">
            <ShoppingCartIcon />
          </StyledBadge>
        </IconButton>
        <IconButton>
          <PersonOutlineOutlinedIcon
            sx={{
              "&:hover": {
                background: "none",
              },
            }}
          />
        </IconButton>
      </Stack>
    </Container>
  );
};

export default SecondHeader;
