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
  defaultVortexSettings,
  VortexVisualizer,
} from "../components/visualizers/visualizer_templates/basic_vortex_visualizer";

export const visualizerConstructors = {
  frequency: {
    defaultSettings: defaultFrequencySettings,
    TypeConstructor: FrequencyVisualizer,
  },
  sphere: {
    defaultSettings: defaultSphereSettings,
    TypeConstructor: SphereVisualizer,
  },

  bars: {
    defaultSettings: defaultBarsSettings,
    TypeConstructor: BarVisualizer,
  },
  vortex: {
    defaultSettings: defaultVortexSettings,
    TypeConstructor: VortexVisualizer,
  },
  ring: {
    defaultSettings: defaultRingSettings,
    TypeConstructor: RingVisualizer,
  },
};

export const selectAllVisualizerTypes = Object.keys(visualizerConstructors);

