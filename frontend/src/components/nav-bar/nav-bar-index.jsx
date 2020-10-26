import React from 'react'
import { NavBarItem } from './nav-bar-item'
import { mainNavPaths } from './nav-paths'

export class NavBarIndex extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    const navPaths = mainNavPaths()
    return(
      <div>
        We are in Nav Bar Index
      </div>
    )
  }
}

