import React from 'react'
import {Link} from "react-router-dom"

export const Splash = (props) => {
  return (
    <div className="splash-outer-div">
      <div className="splash-img-overlay">
      </div>
      <div className="splash-title">
        <div className="main-title">
          <h1 className="splash-title">Schopenhauer</h1>
        </div>
        <div className="subtitle">
          <h2 className="splash-subtitle">Re-envision sound</h2>
        </div>
      </div>
      <div className="splash-btn">
        <Link to="/visualizer">
          <button className="ui primary button">
            GET STARTED NOW
          </button>
        </Link>
      </div>
    </div>
  )
}