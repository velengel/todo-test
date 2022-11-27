<script>
import TodoList from "./TodoList.vue";
let id = 0
export default {
  components: {
    TodoList
  },
  data() {
    return {
      todos: [
        { id: id++, text: "Learn HTML", done: false, statusNum: 0 },
        { id: id++, text: "Learn JavaScript", done: false, statusNum: 1 },
        { id: id++, text: "Learn Vue", done: false, statusNum: 2 },
      ]
    }

  }
}
</script>

<template>
  <TodoList :todos="todos"
    @syncTodos="(changedTodos) => (todos = changedTodos)"
    />
</template>
