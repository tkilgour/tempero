<template>
  <div class="max-w-xl mx-auto my-8 px-4">
    <ul class="ml-11 md:ml-8">
      <draggable
        v-model="todayTodos"
        @start="drag = true"
        @end="drag = false"
        item-key="id"
      >
        <template #item="{ element }">
          <TodoItem :todo="element" />
        </template>
      </draggable>
    </ul>
    <button
      class="mt-6 px-4 py-1 rounded-full bg-blue-100 text-gray-700"
      @click="createEmptyTodo"
    >
      + New Item
    </button>
    <h2
      v-if="archivedTodos.length"
      class="mt-8 text-xl text-center text-gray-400"
    >
      Archived
    </h2>
    <ul class="ml-11 md:ml-8">
      <TodoItem
        v-for="todo in archivedTodos"
        :key="todo.id"
        :todo="todo"
        class="text-gray-400"
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
    ...mapActions(useTodosStore, ["createEmptyTodo"]),
  },

  computed: {
    ...mapState(useTodosStore, ["todayTodos", "archivedTodos"]),
  },
};
</script>
