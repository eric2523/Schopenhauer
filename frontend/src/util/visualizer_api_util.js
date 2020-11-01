import axios from "axios";

// works
export const uploadVisualizer = (visualizer) => {
  return axios.post("/api/visualizers", visualizer);
};
// works
export const getUserVisualizer = (userId) => {
  return axios.get(`/api/visualizers/?userId=${userId}`);
};

export const updateVisualizer = (visualizer) => {
  return axios.patch("/api/visualizers", visualizer);
};

// works
export const deleteVisualizer = (visualizerId) => {
  return axios.delete(`/api/visualizers/?id=${visualizerId}`);
};

export const prepSettings = function (visualizerSettings, userId) {
  const stringifiedSettings = Object.assign({}, visualizerSettings);
  stringifiedSettings.generalSettings = JSON.stringify(
    visualizerSettings.generalSettings
  );
  stringifiedSettings.typeSettings = JSON.stringify(
    visualizerSettings.typeSettings
  );

  stringifiedSettings.userId = userId;
  return stringifiedSettings;
};

export const parseVisualizerSettings = function (visualizerSettings) {
  const parsedSettings = Object.assign({}, visualizerSettings);
  parsedSettings.generalSettings = JSON.parse(
    visualizerSettings.generalSettings
  );
  parsedSettings.typeSettings = JSON.parse(visualizerSettings.typeSettings);
  return parsedSettings;
};
