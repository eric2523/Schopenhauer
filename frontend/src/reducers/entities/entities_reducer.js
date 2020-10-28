import { SongReducer } from "./song_reducer";
import { combineReducers } from "redux";

export const EntitiesReducer = combineReducers({
  song: SongReducer,
});
