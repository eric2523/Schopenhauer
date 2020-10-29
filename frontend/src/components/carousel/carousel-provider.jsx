import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CarouselItem } from "../landing-page/carousel-item";

export const Carousel = (props) => {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "0px",
    slidesToShow: 3,
    speed: 500,
    dots: true,
  };
  return (
    <div className="slide-wrap">
      <Slider {...settings}>
        <div className="slide-item-div">
          <CarouselItem />
        </div>
        <div className="slide-item-div">
          <CarouselItem />
        </div>
        <div className="slide-item-div">
          <CarouselItem />
        </div>
        <div className="slide-item-div">
          <CarouselItem />
        </div>
        <div className="slide-item-div">
          <CarouselItem />
        </div>
        <div className="slide-item-div">
          <CarouselItem />
        </div>
      </Slider>
    </div>
  );
};
