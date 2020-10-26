import React from "react";
import song from '../../../../audio_files/bensound-goinghigher.mp3'\

export class Canvas extends React.Component{
  constructor(props) {
    this.audio = new Audio(song)
  }
}
