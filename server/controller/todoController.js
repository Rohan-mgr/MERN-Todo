const Todo = require("../model/todo");
const io = require("../socket");

exports.getAllTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find();
    if (!todos) {
      throw new Error("No Todos in the list");
    }
    res.status(200).json({
      message: "Todos fetched Successfully",
      todos: todos,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.saveTodo = async (req, res, next) => {
  const title = req.body.title;
  try {
    const todoItem = new Todo({
      title: title,
    });
    const saveTodo = await todoItem.save();
    io.getIO().emit("posts", { action: "create", todo: saveTodo });
    res
      .status(200)
      .json({ message: "Todo Added Successfully", data: saveTodo });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.deleteTodo = async (req, res, next) => {
  const id = req.params.id;
  try {
    let result = await Todo.findByIdAndRemove(id);
    console.log(result);
    io.getIO().emit("posts", { action: "delete", deletedTodoId: id });
    res.status(200).json({ message: "Todo deleted Successfully" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.editTodo = async (req, res, next) => {
  const id = req.params.id;
  const updatedTitle = req.body.title;
  try {
    const existingTodo = await Todo.findById(id);
    if (!existingTodo) {
      const err = new Error("Todo Item not found");
      err.statusCode = 404;
      throw err;
    }
    existingTodo.title = updatedTitle;
    const updatedTodo = await existingTodo.save();
    io.getIO().emit("posts", { action: "update", post: updatedTodo });

    res
      .status(200)
      .json({ message: "Todo Updated Successfully", Todo: updatedTodo });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
