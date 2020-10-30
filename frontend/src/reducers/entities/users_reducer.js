import { 
  RECEIVE_USER, 
  RECEIVE_ALL_USERS,
} from "../../actions/user_actions";
import { RECEIVE_CURRENT_USER } from "../../actions/session_actions";

export const usersReducer = (state = {}, action) => {
  Object.freeze(state)
  let newState = Object.assign({}, state)
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      newState[action.currentUser.id] = action.currentUser;
      return newState;
    case RECEIVE_USER:
      newState[action.user.id] = action.user
    case RECEIVE_ALL_USERS:
      return action.users
    default:
      return state;
  }
}