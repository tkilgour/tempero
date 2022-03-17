<template>
  <main id="content" class="todo-list">
    <p class="no-content" v-if="!todos.length">
      Tap the + button<span class="no-mobile">, or just start typing</span> to
      get started!
    </p>
    <draggable
      v-model="mutatableTodos"
      item-key="id"
      :animation="100"
      handle=".drag-handle"
      tag="transition-group"
      :component-data="{ tag: 'ul', name: 'todo-list', type: 'animation' }"
      @start="clearSettingsTimeout"
      @end="resetSettingsTimeout"
    >
      <template #item="{ element }">
        <TodoItem :todo="element" :key="element.id" />
      </template>
    </draggable>
  </main>
</template>

<script lang="ts">
import { mapActions, mapState } from "pinia";
import { useTodosStore } from "../stores/todos";
import { useUiStore } from "../stores/ui";
import TodoItem from "./TodoItem.vue";
import draggable from "vuedraggable";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    TodoItem,
    draggable,
  },

  methods: {
    ...mapActions(useTodosStore, ["updateTodosArray"]),
    ...mapActions(useUiStore, ["clearSettingsTimeout", "resetSettingsTimeout"]),
  },

  computed: {
    ...mapState(useTodosStore, ["todos"]),

    mutatableTodos: {
      get() {
        return this.todos;
      },
      set(todos) {
        this.updateTodosArray(todos);
      },
    },
  },
});
</script>

<style lang="scss" scoped>
.todo-list {
  flex: 1;
  margin-top: 2rem;
  padding-bottom: 4rem;
  grid-column-start: span 3;
}

.no-content {
  text-align: center;
  font-style: italic;
  color: var(--highlight-color);
  position: absolute;
  left: 0;
  right: 0;
}

.no-mobile {
  display: none;
}

.h2 {
  margin-top: 2rem;
  font-size: 1.25rem;
  line-height: 1.75rem;
  text-align: center;
  color: var(--low-priority-color);
}

.todo-list-enter-active {
  animation: pop-out 170ms ease-out reverse;
}

.todo-list-leave-active {
  animation: pop-out 300ms ease-out;
}

@keyframes pop-out {
  from {
    transform: scale(1);
    opacity: 1;
  }

  33% {
    transform: scale(1.02);
  }

  to {
    transform: scale(0.9);
    opacity: 0;
  }
}

@media (min-width: 768px) {
  .todo-list {
    margin-top: 1rem;
  }

  .no-mobile {
    display: inline;
  }
}
</style>
