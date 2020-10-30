export const getVisualizersByUserId = (userId, visualizers) => {
  let res = [];
  for (let i in visualizers){
    let visualizer = visualizers[i];
    
    // visualizer.generalSettings = JSON.parse(visualizer.generalSettings);
    // visualizer.typeSettings = JSON.parse(visualizer.typeSettings)
    if (visualizer.userId === userId){
      res.push(visualizer);
    }
  }
  return res;
}