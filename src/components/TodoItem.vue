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
      "deleteTodo",
      "refreshArchivedTodo",
    ]),
  },
};
</script>

<template>
  <li class="flex mb-2 relative">
    <div
      class="absolute -left-8 top-1 h-4 w-4 p-2 hover:bg-gray-200 ring-offset-2 ring-1 ring-gray-300 rounded-full cursor-pointer"
      :class="{ 'bg-gray-300': checked }"
    >
      <input
        class="opacity-0 absolute -top-1 -left-1 h-6 w-6 cursor-pointer"
        type="checkbox"
        :id="todo.id"
        v-model="checked"
      />
    </div>
    <!-- TODO: make todos editable! -->
    <div>
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
    </div>
  </li>
</template>
