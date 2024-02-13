import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Paper, Typography } from "@mui/material";

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
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <Slider {...settings}>
      {images.map((image, index) => (
        <div key={index}>
          <Paper elevation={3} sx={{ textAlign: "center" }}>
            <img src={image.url} alt={image.alt} style={{ width: "100%" }} />
            <Typography variant="subtitle1">{image.caption}</Typography>
          </Paper>
        </div>
      ))}
    </Slider>
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
