import {
  BarVisualizer,
  defaultBarsSettings,
} from "../components/visualizers/visualizer_templates/basic_bar_visualizer";
import {
  defaultFrequencySettings,
  FrequencyVisualizer,
} from "../components/visualizers/visualizer_templates/basic_frequency_visualizer";
import {
  defaultRingSettings,
  RingVisualizer,
} from "../components/visualizers/visualizer_templates/basic_ring_visualizer";
import {
  defaultSphereSettings,
  SphereVisualizer,
} from "../components/visualizers/visualizer_templates/basic_sphere_visualizer";
import {
  defaultSquareSettings,
  SquareVisualizer,
} from "../components/visualizers/visualizer_templates/basic_square_visualizer";

export const visualizerConstructors = {
  frequency: {
    defaultSettings: defaultFrequencySettings,
    constructor: FrequencyVisualizer,
  },
  sphere: {
    defaultSettings: defaultSphereSettings,
    constructor: SphereVisualizer,
  },

  bars: {
    defaultSettings: defaultBarsSettings,
    constructor: BarVisualizer,
  },
  square: {
    defaultSettings: defaultSquareSettings,
    constructor: SquareVisualizer,
  },
  ring: {
    defaultSettings: defaultRingSettings,
    constructor: RingVisualizer,
  },
};
