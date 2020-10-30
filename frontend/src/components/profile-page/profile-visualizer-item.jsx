import React from 'react';
import { connect } from 'react-redux';
import { VisualizerItemContainer } from '../visualizers/visualizer';
import { VisualizerSettings } from '../visualizers/visualizer-settings';

export class ProfileVisualizerItem extends React.Component { 
  constructor(props){
    super(props);
  }

  render(){
    this.props.visualizer.width = window.innderWidth/4;
    this.props.visualizer.height = window.innderHeight/4;
    return (
      <li className="column">
        <div>
          {this.props.visualizer.name}
        </div>
        <VisualizerItemContainer onHover={true} visualizerSettings={this.props.visualizer}/>
      </li>
    )
  }
}