const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      default: "Anonymous Dreamer"
    },
    followers: [{type: mongoose.Types.ObjectId, ref: 'User'}],
    follows: [{type: mongoose.Types.ObjectId, ref: 'User'}],
    visualizers: [{type: mongoose.Types.ObjectId, ref: 'Visualizer'}]
  },
  {
    timestamps: true,
  }
);

module.exports = User = mongoose.model("User", UserSchema);
