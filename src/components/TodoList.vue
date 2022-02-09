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
    ...mapState(useTodosStore, ["todayTodos", "archivedTodos"]),
  },
};
</script>

<template>
  <div class="max-w-xl mx-auto px-4 mt-8">
    <ul>
      <TodoItem v-for="todo in todayTodos" :key="todo.id" :todo="todo" />
    </ul>
    <TodoInput />
    <h2 class="mt-8 text-xl text-center text-gray-400">Archived</h2>
    <ul>
      <TodoItem
        v-for="todo in archivedTodos"
        :key="todo.id"
        :todo="todo"
        class="text-gray-400"
        archived
      />
    </ul>
  </div>
</template>
