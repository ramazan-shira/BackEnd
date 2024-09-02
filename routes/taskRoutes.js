const express = require("express");

const router = express.Router();

const taskController = require("../controller/taskController");

router.get("/tasks", taskController.getAllTasks);
router.post("/tasks", taskController.createTask);
router.put("/tasks/:id", taskController.updateTask);
router.delete("/tasks/:id", taskController.deleteTask);
router.post("/tasks/:id/comments", taskController.addCommentToTask);
router.delete("/tasks/:id/comments/:commentId", taskController.deleteComment);
router.put("/tasks/:id/comments/:commentId", taskController.updateComment);

module.exports = router;
