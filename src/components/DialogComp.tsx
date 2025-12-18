import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Button from "@mui/material/Button";
import React, { useContext, useEffect } from "react";
import { DialogContext } from "../context/AlertContext";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Close, ShoppingCartOutlined } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import type { Theme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
const Transition = React.forwardRef(function Transition(props, ref) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  return <Slide direction="up" ref={ref} {...props} />;
});
const DialogComp = () => {
  type imgs = {
    url: string;
  };

  type Product = {
    category: string;
    desc: string;
    imgs: imgs[];
    price: number;
    rating: number;
    title: string;
  };
  const storedProduct: string | null = localStorage?.getItem("product") || null;
  const product: Product = storedProduct ? JSON.parse(storedProduct) : null;
  const context = useContext(DialogContext);

  if (!context) {
    throw new Error("DialogContext must be used inside a provider");
  }

  const { open, setOpen } = context;

  useEffect(() => {
    if (product?.imgs?.[0]?.url) {
      setImgUrl(product.imgs[0].url);
    }
  }, [open]);
  // stop everything if product is null
  function handleAddingToCart() {
    const stored: Product[] = JSON.parse(
      localStorage.getItem("cartItems") || "[]"
    );

    const exists = stored.some((item) => item.title === product.title);
    if (!exists) {
      const updated = [...stored, product];
      localStorage.setItem("cartItems", JSON.stringify(updated));
    }
  }

  const [value, setValue] = React.useState(0);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const theme = useTheme() as Theme;
  const [imgUrl, setImgUrl] = React.useState(product?.imgs[0].url || "");
  return (
    <>
      <Dialog
        open={open}
        slots={{
          transition: Transition,
        }}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        sx={{
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid red",

          "& .MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation24.MuiDialog-paper":
            {
              display: "flex",
              p: 4,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: { xs: "column", md: "row" },
              backgroundColor:
                theme.palette.mode === "dark" ? "#131313" : "f5f5f5",
              position: "relative",
              width: "1200px !important",
              overflow: "auto",
              py: "20px !important",
            },
          "& .MuiBox-root.css-t32tv0": {
            marginTop: {
              xs: "300px !important",
              sm: "450px !important",
              md: "0 !important",
            },
          },
        }}
      >
        <IconButton
          sx={{
            position: "absolute",
            top: 0,
            right: 5,
            color: theme.palette.mode === "dark" ? "white" : "black",
            transition: "0.3s",
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
          onClick={handleClose}
        >
          <Close />
        </IconButton>
        <Box
          width={useMediaQuery("(max-width: 865px)") ? 200 : 600}
          height={50}
          sx={{ mb: { xs: 18, md: "auto" }, mt: { xs: 18, md: "auto" } }}
        >
          {product?.imgs && product.imgs.length > 0 && (
            <img
              src={`${imgUrl}`}
              style={{
                objectFit: "cover",
              }}
              height={200}
              width={1000}
            />
          )}
        </Box>
        <Box>
          <DialogTitle
            variant="h5"
            sx={{ textAlign: { xs: "center", md: "left" } }}
          >
            {product?.category === "men" ? "MEN'S FASHION" : "WOMEN'S FASHION"}
          </DialogTitle>
          <DialogContent sx={{ textAlign: { xs: "center", md: "left" } }}>
            <DialogContentText color="error" variant="h5" sx={{ mb: 1 }}>
              {product?.price}$
            </DialogContentText>
            <DialogContentText
              id="alert-dialog-slide-description"
              sx={{ color: theme.palette.mode === "light" ? "black" : "white" }}
            >
              {product?.desc}
            </DialogContentText>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="icon tabs example"
              sx={{
                "& .MuiTabs-list.MuiTabs-flexContainer.css-hzcega-MuiTabs-list":
                  {
                    justifyContent: { xs: "center", md: "left" },
                  },
              }}
            >
              {product?.imgs.map((img) => {
                return (
                  <Tab
                    onClick={() => setImgUrl(img.url)}
                    label={
                      <img
                        src={img.url}
                        style={{
                          height: "100% !important",
                          objectFit: "cover",
                          maxHeight: 100,
                        }}
                      />
                    }
                  ></Tab>
                );
              })}
            </Tabs>
          </DialogContent>
          <DialogActions
            sx={{
              display: "flex",
              justifyContent: { xs: "center", md: "left" },
            }}
          >
            <Button
              sx={{ gap: "5px", color: "white", backgroundColor: "#0257b5" }}
              variant="contained"
              onClick={() => {
                handleAddingToCart();
                setOpen(false);
              }}
            >
              <ShoppingCartOutlined />
              Buy Now
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
};

export default DialogComp;
