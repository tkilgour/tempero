<template>
  <li class="flex mb-4 md:mb-3 relative">
    <!-- If today, show checkbox -->
    <div
      v-if="!archived"
      class="absolute -left-10 md:-left-8 top-0 md:top-1 h-6 w-6 md:h-4 md:w-4 ring-offset-2 ring-1 ring-gray-300 rounded-full cursor-pointer"
      :class="{ 'bg-gray-300': checked }"
    >
      <input
        class="opacity-0 absolute -top-1 -left-1 h-8 w-8 md:h-6 md:w-6 cursor-pointer"
        type="checkbox"
        :id="todo.id"
        v-model="checked"
      />
    </div>

    <!-- Else it's archived, so show add to today's list button -->
    <button
      v-else
      class="text-2xl leading-none absolute -left-10 md:-left-8"
      @click="refreshArchivedTodo(todo.id)"
    >
      +
    </button>

    <p
      class="todo-content grow text-lg md:text-base outline-none"
      :class="checked ? 'checked' : ''"
    >
      <span
        :contenteditable="!archived"
        class="todo-content__inner"
        ref="todo-content"
        @blur="handleUpdate"
        @keydown.enter.prevent="createEmptyTodo"
        @keydown.delete="handleBackspace"
      >
        {{ todo.content }}
      </span>
    </p>
    <!-- <button
      v-if="checked"
      class="ml-4 px-2 py-1 text-lg leading-4 no-underline text-black"
      @click="deleteTodo(todo.id)"
    >
      x
    </button> -->
  </li>
</template>

<script>
import { mapActions } from "pinia";
import { useTodosStore } from "../stores/todos";

export default {
  props: {
    todo: {
      type: Object,
      required: true,
    },
    archived: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    checked: {
      get() {
        return this.todo.completed;
      },
      set(val) {
        this.setTodoCompleted(this.todo.id, val);
      },
    },
  },

  methods: {
    ...mapActions(useTodosStore, [
      "setTodoCompleted",
      "createEmptyTodo",
      "updateTodo",
      "deleteTodo",
      "refreshArchivedTodo",
    ]),

    handleUpdate(e) {
      const newTodoContent = e.target.innerText;

      if (!newTodoContent) {
        this.deleteTodo(this.todo.id);
      } else {
        this.updateTodo(this.todo.id, newTodoContent);
      }
    },

    handleBackspace(e) {
      const newTodoContent = e.target.innerText;

      if (!newTodoContent) {
        this.deleteTodo(this.todo.id);
      }
    },
  },

  mounted() {
    const contentElem = this.$refs["todo-content"];
    contentElem.style.setProperty(
      "--todo-item-length",
      this.todo.content.length
    );

    if (!this.todo.content) {
      contentElem.focus();
    }
  },
};
</script>

<style scoped lang="scss">
.todo-content {
  min-height: 1.5em;
  opacity: 1;
  transition: opacity calc(350ms) ease;

  &__inner {
    --todo-item-length: 0;
    background-image: linear-gradient(transparent calc(100% - 2px), black 10px);
    background-repeat: no-repeat;
    background-size: 0% 65%;
    transition: background-size calc(140ms + (0.7ms * var(--todo-item-length)));
    outline: none;
  }
}
.todo-content.checked {
  opacity: 0.2;

  .todo-content__inner {
    background-size: 100% 65%;
  }
}
</style>
