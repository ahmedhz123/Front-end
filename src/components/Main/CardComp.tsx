import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { AddShoppingCartOutlined } from "@mui/icons-material";
import Rating from "@mui/material/Rating";
import "./main-sec.css";
import { useContext } from "react";
import { DialogContext } from "../../context/AlertContext";
import Box from "@mui/material/Box";
type imgs = {
  url: string;
};

type Product = {
  category: string;
  desc: string;
  productImg: imgs[];
  price: number;
  rating: number;
  title: string;
};
const CardComp = ({
  title,
  desc,
  rating,
  category,
  price,
  productImg,
}: Product) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  const { open, setOpen } = useContext(DialogContext);
  const apiUrl = import.meta.env.VITE_API_URL || "";

  // Fix null length error: Check if productImg exists and has items
  const getImageUrl = () => {
    // Safety checks: ensure productImg exists and is an array
    if (!productImg || !Array.isArray(productImg) || productImg.length === 0) {
      return "/placeholder-image.jpg"; // Fallback image
    }

    const firstImage = productImg[0];
    if (!firstImage || typeof firstImage !== 'object' || !firstImage.url) {
      return "/placeholder-image.jpg";
    }

    const imageUrl = firstImage.url;
    
    // Safety check: ensure imageUrl is a string
    if (typeof imageUrl !== 'string' || imageUrl.trim() === '') {
      return "/placeholder-image.jpg";
    }

    // Handle Strapi image URLs - they can be relative paths
    // If URL is relative (starts with /), prepend the backend URL
    if (imageUrl.startsWith("/")) {
      // Only prepend if apiUrl is available
      if (apiUrl && typeof apiUrl === 'string' && apiUrl.trim() !== '') {
        // Remove trailing slash from apiUrl if present
        const baseUrl = apiUrl.endsWith("/") ? apiUrl.slice(0, -1) : apiUrl;
        return `${baseUrl}${imageUrl}`;
      }
      // If no apiUrl, return relative path (browser will resolve it)
      return imageUrl;
    }

    // If URL already has protocol (http/https), use as is
    if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
      return imageUrl;
    }

    // Fallback
    return "/placeholder-image.jpg";
  };

  const handleOpen = () => {
    setOpen(true);
    console.log(open);
    console.log(category);
    localStorage.setItem(
      "product",
      JSON.stringify({ title, desc, rating, category, price, productImg })
    );
  };
  return (
    <Card sx={{ maxWidth: 345, backgroundColor: "transparent" }}>
      <CardMedia
        component="img"
        image={getImageUrl()}
        sx={{
          objectFit: "cover !important",
          width: "100%",
          height: "300px",
          imageRendering: "auto",
        }}
        onError={(e) => {
          // Fallback if image fails to load
          e.currentTarget.src = "/placeholder-image.jpg";
        }}
      />
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography gutterBottom variant="h5" component="div">
            {title.substring(0, 10)}
          </Typography>

          <Typography gutterBottom variant="h5" component="div">
            {price}$
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {desc.substring(0, 200)}...
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between" }}>
        <Button
          size="small"
          sx={{ color: "#2c84cf" }}
          variant="text"
          onClick={handleOpen}
        >
          <AddShoppingCartOutlined sx={{ mr: "6px" }} />
          Add to Cart
        </Button>
        <Rating
          name="simple-controlled"
          value={rating}
          precision={0.1}
          readOnly
        />
      </CardActions>
    </Card>
  );
};

export default CardComp;
