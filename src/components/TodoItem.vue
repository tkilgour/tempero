<script>
import { mapActions } from "pinia";
import { useTodosStore } from "../stores/todos";

export default {
  props: {
    todo: {
      type: Object,
      required: true,
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
    ...mapActions(useTodosStore, ["setTodoCompleted", "deleteTodo"]),
  },
};
</script>

<template>
  <li class="flex mb-2">
    <input
      class="opacity-0 absolute h-8 w-8"
      type="checkbox"
      :id="todo.id"
      v-model="checked"
    />
    <label :for="todo.id">
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
    </label>
  </li>
</template>
