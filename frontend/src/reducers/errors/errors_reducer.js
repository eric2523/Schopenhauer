import { combineReducers } from "redux";

import { SessionErrorsReducer } from "./session_errors_reducer";
import { SongErrorsReducer } from "./song_errors";

export const ErrorsReducer = combineReducers({
  session: SessionErrorsReducer,
  song: SongErrorsReducer,
});
