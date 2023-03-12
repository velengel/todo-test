import type { Todo } from "./types";
import { childTodos } from "./data";

export const removeTodo = (todo: Todo): void => {
  childTodos.value = childTodos.value.filter((t: Todo) => t !== todo);
};

export const progressTodo = (todo: Todo): void => {
  switch (todo.status) {
    case "todo":
      todo.status = "doing";
      break;
    case "doing":
      todo.status = "done";
      break;
    case "done":
      break;
  }
};

export const regressTodo = (todo: Todo): void => {
  switch (todo.status) {
    case "todo":
      break;
    case "doing":
      todo.status = "todo";
      break;
    case "done":
      todo.status = "doing";
      break;
  }
};
