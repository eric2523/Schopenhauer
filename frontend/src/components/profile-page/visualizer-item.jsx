import React from 'react';
import { connect } from 'react-redux';

export class VisualizerItem extends React.Component { 
  constructor(props){
    super(props);
  }

  render(){
    return (
      <li>
        {this.props.visualizer.name}
      </li>
    )
  }
}