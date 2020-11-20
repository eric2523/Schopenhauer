import * as UserAPIUtil from '../util/user_api_util'
import { fetchUserVisualizer } from './visualizer_actions';

export const RECEIVE_USER = "RECEIVE_USER";
export const RECEIVE_ALL_USERS = "RECEIVE_ALL_USERS";
export const RECEIVE_FOLLOWS = "RECEIVE_FOLLOWS";
export const RECEIVE_FOLLOWERS = "RECEIVE_FOLLOWERS";
export const RECEIVE_USER_ERROR = "RECEIVE_USER_ERROR"

export const receiveUser = (user) => ({
  type: RECEIVE_USER,
  user
})

const receiveAllUsers = (users) => ({
  type: RECEIVE_ALL_USERS,
  users
})

const receiveFollows = (followerId, follows) => ({
  type: RECEIVE_FOLLOWS,
  followerId,
  follows 
})

const receiveFollowers = (userId, followers) => {
  return {
    type: RECEIVE_FOLLOWERS,
    userId,
    followers
  }
}


const receiveUserError = (err) => ({
  type: RECEIVE_USER_ERROR,
  err
})

export const followUser = (followerId, followedId) => (dispatch) => {
  const payload = {
    followerId: followerId,
    followedId: followedId
  }
  return UserAPIUtil.followUser(payload)
    .then((followersFollows) => {
      UserAPIUtil.getFollowers(followedId)
        .then(
          followers => {
            dispatch(receiveFollows(followerId, followersFollows));
            dispatch(receiveFollowers(followedId, followers));
          }
        )
    })
    .catch(err => receiveUserError(err));
}

export const unfollowUser = (followerId, followedId) => (dispatch) => {
  const payload = {
    followerId: followerId,
    followedId: followedId
  }
  return UserAPIUtil.unfollowUser(payload)
    .then((followersFollows) => {
      UserAPIUtil.getFollowers(followedId)
        .then(
          followers => {
            dispatch(receiveFollows(followerId, followersFollows));
            dispatch(receiveFollowers(followedId, followers));
          }
        )
    })
    .catch(err => receiveUserError(err));
}

export const getUser = (id) => (dispatch) => {
  return UserAPIUtil.getUser(id)
    .then(
      user => dispatch(receiveUser(user.data)),
      err => dispatch(receiveUserError(err))
    )
}

export const getUserAndVisualizers = (id) => (dispatch) => {
  dispatch(getUser(id));
  return fetchUserVisualizer(id)(dispatch);
}

export const updatePhoto = (imageFile, metaData) => (dispatch) => {
  return UserAPIUtil.uploadPhoto(imageFile)
    .then((payload) => {
      const DBEntry = {
        photoUrl: payload.data.photoUrl
      };
      return UserAPIUtil.uploadPhotoDB(
        Object.assign({}, DBEntry, metaData)
      ).then(
        (user) => dispatch(receiveUser(user.data)),
        (err) => dispatch(receiveUserError(err))
      )
    },
    (err) => dispatch(receiveUserError(err))  
  )
}