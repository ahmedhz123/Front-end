import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
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
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState("all");
  
  if (!apiUrl) {
    console.error("VITE_API_URL is not set in environment variables");
  }
  
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
    if (!apiUrl) {
      setError("API URL is not configured");
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      // Add timeout to prevent hanging requests
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
      
      const response = await fetch(`${apiUrl}/api/products?populate=*`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      
      // Check if response is ok
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      // Handle Strapi response structure
      if (result.data && Array.isArray(result.data)) {
        // Transform Strapi image format - handle both v4 and v5 formats
        const transformedData = result.data.map((product: any) => {
          // Check if it's Strapi v4 format (with attributes) or v5 format (direct properties)
          const isV4Format = product.attributes !== undefined;
          const productData = isV4Format ? product.attributes : product;
          
          // Handle images - Strapi returns images with populate=* in format:
          // { data: [{ id, attributes: { url: '/uploads/...' } }] } or similar
          let productImg: imgs[] = [];
          if (productData.productImg) {
            const imgData = productData.productImg;
            
            // Most common case: Strapi returns { data: [...] }
            if (imgData.data) {
              const imgArray = Array.isArray(imgData.data) ? imgData.data : [imgData.data];
              productImg = imgArray
                .map((img: any) => {
                  // Extract URL from attributes.url or direct url property
                  const url = img.attributes?.url || img.url || '';
                  return url ? { url } : null;
                })
                .filter((img: imgs | null): img is imgs => img !== null);
            }
            // Handle direct array (shouldn't happen with populate, but handle it)
            else if (Array.isArray(imgData)) {
              productImg = imgData
                .map((img: any) => {
                  const url = img.attributes?.url || img.url || img.attributes?.formats?.thumbnail?.url || '';
                  return url ? { url } : null;
                })
                .filter((img: imgs | null): img is imgs => img !== null);
            }
            // Handle direct URL string
            else if (typeof imgData === 'string') {
              productImg = [{ url: imgData }];
            }
            // Handle object with url property
            else if (imgData.url) {
              productImg = [{ url: imgData.url }];
            }
          }
          
          return {
            id: product.id,
            category: productData.category || '',
            productDesc: productData.productDesc || '',
            productImg: productImg,
            productPrice: productData.productPrice || 0,
            productRating: productData.productRating || 0,
            productTitle: productData.productTitle || '',
          };
        });
        setData(transformedData);
      } else if (Array.isArray(result)) {
        // Fallback: if data is directly an array (shouldn't happen with Strapi, but handle it)
        setData(result);
      } else {
        setData([]);
      }
    } catch (error: any) {
      console.error("Error fetching products:", error);
      if (error.name === 'AbortError') {
        setError("Request timed out. Please try again.");
      } else {
        setError(error.message || "Failed to fetch products. Please check your connection and try again.");
      }
      setData([]);
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
        ) : error ? (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Typography variant="h6" color="error" gutterBottom>
              Error Loading Products
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {error}
            </Typography>
            <Button 
              variant="contained" 
              onClick={fetchProducts}
              sx={{ mt: 2 }}
            >
              Retry
            </Button>
          </Box>
        ) : data.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Typography variant="h6" color="text.secondary">
              No products found
            </Typography>
          </Box>
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
