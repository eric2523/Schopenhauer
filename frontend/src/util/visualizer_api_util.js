import axios from "axios"

export const uploadVisualizer = (visualizer) => {
  return axios.post("/api/visualizers", visualizer)
}

export const getUserVisualizer = (userId) => {
  return axios.get(`/api/visualizers/?userId=${userId}`)
}

export const updateVisualizer = (visualizer) => {
  return axios.patch("/api/visualizers", visualizer)
}

export const deleteVisualizer = (visualizerId) => {
  return axios.delete("/api/visualizers", visualizerId)
}