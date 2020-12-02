import { 
  RECEIVE_USER, 
  RECEIVE_ALL_USERS,
  RECEIVE_FOLLOWS,
  RECEIVE_FOLLOWERS
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
      if(action.user._id){
        newState[action.user._id] = action.user;
        newState[action.user._id].id = action.user._id;
      } else {
        newState[action.user.id] = action.user;
      }
      return newState;
    case RECEIVE_ALL_USERS:
      action.users.forEach((user) => {
        // if (!newState[user.id]){
          // if (user.visualizerCount > 0) console.log(user.visualizerCount)
          newState[user.id] = Object.assign({}, newState[user.id], user);
        // }
      })
      return newState;
    case RECEIVE_FOLLOWS:
      newState[action.followerId].follows = action.follows.data;
      return newState;
    case RECEIVE_FOLLOWERS:
      newState[action.userId].followers = action.followers.data;
      return newState;
    default:
      return state;
  }
}