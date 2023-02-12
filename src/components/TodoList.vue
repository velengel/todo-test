<script setup lang="ts">
import { watch } from 'fs';
import { computed, ref, onMounted } from 'vue';

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

const props = defineProps<Props>();
const emits = defineEmits(["syncTodos"]);

// data
const newTodo = ref<string>("");
const hideCompleted = ref(false);
const childTodos = ref([] as Todo[]);

// mounted
onMounted(() => {
  childTodos.value = props.todos;
  console.log(childTodos);
})

// watch
watch(childTodos, (childTodos) => {

})

// computed
const filteredTodos = computed(() => childTodos.value.filter((t: Todo) => t.statusNum == 0))

// methods




// export default defineComponent({
//   emits: ["syncTodos"],
//   props: {
//     todos: [] as Todo[],
//   },
//   data() {
//     return {
//       newTodo: "" as string,
//       hideCompleted: false,
//       childTodos: [] as Todo[],
//       statusArray: statusArray,
//     };
//   },
//   mounted() {
//     this.childTodos = this.todos;
//     console.log(this.childTodos);
//   },
//   watch: {
//     syncTodos(childTodos): void {
//       this.$emit("syncTodos", this.childTodos);
//       console.log(this.todos);
//     },
//   },
//   computed: {
//     filteredTodos(): Todo[] {
//       return this.childTodos.filter((t: Todo) => t.statusNum == 0);
//     },
//   },
//   methods: {
//     addTodo(): void {
//       this.childTodos.push({
//         id: id++,
//         text: this.newTodo,
//         done: false,
//         statusNum: 0,
//       });
//       this.newTodo = "";
//     },
//     removeTodo(todo: Todo): void {
//       this.childTodos = this.childTodos.filter((t: Todo) => t !== todo);
//     },
//     progressTodo(todo: Todo): void {
//       if (todo.statusNum < 2) todo.statusNum++;
//       else todo.statusNum = 2;
//     },
//     regressTodo(todo: Todo): void {
//       if (todo.statusNum > 0) todo.statusNum--;
//       else todo.statusNum = 0;
//     },
//   },
// });
</script>

<template>
  <form @submit.prevent="addTodo">
    <input v-model="newTodo" />
    <button>Add Todo</button>
  </form>
  <ul>
    <li v-for="todo in filteredTodos" :key="todo.id">
      <!-- <button @click="regressTodo(todo)">&lt;</button>&nbsp; -->
      <!-- <v-btn prepend-icon="mdi-vuetify" variant="outlined">&lt;</v-btn>
      <span :class="{ done: todo.done }">{{ todo.text }}</span>
      <span :class="status">&nbsp;|&nbsp;{{ statusArray[todo.statusNum] }}</span
      >&nbsp; <button @click="removeTodo(todo)">X</button>&nbsp;
      <button @click="{{ progressTodo(todo) }}">&gt;</button> -->
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
