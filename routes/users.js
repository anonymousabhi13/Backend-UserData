const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/week5", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  avatarUrl: {
    type: String,
  },
});

const User = mongoose.model("user", UserSchema);
module.exports = User;
