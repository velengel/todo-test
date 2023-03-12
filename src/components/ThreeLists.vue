<script setup lang="ts">
import TodoList from "./TodoList.vue";
import DoingList from "./DoingList.vue";
import DoneList from "./DoneList.vue";
import type { Todo } from "./common/types";
import { ref } from "vue";

let id: number = 0;
const todos = ref<Todo[]>([
  { id: id++, text: "Learn HTML", done: false, status: "todo" },
  { id: id++, text: "Learn JavaScript", done: false, status: "doing" },
  { id: id++, text: "Learn Vue", done: false, status: "done" },
]);
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
