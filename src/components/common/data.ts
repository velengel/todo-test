import { ref } from "vue";
import type { Todo } from "./types";

export const newTodo = ref<string>("");
export const childTodos = ref([] as Todo[]);

// export const props = defineProps<Props>();
// export const emits = defineEmits(["syncTodos"]);
