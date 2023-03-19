import React, { useState, useEffect } from "react";
import "./App.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { http } from "./config";
import { getAllTodos, editTodo } from "./utility/utility";
import TodoItem from "./Component/TodoItem/TodoItem";

function App() {
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await getAllTodos();
        setTodos(response?.todos);
      } catch (e) {
        throw new Error(e);
      }
    };
    fetchTodos();
  }, []);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const onEditTodo = async (id, title) => {
    setSelectedTodo(id);
    setTitle(title);
    setIsEditing(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response;
    if (isEditing) {
      try {
        response = await editTodo(selectedTodo, title);
        if (!response) {
          throw new Error("Updating Todo Failed");
        }
        const updatedTodoIndex = todos.findIndex(
          (todo) => todo?._id === selectedTodo
        );
        todos[updatedTodoIndex] = response?.Todo;
        setIsEditing(false);
      } catch (e) {
        throw new Error(e);
      }
    } else {
      response = await http.post("/add-todo", JSON.stringify({ title: title }));
      setTodos((prevState) => [...prevState, response?.data]);
      console.log("adding");
    }
    console.log(response);
    setTitle("");
  };

  return (
    <div className="App">
      <h1>Todo App</h1>
      <Form className="col-6 text-center" onSubmit={(e) => handleSubmit(e)}>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            name="title"
            placeholder="Enter Title"
            onChange={(e) => handleTitleChange(e)}
            value={title}
            required
          />
        </Form.Group>
        <Button variant="success" type="submit">
          {isEditing ? "Update" : "Add"}
        </Button>
      </Form>
      {todos.length > 0 ? (
        todos?.map((item) => {
          return (
            <TodoItem
              key={item?._id}
              title={item?.title}
              Id={item?._id}
              Todos={todos}
              SetTitle={setTitle}
              SetTodos={setTodos}
              SetEditing={setIsEditing}
              EditTodo={() => onEditTodo(item?._id, item?.title)}
            />
          );
        })
      ) : (
        <h1 className="m-4">No Todos in the list</h1>
      )}
    </div>
  );
}

export default App;
