const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SongSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  date: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
  },
  songUrl: {
    type: String,
    required: true
  },
  fileName: {
    type: String,
    required: true
  }
});

const Song = mongoose.model("songs", SongSchema);
module.exports = Song;