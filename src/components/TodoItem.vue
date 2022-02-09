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
    ...mapActions(useTodosStore, ["setTodoCompleted"]),
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
    <label
      class=""
      :class="this.checked ? 'line-through text-gray-300' : ''"
      :for="todo.id"
      >{{ todo.content }}</label
    >
  </li>
</template>
