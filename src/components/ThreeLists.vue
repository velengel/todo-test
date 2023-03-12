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
  <v-container class="bg-surface-variant w-100">
    <v-row>
      <v-col class="ma-2 pa-2">
          <!-- <v-sheet class="ma-2 pa-2">
            <h1>Todo List</h1>
          </v-sheet> -->
        <TodoList
          :todos="todos"
          @syncTodos="(changedTodos) => (todos = changedTodos)"
        />
      </v-col>

      <v-col class="ma-2 pa-2">
        <!-- <v-sheet class="ma-2 pa-2">
          <h1>Doing List</h1>
        </v-sheet> -->
        <DoingList
          :todos="todos"
          @syncTodos="(changedTodos) => (todos = changedTodos)"
        />
      </v-col>

      <v-col class="ma-2 pa-2">
        <!-- <v-sheet class="ma-2 pa-2">
          <h1>Done List</h1>
        </v-sheet> -->
        <DoneList
          :todos="todos"
          @syncTodos="(changedTodos) => (todos = changedTodos)"
        />
      </v-col>
    </v-row>

  </v-container>
  <!-- <v-container class="bg-surface-variant">
    <v-row no-gutters>
      <v-col
        v-for="n in 3"
        :key="n"
        cols="12"
        sm="4"
      >
        <v-sheet class="ma-2 pa-2">
          One of three columns
        </v-sheet>
      </v-col>
    </v-row>
  </v-container> -->
</template>
