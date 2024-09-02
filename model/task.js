const mongoose = require("mongoose");
const commentSchema = mongoose.Schema({
  commenter: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
  },
});

const taskSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
  team: {
    type: String,
    required: true,
  },
  assignees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  dueDate: {
    type: Date,
    required: true,
  },
  stage: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
  },
  comments: [commentSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Task", taskSchema);
