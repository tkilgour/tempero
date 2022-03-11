<template>
  <main>
    <h1 class="text-4xl text-center pt-4">Tempero</h1>
    <TodoList />
  </main>
</template>

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
    //  TODO: update on date change if app is left running (set a timer? interval?)
    this.archiveTodos();
  },
};
</script>

<style>
* {
  -webkit-tap-highlight-color: transparent;
}

html,
body,
#app,
main {
  height: 100%;
}
</style>
