import axios from "axios";

export const uploadSong = (song) => {
  return axios.post("/api/songs/uploadSong", song, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const uploadSongDB = (payload) => {
  return axios.post("/api/songs/uploadSongDB", payload);
};

export const deleteSong = (songId) => {
  return axios.delete(`/api/songs/${songId}`);
};

export const getSongs = (userId) => {
  return axios.get(`/api/songs/users/?userId=${userId}`)
};