const express = require("express");
const router = express.Router();
const todoController = require("../controller/todoController");

router.get("/", todoController.getAllTodos);
router.post("/add-todo", todoController.saveTodo);
module.exports = router;
