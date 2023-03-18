const Todo = require("../model/todo");

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
  console.log(title);
  try {
    const todoItem = new Todo({
      title: title,
    });
    const saveTodo = await todoItem.save();
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
