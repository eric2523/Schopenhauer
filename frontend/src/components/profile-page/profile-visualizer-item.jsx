import React from 'react';
import { connect } from 'react-redux';
import { VisualizerItemContainer } from '../visualizers/visualizer';
import { VisualizerSettings } from '../visualizers/visualizer-settings';

export class ProfileVisualizerItem extends React.Component { 
  constructor(props){
    super(props);
    this.state = {
      connectMusic: false
    }
    this.toggleMusic = this.toggleMusic.bind(this);
  }

  toggleMusic(){
    this.setState({connectMusic: !this.state.connectMusic});
  }

  render(){
    var width = isNaN(window.innerWidth) ? window.clientWidth : window.innerWidth;
    // var height = isNaN(window.innerHeight) ? window.clientHeight : window.innerHeight;
    this.props.visualizer.width = (width / 4);
    this.props.visualizer.height = (width / 4);
    return (
      <li className="column">
        <div className="visualizer-title">
          {this.props.visualizer.name}
        </div>
        <div onClick={this.toggleMusic}>
        <VisualizerItemContainer
          connectMusic={this.state.connectMusic}
          onHover={true} 
          visualizerSettings={this.props.visualizer}
          />
        </div>
      </li>
    )
  }
}