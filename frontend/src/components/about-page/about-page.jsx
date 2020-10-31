import React from "react";

export class AboutPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="about-splash">
          <div className="main-title">
            <h1 className="splash-title">About us</h1>
          </div>
        </div>
        <div className="about-info-1">
          <div className="info-1-head">
            <h1>Our Motivation</h1>
            <div className="motivation-bottom">
              <p id="info-1-head-h2">
                Our app pays homage to the conflict between music and visual representation by allowing users to engage in creative free play by making their own visualizers for music they upload. We encourage the spirit of music as Schopenhauer saw it, but in the realm of the visual, and over the medium of technology.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
