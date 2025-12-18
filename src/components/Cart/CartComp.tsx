import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTheme } from "@emotion/react";
import "./style_cart.css";
import Button from "@mui/material/Button";
import { DeleteOutline, HomeOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import IconButton from "@mui/material/IconButton";
import type { Theme } from "@mui/material/styles";
const CartComp = () => {
  type imgs = {
    url: string;
  };

  type Product = {
    id: number;
    category: string;
    desc: string;
    imgs: imgs[];
    price: number;
    rating: number;
    title: string;
  };
  const [products, setProducts] = useState<Product[]>([]);

  const deleteFunc = useMemo(() => {
    return (title: string) => () => {
      const filtered = products?.filter(
        (item: Product) => item.title !== title
      );
      setProducts(filtered);
      localStorage.setItem("cartItems", JSON.stringify(filtered));
    };
  }, [products]);
  useEffect(() => {
    const items: string | null = localStorage.getItem("cartItems");
    const cartItems: [] = items ? JSON.parse(items) : [];
    setProducts(cartItems);
  }, []);
  const navigate = useNavigate();
  const theme = useTheme() as Theme;
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        height: "100vh",
        background: "transparent",
      }}
    >
      <Stack
        style={{
          width: "100%",
          alignItems: "center",
          color: theme.palette.text.primary,
        }}
      >
        <Typography variant="h2" className="animate">
          {products.length}
        </Typography>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 640"
          width={200}
        >
          <path
            fill={theme.palette.text.primary}
            d="M24 48C10.7 48 0 58.7 0 72C0 85.3 10.7 96 24 96L69.3 96C73.2 96 76.5 98.8 77.2 102.6L129.3 388.9C135.5 423.1 165.3 448 200.1 448L456 448C469.3 448 480 437.3 480 424C480 410.7 469.3 400 456 400L200.1 400C188.5 400 178.6 391.7 176.5 380.3L171.4 352L475 352C505.8 352 532.2 330.1 537.9 299.8L568.9 133.9C572.6 114.2 557.5 96 537.4 96L124.7 96L124.3 94C119.5 67.4 96.3 48 69.2 48L24 48zM208 576C234.5 576 256 554.5 256 528C256 501.5 234.5 480 208 480C181.5 480 160 501.5 160 528C160 554.5 181.5 576 208 576zM432 576C458.5 576 480 554.5 480 528C480 501.5 458.5 480 432 480C405.5 480 384 501.5 384 528C384 554.5 405.5 576 432 576z"
          />
        </svg>
      </Stack>
      <Stack style={{ width: "100%", marginBottom: "2em" }}>
        {products.map((e) => {
          return (
            <Box
              key={e.id}
              sx={{
                width: "100%",

                display: "flex",
                justifyContent: { xs: "center", sm: "space-between" },
                alignItems: { xs: "center" },
                mt: 5,
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <div className="flex gap-[20px]">
                <img
                  width={50}
                  height={50}
                  className="animate-left"
                  style={{ borderRadius: "50%" }}
                  src={e.imgs[0].url}
                />
                <IconButton onClick={deleteFunc(e.title)}>
                  <DeleteOutline />
                </IconButton>
              </div>

              <Typography
                variant="body1"
                className="animate-right"
                sx={{
                  color: theme.palette.text.primary,
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                }}
              >
                {e.title}
              </Typography>
            </Box>
          );
        })}
      </Stack>
      <Button
        sx={{
          display: "flex",
          gap: "5px",
          w: 100,
          fontWeight: "bold",
          alignItems: "center",
          bgcolor: "#1769aa",
          color: "#e0e0e0",
        }}
        onClick={() => navigate("/")}
      >
        <HomeOutlined />
        Home
      </Button>
    </Container>
  );
};

export default CartComp;
