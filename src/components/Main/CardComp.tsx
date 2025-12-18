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
const CardComp = ({ title, desc, rating, category, price, productImg }: Product) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  const { open, setOpen } = useContext(DialogContext);
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
        image={`${productImg[0].url}`}
        sx={{
          objectFit: "cover !important",
          width: "100%",
          height: "300px",
          imageRendering: "auto",
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
