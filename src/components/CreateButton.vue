<template>
  <button
    class="create-btn"
    title="Create New Todo"
    @click="todosStore.createEmptyTodo"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
    >
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  </button>
</template>

<script setup lang="ts">
import { useTodosStore } from "../stores/todos";

const todosStore = useTodosStore();
</script>

<style lang="scss" scoped>
.create-btn {
  position: fixed;
  width: 4rem;
  height: 4rem;
  bottom: 4rem;
  right: 2rem;
  display: grid;
  place-items: center;
  font-size: 2rem;
  line-height: 1;
  border-radius: 50%;
  background-color: var(--primary-color-light);
  color: var(--bg-color);
  transform: scale(1);
  transition: all var(--transition-timing) ease;

  &:hover,
  &:focus {
    outline: none;
    transform: scale(1.1);
    background-color: var(--primary-color);
  }
}
</style>
