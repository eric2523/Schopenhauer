import axios from 'axios';

export const uploadSong = (song) => {
  return axios.post('/api/songs', song, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}

export const deleteSong = (songId) => {
  return axios.delete(`api/songs/${songId}`);
}