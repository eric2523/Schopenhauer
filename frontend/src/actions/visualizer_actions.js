import * as VisualizerAPIUtil from "../util/visualizer_api_util"
export const RECEIVE_VISUALIZER = "RECEIVE_VISUALIZER";
export const RECEIVE_VISUALIZERS = "RECEIVE_VISUALIZERS";
export const DELETE_VISUALIZER = "DELETE_VISUALIZER";

const receiveVisualizer = (visualizer) => ({
  type: RECEIVE_VISUALIZER,
  visualizer
})

const receiveVisualizers = (visualizers) => ({
  type: RECEIVE_VISUALIZERS,
  visualizers
})

const removeVisualizer = (visualizerId) => ({
  type: DELETE_VISUALIZER,
  visualizerId
})

// tested and working 
export const fetchUserVisualizer = (userId) => {
  return (dispatch) => {
    return VisualizerAPIUtil.getUserVisualizer(userId)
      .then((res) => {
        let visualizers = Object.values(res.data)
        return dispatch(receiveVisualizers(visualizers))
      })
  }
}
// tested and working
export const updateVisualizer = (visualizer) => {
  return (dispatch) => {
    return VisualizerAPIUtil.updateVisualizer(visualizer)
      .then((res) => {
        return dispatch(receiveVisualizer(res.data))
      })
  }
}
// tested and working
export const uploadVisualizer = (visualizer) => {
  return (dispatch) => {
    return VisualizerAPIUtil.uploadVisualizer(visualizer)
      .then((res) => {
        return dispatch(receiveVisualizer(res.data))
      })
  }
}
// tested and working 
export const deleteVisualizer = (visualizerId) => {
  return (dispatch) => {
    return VisualizerAPIUtil.deleteVisualizer(visualizerId)
      .then(() => dispatch(removeVisualizer(visualizerId)))
  }
}