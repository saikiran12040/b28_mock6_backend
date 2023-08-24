const { Schema, model } = require("mongoose");

const stringType = { required: true, type: String };
const numberType = { required: true, type: Number };
// Default avatar URL for dummy images
const defaultAvatar = "https://us.123rf.com/450wm/mindsparx/mindsparx2303/mindsparx230346440/200771790-3d-illustration-portrait-of-a-beautiful-girl-in-neon-light.jpg?ver=6";

const userSchema = new Schema(
  {
    username: stringType,
    avatar: { ...stringType, default: defaultAvatar },
    email: stringType,
    password: stringType,
  },
  {
    versionKey: false,
  }
);

const userModel = model("user", userSchema);

module.exports = { userModel };
