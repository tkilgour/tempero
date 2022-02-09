import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

const isToday = (someDateStr) => {
  const today = new Date();
  const someDate = new Date(someDateStr);
  return (
    someDate.getDate() == today.getDate() &&
    someDate.getMonth() == today.getMonth() &&
    someDate.getFullYear() == today.getFullYear()
  );
};

export const useTodosStore = defineStore({
  id: "todos",
  state: () => ({
    todos: useStorage("todos", []),
  }),
  getters: {
    todayTodos: (state) => state.todos.filter((todo) => !todo.dateArchived),

    archivedTodos: (state) =>
      state.todos.filter((todo) => todo.dateArchived && !todo.completed),
  },
  actions: {
    createTodo(content) {
      const sanitizedContent = content.replace(/^- *(\[.*] ?)?/, "");

      this.todos.push({
        id: Date.now(),
        content: sanitizedContent,
        completed: false,
        dateCreated: new Date(),
        dateArchived: null,
      });
    },

    setTodoCompleted(id, val) {
      const todo = this.todos.find((todo) => todo.id === id);
      todo.completed = val;
    },

    deleteTodo(id) {
      const todoIndex = this.todos.findIndex((todo) => todo.id === id);
      this.todos.splice(todoIndex, 1);
    },

    archiveTodos() {
      this.todos.forEach((todo) => {
        if (!isToday(todo.dateCreated)) todo.dateArchived = new Date();

        // TODO: remove archived todos if date is not today
      });
    },

    refreshArchivedTodo(id) {
      const todo = this.todos.find((todo) => todo.id === id);
      todo.dateArchived = null;
      todo.dateCreated = new Date();
    },
  },
});
