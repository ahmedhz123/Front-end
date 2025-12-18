import { ArrowRight } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./style.css";
import type { PaginationOptions } from "swiper/types";
import img from "../image/banner-15.jpg";
import "./style.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import IconInfo from "./IconInfo";
const HeroSection = () => {
  const isBreakpoint = useMediaQuery("(min-width: 767px)");
  const pagination: PaginationOptions = {
    dynamicBullets: true,
  };
  const sliders = [
    {
      img: img,
      kind: "MEN",
    },
    {
      img: "src/components/image/women.png",
      kind: "WOMEN",
    },
  ];
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: "flex",
          gap: "10px",
          mt: 4,
          mb: 3,
          maxHeight: "480px",
          overflow: "hidden",
        }}
      >
        <Swiper
          pagination={pagination}
          autoplay={{
            delay: 2500, // time in ms between slides
            disableOnInteraction: false, // keeps autoplay running even when user swipes
          }}
          modules={[Pagination, Navigation, Autoplay]}
          className="mySwiper border-3"
          loop={true}
        >
          {sliders.map((slider) => {
            return (
              <SwiperSlide
                style={{
                  height: "68vh",
                  position: "relative",
                  backgroundColor: "white",
                }}
              >
                <img
                  src={slider.img}
                  style={{ height: "100%" }}
                  id="mg"
                  className="hidden md:block"
                />
                <div
                  className="info absolute md:text-left left-[50%] md:left-[40%] text-center w-[100%] sm:w-[80%] md:w-[60%] flex flex-col gap-[0.2] sm:gap-2"
                  style={{
                    top: "45%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <Typography sx={{ color: "#66615e", fontSize: "2.1rem" }}>
                    LIFESTYLE COLLECTION
                  </Typography>
                  <Typography sx={{ color: "#211d1a", fontSize: "2.5rem" }}>
                    {slider.kind}
                  </Typography>
                  <Box className="flex gap-1.5 justify-center md:justify-start">
                    <Typography
                      sx={{
                        color: "#211d1a",
                        fontSize: "2.5rem",
                        textAlign: { xs: "center", md: "left" },
                      }}
                    >
                      SALE UP TO
                      <span
                        style={{
                          color:
                            isBreakpoint && slider.kind === "WOMEN"
                              ? "#fff"
                              : isBreakpoint === false &&
                                slider.kind === "WOMEN"
                              ? "#000"
                              : "#cc6569",
                          fontSize: "2.5rem",
                          marginLeft: "5px",
                        }}
                      >
                        30% OFF
                      </span>
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      color: "#211d1a",
                      fontSize: "1.2rem",
                      mb: "20px",
                      fontWeight: "600",
                    }}
                  >
                    Get free Shepping on orders over $99.00
                  </Typography>
                  <Button
                    className="md:self-start self-center"
                    sx={{
                      backgroundColor: "#000",
                      color: "#fff",
                      width: "42%",
                      borderRadius: 0,
                      px: 2.5,
                      py: 1.5,
                    }}
                  >
                    SHOP NOW
                  </Button>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        <div
          className="lg:flex flex-col gap-[10px] hidden justify-between"
          style={{ minHeight: "100%" }}
        >
          <Box
            className="flex-1"
            sx={{
              position: "relative",
              hight: "50%",
              minHeight: "fit-content",
            }}
          >
            <img
              src="src\components\image\banner-17.jpg"
              className="w-[100%] h-[100%]"
            />
            <div
              style={{
                position: "absolute",
                transform: "translateY(-50%)",
                top: "20%",
                height: "40vh",
                marginLeft: "20px",
              }}
              className="info flex flex-col  gap-3 top-[50%] translate-y-[50%]"
            >
              <Typography
                variant="h1"
                sx={{ fontSize: "20px", color: "#000", fontWeight: "300" }}
              >
                NEW ARRIVALS
              </Typography>
              <Typography
                variant="h1"
                className="font-bold"
                sx={{ fontSize: "20px", color: "#000", fontWeight: "400" }}
              >
                SUMMER <br />
                SALE 20% OFF
              </Typography>
              <Button
                centerRipple={false}
                variant="text"
                sx={{
                  pl: 0,
                  fontSize: "14px",
                  color: "#000",
                  ml: 0,
                  alignSelf: "start",
                  transition: "color 0.2s ease-in-out",
                  "&:hover": {
                    color: "crimson",
                  },
                }}
              >
                Shop now <ArrowRight />
              </Button>
            </div>
          </Box>
          <Box className=" flex-1 relative" sx={{ height: "50%" }}>
            <img
              src="src\components\image\banner-16.jpg"
              className="w-[100%] h-[100%]"
            />
            <div
              style={{
                position: "absolute",
                transform: "translateY(-50%)",
                top: "20%",
                height: "40vh",
                marginLeft: "20px",
              }}
              className="info flex flex-col  gap-3 top-[50%] translate-y-[50%]"
            >
              <Typography
                variant="h1"
                sx={{ fontSize: "20px", color: "#000", fontWeight: "300" }}
              >
                NEW ARRIVALS
              </Typography>
              <Typography
                variant="h1"
                className="font-bold"
                sx={{ fontSize: "20px", color: "#000", fontWeight: "400" }}
              >
                SUMMER <br />
                SALE 20% OFF
              </Typography>
              <Button
                variant="text"
                centerRipple={false}
                sx={{
                  pl: 0,
                  fontSize: "14px",
                  color: "#000",
                  ml: 0,
                  alignSelf: "start",
                  transition: "color 0.2s ease-in-out",
                  "&:hover": {
                    color: "crimson",
                  },
                }}
              >
                Shop now <ArrowRight />
              </Button>
            </div>
          </Box>
        </div>
      </Box>
      <Box>
        <IconInfo />
      </Box>
    </Container>
  );
};

export default HeroSection;
