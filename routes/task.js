
const express = require("express");
const router = express.Router();
const {getAllTasks, addTask, updateTask, deleteTask, getUserTasks, getTaskById} = require("../controllers/task");
const jwtAuthMiddleware = require("../middlewares/jwtAuth");

router.use( jwtAuthMiddleware);
// router.get("/all-tasks",   getAllTasks);

router.get("/task/:id", getTaskById);

router.get("/user-tasks", getUserTasks);

router.post("/add-task", addTask);

router.put('/update-task/:id', updateTask);

router.delete("/delete-task/:id", deleteTask);

module.exports = router;