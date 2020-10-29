import React from "react";
import { connect } from "react-redux";
import {Carousel} from "../carousel/carousel-provider"

class CarouselContainer extends React.Component {
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
        {/* <SimpleSlider /> */}
        <Carousel />
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

export const CarouselIndex = connect(mSTP, mDTP)(CarouselContainer);
