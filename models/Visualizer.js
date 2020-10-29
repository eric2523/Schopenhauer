const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VisualizerSchema = new Schema(
  {
    name: {
      type: String,
    },
    type: {
      type: String,
    },
    typeSettings: {
      type: String,
    },
    generalSettings: {
      type: String,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    songId: {
      type: Schema.Types.ObjectId,
      ref: "Song",
    },
  },
  { timestamps: true }
);

const Visualizer = mongoose.model("visualizers", VisualizerSchema);
module.exports = Visualizer;
