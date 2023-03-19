const express = require("express");
const router = express.Router();
const todoController = require("../controller/todoController");

router.get("/", todoController.getAllTodos);
router.post("/add-todo", todoController.saveTodo);
router.delete("/delete/:id", todoController.deleteTodo);
router.put("/edit/:id", todoController.editTodo);
module.exports = router;
