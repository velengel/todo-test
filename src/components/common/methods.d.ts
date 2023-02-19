export const addTodo = (): void => {
  childTodos.value.push({
    id: id++,
    text: newTodo.value,
    done: false,
    statusNum: 0,
  });
  newTodo.value = "";
};

export const removeTodo = (todo: Todo): void => {
  childTodos.value = childTodos.value.filter((t: Todo) => t !== todo);
};

export const progressTodo = (todo: Todo): void => {
  if (todo.statusNum < 2) todo.statusNum++;
  else todo.statusNum = 2;
};

export const regressTodo = (todo: Todo): void => {
  if (todo.statusNum > 0) todo.statusNum--;
  else todo.statusNum = 0;
};
