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

const sanitizeTodo = (todo) => {
  // remove task item syntax that might be copied
  return todo.replace(/^- *(\[.*] ?)?/, "");
};

export const useTodosStore = defineStore({
  id: "todos",
  state: () => ({
    todos: useStorage("todos", []),
    archivedTodos: useStorage("archivedTodos", []),
  }),
  actions: {
    createTodo(content, completed = false) {
      this.todos.push({
        id: Date.now(),
        content: sanitizeTodo(content),
        completed: completed,
        dateCreated: new Date(),
        dateArchived: null,
      });
    },

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
      const todo = this.todos.find((todo) => todo.id === id);
      todo.content = sanitizeTodo(content);
    },

    updateTodosArray(todos) {
      this.todos = todos;
    },

    deleteTodo(id) {
      this.todos = this.todos.filter((todo) => todo.id !== id);
    },

    archiveTodos() {
      // purge archived todos from more than one day ago
      this.archivedTodos = this.archivedTodos.filter((todo) => {
        return isToday(todo.dateArchived);
      });

      const currentTodos = [];

      this.todos.forEach((todo) => {
        // ignore completed todos from before today
        if (todo.completed && !isToday(todo.dateCreated)) return;

        if (!isToday(todo.dateCreated)) {
          // archive incomplete todos that were created before today
          todo.dateArchived = new Date();
          this.archivedTodos.push(todo);
        } else {
          // keep current day todos
          currentTodos.push(todo);
        }
      });

      this.todos = currentTodos;
    },

    refreshArchivedTodo(id) {
      const todo = this.archivedTodos.find((todo) => todo.id === id);
      todo.dateArchived = null;
      todo.dateCreated = new Date();
      this.todos.push(todo);
      this.archivedTodos = this.archivedTodos.filter((todo) => todo.id !== id);
    },

    async copyToClipboard() {
      const todoArr = this.todos.map((todo) => {
        return `- [${todo.completed ? "x" : " "}] ${todo.content}`;
      });
      try {
        await navigator.clipboard.writeText(todoArr.join("\n"));
        alert("List copied to clipboard");
      } catch (error) {
        console.log(error);
      }
    },
    async importFromClipboard() {
      try {
        const todoString = await navigator.clipboard.readText();
        const todoArr = todoString.split("\n").filter((todo) => todo.length);

        if (window.confirm(`Add the following items to list?\n${todoString}`)) {
          todoArr.forEach((todo) => this.createTodo(todo));
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
});
