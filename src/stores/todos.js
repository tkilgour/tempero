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
    createEmptyTodo() {
      this.todos.push({
        id: Date.now(),
        content: "",
        completed: false,
        dateCreated: new Date(),
        dateArchived: null,
      });
    },

    setTodoCompleted(id, val) {
      const todo = this.todos.find((todo) => todo.id === id);
      todo.completed = val;
    },

    updateTodo(id, content) {
      // remove task item syntax that might be copied
      const sanitizedContent = content.replace(/^- *(\[.*] ?)?/, "");

      const todo = this.todos.find((todo) => todo.id === id);
      todo.content = sanitizedContent;
    },

    deleteTodo(id) {
      this.todos = this.todos.filter((todo) => todo.id !== id);
    },

    archiveTodos() {
      this.todos = this.todos.filter((todo) => {
        return !todo.dateArchived || isToday(todo.dateArchived);
      });

      this.todos.forEach((todo) => {
        if (!isToday(todo.dateCreated) && !todo.dateArchived) {
          todo.dateArchived = new Date();
        }
      });
    },

    refreshArchivedTodo(id) {
      const todo = this.todos.find((todo) => todo.id === id);
      todo.dateArchived = null;
      todo.dateCreated = new Date();
    },
  },
});
