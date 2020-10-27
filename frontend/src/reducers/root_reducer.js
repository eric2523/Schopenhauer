import { combineReducers } from 'redux';
import { ErrorsReducer } from './errors_reducer';
import { SessionReducer } from './session_reducer';
import { UiReducer } from './ui/ui_reducer';

export const rootReducer = combineReducers({
  session: SessionReducer,
  errors: ErrorsReducer,
  ui: UiReducer
})