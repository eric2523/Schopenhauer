import React from 'react'
import {Scrubber} from './scrubber'

export class ToolbarIndexItem extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <li onClick={this.props.handleHeightAmp} className="toolbar-item">
        <i className="fas fa-snowflake"></i>
      </li>
    )
  }
}