import React from 'react';
import { connect } from 'react-redux';
import { VisualizerItemContainer } from '../visualizers/visualizer';
import { VisualizerSettings } from '../visualizers/visualizer-settings';

export class ProfileVisualizerItem extends React.Component { 
  constructor(props){
    super(props);
    this.state = {
      connectMusic: false,
      startPlaying: false
    }
    this.toggleMusic = this.toggleMusic.bind(this);
  }

  toggleMusic(){
    this.setState({connectMusic: !this.state.connectMusic});
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleDelete(e){
    // debugger
    this.props.deleteVisualizer(this.props.visualizer._id)
  }

  render(){
    const buttonText = !this.state.connectMusic ? (
      <i className="play icon white-audio-icon"></i>
    ) : (
      <i className="pause icon white-audio-icon"></i>
    );
    var width = isNaN(window.innerWidth) ? window.clientWidth : window.innerWidth;
    // var height = isNaN(window.innerHeight) ? window.clientHeight : window.innerHeight;
    this.props.visualizer.width = (width / 4);
    this.props.visualizer.height = (width / 4);
    return (
      // <li className="column">
      //   <div className="visualizer-title">
      //     {this.props.visualizer.name}
      //   </div>

        <VisualizerItemContainer
          connectMusic={this.props.connectMusic}
          startPlaying={this.props.startPlaying} 
          visualizerSettings={this.props.visualizer}
          canvasWidth={width/4}
          canvasHeight={width/4}
          onHover={this.props.onHover}
          disconnectMusic={this.props.disconnectMusic}
          />
          )
        {/* <button 
          onClick={this.toggleMusic}
          className="ui button"  
        > */}
          {/* {buttonText}
        </button> */}
      //   <button onClick={this.handleDelete}>
      //     DELETE
      //   </button>
      // </li>
  }
}