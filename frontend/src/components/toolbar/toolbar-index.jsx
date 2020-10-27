import React from 'react';
import {ToolbarIndexItem} from './toolbar-index-item'

export class ToolbarIndex extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div>
        <ul className="toolb-ul">
          {/* eventually map through all controls and link to actions */}
          <ToolbarIndexItem />
          <ToolbarIndexItem />
          <ToolbarIndexItem />
        </ul>
      </div>
    )
  }
}