// const task = require("../model/task");
const Task = require("../model/task");

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.send(tasks);
  } catch (error) {
    res.send(error);
  }
};

exports.createTask = async (req, res) => {
  try {
    const {
      title,
      content,
      team,
      assignee,
      dueDate,
      stage,
      priority,
      createdAt,
      createdBy,
    } = req.body;

    if (!title || !team || !assignee || !dueDate || !stage) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    const task = new Task({
      title,
      content,
      team,
      assignee,
      dueDate,
      stage,
      priority,
      createdAt: createdAt || Date.now(),
      createdBy,
    });

    await task.save();

    res.status(201).json(task);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Server error. Could not create task." });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { title, content, team, assignees, dueDate, stage, priority } =
      req.body;
    const taskId = req.params.id;
    const task = await Task.findByIdAndUpdate(
      taskId,
      {
        title,
        content,
        team,
        assignees,
        dueDate,
        stage,
        priority,
      },
      { new: true }
    );

    if (!task) {
      return res.send({ message: "Task not found!", type: "error" });
    } else {
      return res.status(200).send({
        message: "Task updated successfully!",
        task: {
          title,
          content,
          team,
          assignees,
          dueDate,
          _id: taskId,
          stage,
          priority,
        },
      });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "An error occurred!", type: "error", error });
    console.log(error);
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findByIdAndDelete(taskId);

    if (!task) {
      res.status(404).send({ message: "Task not found!", type: "error" });
    } else {
      res.status(200).send({ message: "Task deleted successfully" });
    }
  } catch (error) {
    res.send(error);
  }
};

exports.addCommentToTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { text, commenter, date } = req.body;

    const task = await Task.findById(taskId);

    if (!task) {
      return res
        .status(404)
        .send({ message: "Task not found!", type: "error" });
    }

    task.comments.push({ text, commenter, date });

    await task.save();

    res.status(200).send({
      message: "Comment added successfully",
      comment: { text, commenter, date },
    });
  } catch (error) {
    console.error("Error adding comment:", error);
    return res.status(500).send({ message: "Error adding comment!", error });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const taskId = req.params.id;
    const commentId = req.params.commentId;

    const task = await Task.findById(taskId);

    if (!task) {
      return res
        .status(404)
        .send({ message: "Task not found!", type: "error" });
    }

    task.comments = task.comments.filter(
      (comment) => comment._id.toString() !== commentId
    );

    await task.save();

    res.status(200).send({
      message: "Comment deleted successfully",
      commentId,
    });
  } catch (error) {
    console.error("Error deleting comment:", error);
    return res.status(500).send({ message: "Error deleting comment!", error });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const taskId = req.params.id;
    const commentId = req.params.commentId;
    const { text, date } = req.body;

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).send({ message: "Task not found", type: "error" });
    }

    const commentUpdated = task.comments.map((comment) => {
      if (comment._id.toString() === commentId) {
        return {
          ...comment,
          text: text,
          date: date,
        };
      }
      return comment;
    });

    task.comments = commentUpdated;

    await task.save();

    const updatedComment = task.comments.find(
      (comment) => comment._id.toString() === commentId
    );

    res.status(200).send({
      message: "Comment updated successfully",
      comment: {
        commentId: updatedComment._id,
        text: updatedComment.text,
        date: updatedComment.date,
      },
    });
  } catch (error) {
    res.status(500).send({ message: "An error occurred", type: "error" });
  }
};
