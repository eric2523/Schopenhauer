import React from "react";
import { connect } from "react-redux";
import { CarouselItem } from "./carousel-item";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import 'pure-react-carousel/dist/react-carousel.es.css';

class Carousel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let carouselTitle = "Explore recent creations";
    if (this.props.isAuthenticated) {
      carouselTitle = "Your recent creations";
    }

    return (
      <div className="carousel-main-div">
        <div className="carousel-header">
          <h1 className="carousel-title">{carouselTitle}</h1>
        </div>

        <div className="carousel-items">
          <CarouselProvider
            naturalSlideWidth={100}
            naturalSlideHeight={125}
            totalSlides={3}
          >
            <Slider>
              <Slide index={0}>
                <CarouselItem />
              </Slide>
              <Slide index={1}>
                <CarouselItem />
              </Slide>
              <Slide index={2}>
                <CarouselItem />
              </Slide>
            </Slider>
            <ButtonBack>Back</ButtonBack>
            <ButtonNext>Next</ButtonNext>
          </CarouselProvider>
        </div>
      </div>
    );
  }
}

// eventualy need to map template slice of state into carousel
const mSTP = (state) => ({
  isAuthenticated: state.session.isAuthenticated,
});

// map fetching of recent/ user templates
const mDTP = (dispatch) => ({});

export const CarouselIndex = connect(mSTP, mDTP)(Carousel);
