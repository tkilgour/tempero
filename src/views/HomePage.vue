<template>
  <div class="container">
    <a href="#content" class="skip-link">Skip to Content</a>
    <TodoHeader />
    <TodoList />
    <CreateButton />
    <TodoArchive />
  </div>
</template>

<script lang="ts">
import { mapActions } from "pinia";
import { useTodosStore } from "@/stores/todos";
import TodoHeader from "../components/TodoHeader.vue";
import TodoList from "@/components/TodoList.vue";
import TodoArchive from "@/components/TodoArchive.vue";
import CreateButton from "@/components/CreateButton.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    TodoList,
    TodoHeader,
    TodoArchive,
    CreateButton,
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

    this.archiveTodos();

    // run archive function every hour
    setInterval(() => {
      this.archiveTodos();
    }, 1000 * 60 * 60);
  },

  beforeUnmount() {
    document.removeEventListener("keydown", this._keyListener);
  },
});
</script>

<style lang="scss" scoped>
.container {
  max-width: 36rem;
  margin-inline: auto;
  padding-inline: 1rem;
  min-height: 100vh;
  // small viewport height:
  /* https://www.bram.us/2021/07/08/the-large-small-and-dynamic-viewports/ */
  min-height: 100svh;
  position: relative;
}

.skip-link {
  position: fixed;
  top: -200px;
  left: 4rem;
  background-color: var(--primary-color);
  color: var(--bg-color);
  padding: 0.5rem 1rem;

  &:focus {
    top: 0;
  }
}
</style>
