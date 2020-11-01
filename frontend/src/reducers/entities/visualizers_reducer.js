import {
  RECEIVE_VISUALIZER,
  RECEIVE_VISUALIZERS,
  DELETE_VISUALIZER,
} from "../../actions/visualizer_actions";
import { parseVisualizerSettings } from "../../util/visualizer_api_util";

export const visualizersReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_VISUALIZERS:
      action.visualizers.forEach((visualizer) => {
        newState[visualizer._id] = parseVisualizerSettings(visualizer);
      });
      return newState;
    case RECEIVE_VISUALIZER:
      newState[action.visualizer._id] = parseVisualizerSettings(
        action.visualizer
      );
      return newState;
    case DELETE_VISUALIZER:
      delete newState[action.visualizerId];
      return newState;
    default:
      return state;
  }
};
