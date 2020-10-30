import axios from "axios"

// works 
export const uploadVisualizer = (visualizer) => {
  return axios.post("/api/visualizers", visualizer)
}
// works 
export const getUserVisualizer = (userId) => {
  return axios.get(`/api/visualizers/?userId=${userId}`)
}

export const updateVisualizer = (visualizer) => {
  return axios.patch("/api/visualizers", visualizer)
}

// works 
export const deleteVisualizer = (visualizerId) => {
  return axios.delete(`/api/visualizers/?id=${visualizerId}`)
}