const { Schema, model } = require("mongoose");

const stringType = { required: true, type: String };
const numberType = { required: true, type: Number };

const blogsSchema = new Schema(
  {
    id: { type: Number, required: true },
    username: stringType,
    title: stringType,
    content: stringType,
    category: stringType, 
    date: { default: Date.now, type: Date }, 
    likes: numberType,
    userId: stringType,
    comments: [
      {
        username: stringType,
        content: stringType,
      },
    ],
  },
  { versionKey: false }
);

const blogsModel = model("blog", blogsSchema);

module.exports = { blogsModel };
