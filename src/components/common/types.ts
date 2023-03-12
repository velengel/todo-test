export interface Todo {
  id: number;
  text: string;
  done: boolean;
  status: TodoStatus;
}

export type TodoStatus = "todo" | "doing" | "done";
