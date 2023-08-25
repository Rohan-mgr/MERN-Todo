import React from "react";

import Button from "../Button/Button";
import "./TodoItem.css";
import { deleteTodo } from "../../utility/utility";

const TodoItem = (props) => {
  const onDeleteTodo = async (id) => {
    try {
      await deleteTodo(id);
    } catch (e) {
      throw new Error(e);
    }
  };

  return (
    <article className="post">
      <header className="post__header">
        <h1 className="post__title">{props.title}</h1>
      </header>
      <div className="post__actions">
        <Button mode="flat" onClick={props.EditTodo}>
          Edit
        </Button>
        <Button
          mode="flat"
          design="danger"
          onClick={() => onDeleteTodo(props.Id)}
        >
          Delete
        </Button>
      </div>
    </article>
  );
};

export default TodoItem;
