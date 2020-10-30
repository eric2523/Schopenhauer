export const RECEIVE_USER = "RECEIVE_USER";
export const RECEIVE_ALL_USERS = "RECEIVE_ALL_USERS";
// export const FOLLOW_USER = "FOLLOW_USER";
// export const UNFOLLOW_USER = "UNFOLLOW_USER";

const receiveUser = (user) => ({
  type: RECEIVE_USER,
  user
})

const receiveAllUsers = (users) => ({
  type: RECEIVE_ALL_USERS,
  users
})

// const receiveFollow = ()

