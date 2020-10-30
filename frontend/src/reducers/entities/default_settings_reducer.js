import { defaultFrequencySettings } from "../../components/visualizers/basic_frequency_visualizer";
import { defaultSphereSettings } from "../../components/visualizers/nate_visualizer_1";

const defaultSettings = {
  frequencySettings: defaultFrequencySettings,
  sphereSettings: defaultSphereSettings
}

export const defaultSettingsReducer = (state=defaultSettings, action) => {
  switch(action.type){
    default:
    return state
  }
}