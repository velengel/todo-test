<script>
let id = 0
const statusArray = ["todo","doing","done"];

export default {
  data() {
    return {
      newTodo: '',
      hideCompleted: false,
      todos: [
        { id: id++, text: 'Learn HTML', done: false, statusNum: 0 },
        { id: id++, text: 'Learn JavaScript', done: false, statusNum: 1 },
        { id: id++, text: 'Learn Vue', done: false, statusNum: 2 }
      ],
      statusArray: statusArray
    }
  },
  computed: {
    filteredTodos() {
      return this.hideCompleted
        ? this.todos.filter((t) => !t.done)
        : this.todos
    }
  },
  methods: {
    addTodo() {
      this.todos.push({ id: id++, text: this.newTodo, done: false, statusNum: 0 })
      this.newTodo = ''
    },
    removeTodo(todo) {
      this.todos = this.todos.filter((t) => t !== todo)
    },
    progressTodo(todo) {
      if (todo.statusNum < 2) todo.statusNum++;
      else todo.statusNum = 2;
    },
    regressTodo(todo) {
      if (todo.statusNum > 0) todo.statusNum--;
      else todo.statusNum = 0;
    }
  }
}
</script>

<template>
  <form @submit.prevent="addTodo">
    <input v-model="newTodo">
    <button>Add Todo</button>
  </form>
  <ul>
    <li v-for="todo in filteredTodos" :key="todo.id">
      <button @click="regressTodo(todo)">&lt;</button>&nbsp;
      <span :class="{ done: todo.done }">{{ todo.text }}</span>
      <span :class="status">&nbsp;|&nbsp;{{statusArray[todo.statusNum] }}</span>&nbsp;
      <button @click="removeTodo(todo)">X</button>&nbsp;
      <button @click="progressTodo(todo)">&gt;</button>
    </li>
  </ul>
  <button @click="hideCompleted = !hideCompleted">
    {{ hideCompleted ? 'Show all' : 'Hide completed' }}
  </button>
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