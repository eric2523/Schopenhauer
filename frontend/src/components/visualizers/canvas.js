import React from "react";
import song from "../../audio_files/bensound-goinghigher.mp3";

export class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.audio = new Audio(song);
    this.togglePlay = this.togglePlay.bind(this);
  }

  togglePlay() {
    if (this.audio.paused) {
      this.audio.play();
    } else {
      this.audio.pause();
    }
  }

  render() {
    const buttonText = this.audio.paused ? "Play" : "Pause";
    return (
      <div>
        <button onClick={this.togglePlay}>{buttonText}</button>
      </div>
    );
  }
}
