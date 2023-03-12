<script setup lang="ts">
import { computed, onMounted, watch, ref } from "vue";
import type { Todo } from "./common/types";
import { removeTodo, progressTodo } from "./common/methods";
import { childTodos } from "./common/data";

export interface Props {
  todos: Todo[];
}

const newTodo = ref<string>("");
const props = defineProps<Props>();
const emits = defineEmits(["syncTodos"]);
let id: number = 0;

onMounted(() => {
  childTodos.value = props.todos;
  console.log(childTodos);
});

watch(childTodos, (newChildTodos) => {
  emits("syncTodos", newChildTodos);
  console.log(newChildTodos);
});

const filteredTodos = computed(() =>
  childTodos.value.filter((t: Todo) => t.status == "todo")
);

const addTodo = (): void => {
  childTodos.value.push({
    id: id++,
    text: newTodo.value,
    done: false,
    status: "todo",
  });
  newTodo.value = "";
};

</script>

<template>
  <p class="text-h2 text-center">Todo</p>
  <v-form @submit.prevent="addTodo">
    <v-text-field v-model="newTodo" label="input new todo item" />
    <v-btn block type="submit" color="purple">
      Add Todo
      <v-icon end icon="mdi-note-plus"></v-icon>
    </v-btn>

  </v-form>
  <v-list lines="one" class="my-4">
    <v-list-item v-for="todo in filteredTodos" :key="todo.id" class="my-4">
      <v-card>
        <v-toolbar color="rgba(0, 0, 0, 0)" theme="dark">
          <template v-slot:append>
            <v-btn icon="mdi-close" @click="removeTodo(todo)"></v-btn>
          </template>
        </v-toolbar>
        <v-card-text class="text-h5 text-center">{{ todo.text }}</v-card-text>
        <v-card-actions class="justify-space-between">
          <v-btn icon="mdi-chevron-left-box" disabled></v-btn>
          <v-btn
            icon="mdi-chevron-right-box"
            @click="progressTodo(todo)"
            class="align:right"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-list-item>
</v-list>
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
