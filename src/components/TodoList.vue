<template>
  <div class="todo-list">
    <ul>
      <draggable
        v-model="mutatableTodos"
        @start="drag = true"
        @end="drag = false"
        item-key="id"
        :animation="100"
        handle=".drag-handle"
        tag="transition-group"
      >
        <template #item="{ element }">
          <TodoItem :todo="element" />
        </template>
      </draggable>
    </ul>
    <button class="new-todo-btn" @click="createEmptyTodo">
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
          d="M12 4v16m8-8H4"
        />
      </svg>
    </button>
    <h2 v-if="archivedTodos.length" class="h2">Archived</h2>
    <ul>
      <TodoItem
        v-for="todo in archivedTodos"
        :key="todo.id"
        :todo="todo"
        archived
      />
    </ul>
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useTodosStore } from "../stores/todos";
import TodoItem from "./TodoItem.vue";
import draggable from "vuedraggable";

export default {
  components: {
    TodoItem,
    draggable,
  },

  data() {
    return {
      drag: false,
    };
  },

  methods: {
    ...mapActions(useTodosStore, ["createEmptyTodo", "updateTodosArray"]),
  },

  computed: {
    ...mapState(useTodosStore, ["todos", "archivedTodos"]),

    mutatableTodos: {
      get() {
        return this.todos;
      },
      set(todos) {
        this.updateTodosArray(todos);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.h2 {
  /*  mt-8 text-xl text-center text-gray-400 */
  margin-top: 2rem;
  font-size: 1.25rem;
  line-height: 1.75rem;
  text-align: center;
  color: var(--low-priority-color);
}

.todo-list {
  /* max-w-xl mx-auto my-8 px-4 */
  max-width: 36rem;
  margin: 2rem auto;
  padding-inline: 1rem;
}

.new-todo-btn {
  position: fixed;
  width: 4rem;
  height: 4rem;
  bottom: 2rem;
  right: 2rem;
  display: grid;
  place-items: center;
  font-size: 2rem;
  line-height: 1;
  border-radius: 50%;
  background-color: var(--primary-color);
  color: #fff;
}
</style>
