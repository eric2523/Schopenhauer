export const getVisualizersByUserId = (userId, visualizers) => {
  let res = [];
  for (let i in visualizers){
    let visualizer = visualizers[i];
    if (visualizer.userId === userId){
      res.push(visualizer);
    }
  }
  return res;
}