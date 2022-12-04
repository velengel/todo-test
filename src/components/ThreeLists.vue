<script>
import TodoList from "./TodoList.vue";
import DoingList from "./DoingList.vue";
import DoneList from "./DoneList.vue";

let id = 0;
export default {
  components: {
    TodoList,
    DoingList,
    DoneList,
  },
  data() {
    return {
      todos: [
        { id: id++, text: "Learn HTML", done: false, statusNum: 0 },
        { id: id++, text: "Learn JavaScript", done: false, statusNum: 1 },
        { id: id++, text: "Learn Vue", done: false, statusNum: 2 },
      ],
    };
  },
};
</script>

<template>
  <TodoList
    :todos="todos"
    @syncTodos="(changedTodos) => (todos = changedTodos)"
  />
  <DoingList
    :todos="todos"
    @syncTodos="(changedTodos) => (todos = changedTodos)"
  />
  <DoneList
    :todos="todos"
    @syncTodos="(changedTodos) => (todos = changedTodos)"
  />
</template>
