export class VisualizerSettings {
  constructor() {
    this.settings = {
      typeSettings: { binCount: 1024 },
      generalSettings: {
        //for canvas settings

        centerX: 350,
        centerY: 350,

        //for any bar
        barWidth: 1,

        //for any circular object
        radius: 0,

        // finished controls
        heightAmplifier: 0.5,
      },
    };
  }
}
