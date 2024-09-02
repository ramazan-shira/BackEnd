const express = require("express");

const router = express.Router();

const userController = require("../controller/userController");

router.get("/users", userController.getAllUsers);
router.post("/users", userController.createUser);
router.put("/users/:id", userController.updateUser);
router.post("/users/login", userController.logIn);
router.delete("/users/:id", userController.deleteUser);
router.put("/users/profile/:id", userController.updateProfile);
router.post("/users/addUser", userController.addUser);

module.exports = router;
