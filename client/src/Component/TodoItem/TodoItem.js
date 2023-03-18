import React from "react";

import Button from "../Button/Button";
import "./TodoItem.css";

const TodoItem = (props) => (
  <article className="post">
    <header className="post__header">
      <h1 className="post__title">{props.title}</h1>
    </header>
    <div className="post__actions">
      <Button mode="flat" onClick={props.onStartEdit}>
        Edit
      </Button>
      <Button mode="flat" design="danger" onClick={props.onDelete}>
        Delete
      </Button>
    </div>
  </article>
);

export default TodoItem;
