import React from "react";
import { CanvasWithRouter } from "./canvas";
import { ToolbarIndex } from "../toolbar/toolbar-index";
import { Scrubber } from "../toolbar/scrubber";
import { testVisualizer } from "./test_visualizer_object";
import { SongToolBar } from '../music_player/song_tool_bar';
import { connect } from 'react-redux';

const mSTP = (state) => {
  return {
    currentSong: state.session.song,
    // id: state.session.song ? state.session.song.id : null
  }
}

export const VisualizerComponent = (props) => {
  if(!props.currentSong){
    
    return null;
  }
  
  return (
    <div className="viz-outer-div">
      {/* <div className="viz-toolb-div">
        <ToolbarIndex />
      </div> */}
      <div className="visualizer">
        <div className="canvas-main-div">
          <div className="canvas-div">
            <CanvasWithRouter
              canvasWidth={700}
              canvasHeight={700}
              visualizer={testVisualizer}
              song={props.currentSong}
              // id={props.id}
            />
          </div>
        </div>
        <SongToolBar />
      </div>
    </div>
  );
};

export const Visualizer = connect(mSTP, null)(VisualizerComponent);