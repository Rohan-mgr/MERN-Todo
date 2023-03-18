import React, { useState, useEffect } from "react";
import "./App.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { http } from "./config";
import { getAllTodos } from "./utility/utility";
import TodoItem from "./Component/TodoItem/TodoItem";

function App() {
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState([]);

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

  console.log(todos);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await http.post(
      "/add-todo",
      JSON.stringify({ title: title })
    );
    console.log(response);
    setTodos((prevState) => [...prevState, response?.data]);
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
          Add
        </Button>
      </Form>
      {todos.length > 0 ? (
        todos?.map((item) => {
          return <TodoItem title={item.title} />;
        })
      ) : (
        <h1 className="m-4">No Todos in the list</h1>
      )}
    </div>
  );
}

export default App;
