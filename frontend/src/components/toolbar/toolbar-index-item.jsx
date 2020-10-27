import React from 'react'
import {Scrubber} from './scrubber'

export class ToolbarIndexItem extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div className="toolbar-item-outer-div">
        <div className="toolbar-item-div">
          <li onClick={this.props.handleHeightAmp} className="toolbar-item">
            <i className="fas fa-snowflake"></i>
            <span>Height Amplitude</span> 
          </li>
        </div>
        <div className="toolbar-item-scrub-div">
          <Scrubber />
        </div>
      </div>
    )
  }
}