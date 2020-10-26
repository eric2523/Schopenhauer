const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User model
// Email / pw = the usual

const UserSchema = new Schema({
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  }, {
    timestamps: true
  })

  module.exports = User = mongoose.model('User', UserSchema);
