import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CarouselItem } from "../landing-page/carousel-item";
import { fetchUserVisualizer } from "../../actions/visualizer_actions";
import { connect } from "react-redux";

const mSTP = (state) => ({
  visualizers: state.entities.visualizers,
  currUserId: state.session.user.id,
});

const mDTP = (dispatch) => ({
  fetchUsersVisualizzers: (userId) => dispatch(fetchUserVisualizer(userId)),
});

class Carousel extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchUsersVisualizzers(this.props.currUserId);
  }

  render() {
    const settings = {
      className: "center",
      centerMode: true,
      infinite: true,
      centerPadding: "0px",
      slidesToShow: 3,
      speed: 500,
      dots: true,
    };

    let visualizerKeys = Object.keys(this.props.visualizers);
    let carouselItems = [];
    if (visualizerKeys.length) {
      carouselItems = visualizerKeys.map((key) => {
        return (
          <div className="slide-item-div">
            <CarouselItem
              key={key}
              visualizerSettings={this.props.visualizers[key]}
            />
          </div>
        );
      });
    }

    return (
      <div className="slide-wrap">
        <Slider {...settings}>{carouselItems}</Slider>
      </div>
    );
  }
}

export const CarouselItemContainer = connect(mSTP, mDTP)(Carousel);
