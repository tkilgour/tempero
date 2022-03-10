
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
      class="text-lg md:text-base outline-none"
      @blur="handleUpdate"
    >
      <span :class="this.checked ? 'line-through text-gray-300' : ''">
        {{ todo.content }}
      </span>
      <button
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
      </button>
    </p>
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
};
</script>
