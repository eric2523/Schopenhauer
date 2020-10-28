import React from "react";
import { connect } from "react-redux";
import {CarouselItem} from "./carousel-item";

class Carousel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        Carousel
      </div>
    );
  }
}

// eventualy need to map template slice of state into carousel
const mSTP = (state) => ({});

// map fetching of recent/ user templates
const mDTP = (dispatch) => ({});

export const CarouselIndex = connect(mSTP, mDTP)(Carousel);
