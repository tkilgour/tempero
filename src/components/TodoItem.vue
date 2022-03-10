<template>
  <li class="flex mb-4 md:mb-3 relative">
    <div
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
    <p
      contenteditable="true"
      class="todo-content text-lg md:text-base outline-none"
      :class="this.checked ? 'checked' : ''"
      @blur="handleUpdate"
    >
      <span class="todo-content__inner" ref="todo-content">
        {{ todo.content }}
      </span>
    </p>
    <!-- <button
      v-if="this.checked"
      class="ml-4 px-2 py-1 text-lg leading-4 no-underline text-black"
      @click="deleteTodo(todo.id)"
    >
      x
    </button>
    <button
      v-if="this.archived"
      class="ml-4 px-2 py-1 text-lg leading-4 no-underline text-black"
      @click="refreshArchivedTodo(todo.id)"
    >
      ⬆️
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
      "updateTodo",
      "deleteTodo",
      "refreshArchivedTodo",
    ]),

    handleUpdate(e) {
      this.updateTodo(this.todo.id, e.target.innerText);
    },
  },

  mounted() {
    this.$refs["todo-content"].style.setProperty(
      "--todo-item-length",
      this.todo.content.length
    );
  },
};
</script>

<style scoped lang="scss">
.todo-content {
  opacity: 1;
  transition: opacity calc(350ms) ease;

  &__inner {
    --todo-item-length: 0;
    background-image: linear-gradient(transparent calc(100% - 2px), black 10px);
    background-repeat: no-repeat;
    background-size: 0% 65%;
    transition: background-size calc(140ms + (0.7ms * var(--todo-item-length)));
  }
}
.todo-content.checked {
  opacity: 0.2;

  .todo-content__inner {
    background-size: 100% 65%;
  }
}
</style>
