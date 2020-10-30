import React from 'react';
import { connect } from 'react-redux';
import { VisualizerItemContainer } from '../visualizers/visualizer';
import { VisualizerSettings } from '../visualizers/visualizer-settings';

export class ProfileVisualizerItem extends React.Component { 
  constructor(props){
    super(props);
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
        <VisualizerItemContainer onHover={true} visualizerSettings={this.props.visualizer}/>
      </li>
    )
  }
}