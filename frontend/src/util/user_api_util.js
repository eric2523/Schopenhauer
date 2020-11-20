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

export const uploadPhoto = (photoForm) => {
  return axios.post("/api/users/uploadPhoto", photoForm, {
    headers: {
      "Content-Type": "multipart/form-data",
    }
  });
}

export const uploadPhotoDB = (payload) => {
  return axios.post("/api/users/uploadPhotoDB", payload) //NEED TO COME BACK WITH CORRECT ROUTE
}

export const getAllUsers = () => {
  return axios.get("/api/users/index");
}