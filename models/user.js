const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  email: String,
  emailToken: String,
  emailVerified: Boolean,
  admin: Boolean,
  google: {
    id: String
  },
  enabled: {
    type: Boolean,
    default: true
  }
});

const Users = mongoose.model('user', userSchema);

module.exports = Users;
