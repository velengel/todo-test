<script setup lang="ts">
import { computed, onMounted, watch } from "vue";
import type { Todo } from "./common/types";
import {
  addTodo,
  removeTodo,
  progressTodo,
  regressTodo,
} from "./common/methods";
import { newTodo, childTodos } from "./common/data";

export interface Props {
  todos: Todo[];
}

const props = defineProps<Props>();
const emits = defineEmits(["syncTodos"]);

// mounted
onMounted(() => {
  childTodos.value = props.todos;
  console.log(childTodos);
});

// watch
watch(childTodos, (newChildTodos) => {
  emits("syncTodos", newChildTodos);
  console.log(newChildTodos);
});

// computed
const filteredTodos = computed(() =>
  childTodos.value.filter((t: Todo) => t.status == "todo")
);

</script>

<template>
  <form @submit.prevent="addTodo">
    <input v-model="newTodo" />
    <button>Add Todo</button>
  </form>
  <ul>
    <li v-for="todo in filteredTodos" :key="todo.id">
      <!-- <button @click="regressTodo(todo)">&lt;</button>&nbsp; -->
      <v-btn
        prepend-icon="mdi-vuetify"
        variant="outlined"
        @click="regressTodo(todo)"
        >&lt;</v-btn
      >
      <span :class="{ done: todo.done }">{{ todo.text }}</span>
      <span :class="{ status: todo.status }"
        >&nbsp;|&nbsp;{{ todo.status }}</span
      >&nbsp;
      <button @click="removeTodo(todo)">X</button>
      &nbsp;
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
