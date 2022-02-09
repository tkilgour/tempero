<script>
import { mapState } from "pinia";
import { useTodosStore } from "../stores/todos";
import TodoItem from "./TodoItem.vue";
import TodoInput from "./TodoInput.vue";

export default {
  components: {
    TodoItem,
    TodoInput,
  },

  computed: {
    ...mapState(useTodosStore, ["todos"]),
  },
};
</script>

<template>
  <div class="max-w-xl mx-auto px-4 mt-8">
    <ul>
      <TodoItem v-for="todo in todos" :key="todo.id" :todo="todo" />
    </ul>
    <TodoInput />
  </div>
</template>
