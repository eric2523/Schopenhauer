import React from "react";
import { CarouselItem } from "../landing-page/carousel-item";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

class Carousel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <CarouselProvider
        totalSlides={6}
        visibleSlides={3}
        naturalSlideWidth={300}
        naturalSlideHeight={250}
        infinite={true}
      >
        <Slider>
          <Slide className="carousel-slide" index={0}>
            <CarouselItem />
          </Slide>
          <Slide className="carousel-slide" index={1}>
            <CarouselItem />
          </Slide>
          <Slide className="carousel-slide" index={2}>
            <CarouselItem />
          </Slide>
          <Slide className="carousel-slide" index={3}>
            <CarouselItem />
          </Slide>
          <Slide className="carousel-slide" index={4}>
            <CarouselItem />
          </Slide>
          <Slide className="carousel-slide" index={5}>
            <CarouselItem />
          </Slide>
        </Slider>
        <div className="carousel-btns">
          <ButtonBack className="ui button carousel-btn">
            <i class="left chevron icon"></i>
          </ButtonBack>
          <ButtonNext className="ui button carousel-btn">
            <i class="right chevron icon"></i>
          </ButtonNext>
        </div>
      </CarouselProvider>
    );
  }
}

export const CarouselProviderIndex = Carousel;
