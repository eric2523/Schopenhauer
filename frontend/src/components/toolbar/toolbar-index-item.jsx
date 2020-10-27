import React from 'react'

export class ToolbarIndexItem extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <li className="toolbar-item">
        <i className="fas fa-snowflake"></i>
      </li>
    )
  }
}