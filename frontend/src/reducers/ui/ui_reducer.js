import { ModalReducer } from "./modal_reducer";
import { combineReducers } from "redux";

export const UiReducer = combineReducers({
  modal: ModalReducer,
});
