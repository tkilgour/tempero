<template>
  <form class="flex mt-4" @submit.prevent="handleSubmit">
    <input
      class="border px-1 w-full outline-none focus:shadow-inner"
      type="text"
      id=""
      v-model.trim="content"
    />
    <button
      class="border border-l-0 px-2 disabled:text-gray-400"
      type="submit"
      :disabled="!this.content"
    >
      +
    </button>
  </form>
</template>

<script>
import { mapActions } from "pinia";
import { useTodosStore } from "../stores/todos";

export default {
  data() {
    return {
      content: "",
    };
  },
  methods: {
    ...mapActions(useTodosStore, ["createTodo"]),

    handleSubmit() {
      if (!this.content) return;
      this.createTodo(this.content);
      this.content = "";
    },
  },
};
</script>
