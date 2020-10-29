export const RECEIVE_USER = "RECEIVE_USER";
export const RECEIVE_ALL_USERS = "RECEIVE_ALL_USERS";

const receiveUser = (user) => ({
  type: RECEIVE_USER,
  user
})

const receiveAllUsers = (users) => ({
  type: RECEIVE_ALL_USERS,
  users
})