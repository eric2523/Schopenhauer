import axios from "axios";

export const followUser = (payload) => {
  return axios.post("/api/users/follow", payload);
}

export const unfollowUser = (payload) => {
  return axios.post("/api/users/unfollow", payload);
}

export const getUser = (id) => {
  return axios.get(`/api/users/?id=${id}`);
}

export const getFollows = (followerId) => {
  return axios.get(`/api/users/follows/?followerId=${followerId}`)
}

export const getFollowers = (userId) => {
  return axios.get(`/api/users/followers/?userId=${userId}`)
}