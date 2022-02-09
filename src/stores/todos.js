import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const useTodosStore = defineStore({
  id: "todos",
  state: () => ({
    todos: useStorage("todos", []),
  }),
  getters: {
    // doubleCount: (state) => state.counter * 2
  },
  actions: {
    createTodo(content) {
      const sanitizedContent = content.replace(/^- *(\[.*] ?)?/, "");

      this.todos.push({
        id: Date.now(),
        content: sanitizedContent,
        dateCreated: new Date(),
        completed: false,
      });
    },

    setTodoCompleted(id, val) {
      const todo = this.todos.find((todo) => todo.id === id);
      todo.completed = val;
    },
  },
});
