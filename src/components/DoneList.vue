<script>
let id = 0;
const statusArray = ["todo", "doing", "done"];

export default {
  emits: ["syncTodos"],
  props: {
    todos: Array,
  },
  data() {
    return {
      newTodo: "",
      hideCompleted: false,
      childTodos: [],
      statusArray: statusArray,
    };
  },
  mounted() {
    this.childTodos = this.todos;
    console.log(this.childTodos);
  },
  watch: {
    syncTodos(childTodos) {
      this.$emit("syncTodos", this.childTodos);
      console.log(this.todos);
    },
  },
  computed: {
    filteredTodos() {
      return this.childTodos.filter((t) => t.statusNum == 2);
    },
  },
  methods: {
    addTodo() {
      this.childTodos.push({
        id: id++,
        text: this.newTodo,
        done: false,
        statusNum: 0,
      });
      this.newTodo = "";
    },
    removeTodo(todo) {
      this.childTodos = this.childTodos.filter((t) => t !== todo);
    },
    progressTodo(todo) {
      if (todo.statusNum < 2) todo.statusNum++;
      else todo.statusNum = 2;
    },
    regressTodo(todo) {
      if (todo.statusNum > 0) todo.statusNum--;
      else todo.statusNum = 0;
    },
  },
};
</script>

<template>
  <form @submit.prevent="addTodo">
    <input v-model="newTodo" />
    <button>Add Done</button>
  </form>
  <ul>
    <li v-for="todo in filteredTodos" :key="todo.id">
      <button @click="regressTodo(todo)">&lt;</button>&nbsp;
      <span :class="{ done: todo.done }">{{ todo.text }}</span>
      <span :class="status">&nbsp;|&nbsp;{{ statusArray[todo.statusNum] }}</span
      >&nbsp; <button @click="removeTodo(todo)">X</button>&nbsp;
      <button @click="progressTodo(todo)">&gt;</button>
    </li>
  </ul>
</template>

<style>
ul {
  list-style: none;
}

.done {
  text-decoration: line-through;
}

span.status {
  display: block;
  margin-left: 110px;
}
</style>
