<script>
import { mapActions } from "pinia";
import { useTodosStore } from "./stores/todos";
import TodoList from "./components/TodoList.vue";

export default {
  components: {
    TodoList,
  },

  methods: {
    ...mapActions(useTodosStore, ["archiveTodos"]),
  },

  mounted() {
    this.archiveTodos();
  },
};
</script>

<template>
  <main>
    <h1 class="text-3xl text-center mt-4">Todo Today</h1>
    <TodoList />
  </main>
</template>
