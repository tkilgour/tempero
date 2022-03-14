<template>
  <main>
    <h1 class="text-4xl text-center mt-4">Tempero</h1>
    <TodoList />
  </main>
</template>

<script>
import { mapActions } from "pinia";
import { useTodosStore } from "@/stores/todos";
import TodoList from "@/components/TodoList.vue";

export default {
  components: {
    TodoList,
  },

  methods: {
    ...mapActions(useTodosStore, ["archiveTodos", "createEmptyTodo"]),
  },

  mounted() {
    // setup global keyboard shortcuts
    this._keyListener = function (e) {
      if (e.key.length === 1 && e.key.match(/^[0-9a-zA-Z]+$/)) {
        // prevent trigger on keyboard shortcuts (especially Cmd+R)
        if (e.metaKey || e.ctrlKey || e.altKey) return;

        this.createEmptyTodo();
      }
    };
    document.addEventListener("keydown", this._keyListener.bind(this));

    //  TODO: update on date change if app is left running (set a timer? interval?)
    this.archiveTodos();
  },

  beforeUnmount() {
    document.removeEventListener("keydown", this._keyListener);
  },
};
</script>

<style></style>
