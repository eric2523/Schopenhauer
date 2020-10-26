import { combineReducers } from "redux";
import { ErrorsReducer } from "./errors_reducer";
import { SessionReducer } from "./session_reducer";

export const rootReducer = combineReducers({
  session: SessionReducer,
  errors: ErrorsReducer
})