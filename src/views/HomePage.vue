<template>
  <main>
    <h1 class="h1">Tempero</h1>
    <ThemeToggle />
    <button
      class="settings-btn"
      :class="{ rotate: showSettings }"
      title="Toggle Settings"
      @click="toggleSettings"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
        />
      </svg>
    </button>
    <TodoList />
  </main>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useTodosStore } from "@/stores/todos";
import { useUiStore } from "@/stores/ui";
import TodoList from "@/components/TodoList.vue";
import ThemeToggle from "../components/ThemeToggle.vue";

export default {
  components: {
    TodoList,
    ThemeToggle,
  },

  methods: {
    ...mapActions(useTodosStore, ["archiveTodos", "createEmptyTodo"]),
    ...mapActions(useUiStore, ["toggleSettings"]),
  },

  computed: {
    ...mapState(useUiStore, ["showSettings"]),
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

<style lang="scss" scoped>
main {
  max-width: 36rem;
  margin-inline: auto;
  padding-inline: 1rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.h1 {
  font-size: 2.75rem;
  line-height: 1;
  justify-self: center;
  grid-column-start: 2;
}

.settings-btn {
  place-self: center end;
  transform: rotate(0);
  transition: transform 150ms ease;

  &.rotate {
    transform: rotate(90deg);
  }
}
</style>
