import React from 'react'
import { VisualizerItemContainer } from '../visualizers/visualizer'
import { defaultFrequencySettings } from '../visualizers/basic_frequency_visualizer'

export const TemplatesIndex = (props) => {
  return (
    <div>
      <VisualizerItemContainer visualizerSettings={defaultFrequencySettings}/>
    </div>
  )
}