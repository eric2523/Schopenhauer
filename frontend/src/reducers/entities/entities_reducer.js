import { SongReducer } from "./song_reducer";
import { combineReducers } from "redux";
import { usersReducer } from "./users_reducer";
import { visualizersReducer } from "./visualizers_reducer";

export const EntitiesReducer = combineReducers({
  song: SongReducer,
  users: usersReducer,
  visualizers: visualizersReducer
});
