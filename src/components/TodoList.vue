<script setup lang="ts">
import { computed, ref, onMounted, watch } from "vue";

let id: number = 0;
const statusArray: string[] = ["todo", "doing", "done"];

interface Todo {
  id: number;
  text: string;
  done: boolean;
  statusNum: number;
}

interface Props {
  todos: Todo[];
}

// data
const newTodo = ref<string>("");
const childTodos = ref([] as Todo[]);

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
  childTodos.value.filter((t: Todo) => t.statusNum == 0)
);

// methods
const addTodo = (): void => {
  childTodos.value.push({
    id: id++,
    text: newTodo.value,
    done: false,
    statusNum: 0,
  });
  newTodo.value = "";
};

const removeTodo = (todo: Todo): void => {
  childTodos.value = childTodos.value.filter((t: Todo) => t !== todo);
};

const progressTodo = (todo: Todo): void => {
  if (todo.statusNum < 2) todo.statusNum++;
  else todo.statusNum = 2;
};

const regressTodo = (todo: Todo): void => {
  if (todo.statusNum > 0) todo.statusNum--;
  else todo.statusNum = 0;
};
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
      <span>&nbsp;|&nbsp;{{ statusArray[todo.statusNum] }}</span
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
