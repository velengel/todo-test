<script setup lang="ts">
import { computed, onMounted, watch, ref } from "vue";
import type { Todo } from "./common/types";
import {
  removeTodo,
  progressTodo,
  regressTodo,
} from "./common/methods";
import { childTodos } from "./common/data";

// 構文の制限: https://ja.vuejs.org/guide/typescript/composition-api.html#typing-component-props
export interface Props {
  todos: Todo[];
}

const props = defineProps<Props>();
const emits = defineEmits(["syncTodos"]);

onMounted(() => {
  childTodos.value = props.todos;
  console.log(childTodos);
});

watch(childTodos, (newChildTodos) => {
  emits("syncTodos", newChildTodos);
  console.log(newChildTodos);
});

const filteredTodos = computed(() =>
  childTodos.value.filter((t: Todo) => t.status == "done")
);
</script>

<template>
  <ul>
    <li v-for="todo in filteredTodos" :key="todo.id">
      <button @click="regressTodo(todo)">&lt;</button>&nbsp;
      <span :class="{ done: todo.done }">{{ todo.text }}</span>
      <span :class="{ status: todo.status }"
        >&nbsp;|&nbsp;{{ todo.status }}</span
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
}
</style>
