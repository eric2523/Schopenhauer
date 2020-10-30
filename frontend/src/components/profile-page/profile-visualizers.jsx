import React from 'react';
import { connect } from 'react-redux';
import { getVisualizersByUserId } from '../../reducers/selectors/visualizer_selectors';
import { fetchUserVisualizer } from '../../actions/visualizer_actions';
import { VisualizerItem } from './visualizer-item';

const mSTP = (state, ownProps) => {
  return {
    visualizers: getVisualizersByUserId(ownProps.userId, state.entities.visualizers),
  }
}

const mDTP = (dispatch, ownProps) => {
  return {  
    fetchUserVisualizer: () => dispatch(fetchUserVisualizer(ownProps.userId))
  }
}

class ProfileVisualizerIndexComponent extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    const usersVisualizers = this.props.visualizers.length ? 
    this.props.visualizers.map( (visualizer, i) => {
      return <VisualizerItem key={i} visualizer={visualizer}/>
    })
    : [];
    return (
      <ul>
        {usersVisualizers}
      </ul>
    )
  }
}

export const ProfileVisualizerIndex = connect(mSTP, mDTP)(ProfileVisualizerIndexComponent);