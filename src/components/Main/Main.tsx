import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import React, { useEffect, useState } from "react";
import CardComp from "./CardComp";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import { motion, AnimatePresence } from "framer-motion";

const Main = () => {
   type imgs = {
    url: string;
  };

  type Product = {
    id: number;
    category: string;
    productDesc: string;
    productImg: imgs[];
    productPrice: number;
    productRating: number;
    productTitle: string;
  };
  const [alignment, setAlignment] = React.useState("left");
  const apiUrl = import.meta.env.VITE_API_URL;
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("all");
  console.log("API URL:", `${apiUrl}/api/products?populate=*`);
  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
    console.log(event);
  };
  async function fetchProducts() {
    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}/api/products?populate=*`);
      const data = await response.json();
      console.log("Fetched products:", data.data);
      setData(data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <>
      <Container
        sx={{
          py: 9,
          display: "flex",
          justifyContent: "space-between",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          mb: 4,
          gap: { xs: 3, md: 0 },
        }}
      >
        <Box className="flex flex-col">
          <Typography
            variant="h6"
            sx={{ textAlign: { xs: "center", md: "left" } }}
          >
            Selected Products
          </Typography>
          <Typography
            variant="body1"
            sx={{ textAlign: { xs: "center", md: "left" } }}
          >
            All our new arrivals in a exclusive brand selection
          </Typography>
        </Box>
        <ToggleButtonGroup
          color="error"
          value={alignment}
          exclusive
          onChange={handleAlignment}
          aria-label="text alignment"
        >
          <ToggleButton
            sx={{ textTransform: "capitalize", border: "1px solid #666" }}
            value="all"
            aria-label="all"
            onClick={() => setCategory("all")}
          >
            <Typography>All</Typography>
          </ToggleButton>
          <ToggleButton
            value="men"
            aria-label="mex"
            sx={{
              mx: "10px !important",
              border: "1px solid #666",
              textTransform: "capitalize",
              borderLeft: "1px solid #666 !important",
            }}
            onClick={() => setCategory("men")}
          >
            <Typography>Men Category</Typography>
          </ToggleButton>
          <ToggleButton
            sx={{
              textTransform: "capitalize",
              border: "1px solid #666",
              borderLeft: "1px solid #666 !important",
            }}
            value="right"
            aria-label="right aligned"
            onClick={() => setCategory("women")}
          >
            <Typography>Women Category</Typography>
          </ToggleButton>
        </ToggleButtonGroup>
      </Container>
      <Container
        component={"section"}
        sx={{
          pb: 5,
        }}
      >
        {loading ? (
          <Stack
            direction={"row"}
            justifyContent={"center"}
            sx={{
              width: "100%",
              position: "absolute",
              left: "50%",
              top: "0",
              transform: "translate(-50%, -50%)",
            }}
          >
            <CircularProgress />
          </Stack>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 relative place-items-center sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-x-3 lg:gap-y-7.5"
          >
            <AnimatePresence>
              {data
                .filter((e) => e.category === category || category === "all")
                .map(
                  (prod: Product) => {
                    return (
                      <motion.div
                        key={prod.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.5, stiffness: 100 }}
                      >
                        <CardComp
                          title={prod.productTitle}
                          desc={prod.productDesc}
                          rating={prod.productRating}
                          category={prod.category}
                          price={prod.productPrice}
                          productImg={prod.productImg}
                        />
                      </motion.div>
                    );
                  }
                )}
            </AnimatePresence>
          </motion.div>
        )}
      </Container>
    </>
  );
};

export default Main;
