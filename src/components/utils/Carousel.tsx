import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Paper, Typography } from "@mui/material";

interface Image {
  url: string;
  alt: string;
  caption: string;
}

interface CarouselProps {
  images: Image[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const settings: SliderSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  return (
    <Box
      sx={{
        width: "300px",
        border: "3px solid rgb(0, 44, 81)",
        borderRadius: "5px",
      }}
    >
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <Paper elevation={3} sx={{ textAlign: "center" }}>
              <img src={image.url} alt={image.alt} style={{ width: "350px" }} />
              <Typography variant="subtitle1">{image.caption}</Typography>
            </Paper>
          </div>
        ))}
      </Slider>
    </Box>
  );
};

export default Carousel;

interface SliderSettings {
  dots: boolean;
  infinite: boolean;
  speed: number;
  slidesToShow: number;
  slidesToScroll: number;
  autoplay: boolean;
  autoplaySpeed: number;
}
