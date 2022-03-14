<template>
  <li class="todo-item">
    <!-- If today, show checkbox -->
    <div v-if="!archived" class="checkbox__custom" :class="{ checked }">
      <input
        class="checkbox__native"
        type="checkbox"
        :id="todo.id"
        v-model="checked"
      />
    </div>

    <!-- Else it's archived, so show add to today's list button -->
    <button
      v-else
      class="text-2xl leading-none absolute -left-10 md:-left-8"
      @click="refreshArchivedTodo(todo.id)"
    >
      +
    </button>

    <p
      class="todo-content grow text-lg md:text-base outline-none"
      :class="checked ? 'checked' : ''"
    >
      <span
        :contenteditable="!archived && !checked"
        class="todo-content__inner"
        ref="todo-content"
        @blur="handleUpdate"
        @keydown="handleKeydown"
      >
        {{ todo.content }}
      </span>
    </p>
    <div v-if="!archived" class="flex items-center">
      <button
        class="ml-4 px-2 py-1 text-lg leading-4 no-underline text-black"
        @click="deleteTodo(todo.id)"
      >
        🗑
      </button>
      <div class="drag-handle text-2xl cursor-grab">&#65309;</div>
    </div>
  </li>
</template>

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
      "createEmptyTodo",
      "updateTodo",
      "deleteTodo",
      "refreshArchivedTodo",
    ]),

    handleUpdate(e) {
      const newTodoContent = e.target.innerText;

      if (!newTodoContent) {
        this.deleteTodo(this.todo.id);
      } else {
        this.updateTodo(this.todo.id, newTodoContent);
      }
    },

    handleKeydown(e) {
      e.stopPropagation();
      switch (e.key) {
        case "Enter":
          e.preventDefault();
          this.createEmptyTodo();
          break;
        case "Backspace":
          if (!e.target.innerText) {
            this.deleteTodo(this.todo.id);
          }
          break;
        case "Escape":
          this.$refs["todo-content"].blur();
          break;
      }
    },
  },

  mounted() {
    const contentElem = this.$refs["todo-content"];
    contentElem.style.setProperty(
      "--todo-item-length",
      this.todo.content.length
    );

    if (!this.todo.content) {
      contentElem.focus();
    }
  },
};
</script>

<style scoped lang="scss">
.todo-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  position: relative;

  @media (min-width: 768px) {
    margin-bottom: 0.75rem;
  }

  .checkbox {
    &__custom {
      height: 1.5rem;
      width: 1.5rem;
      cursor: pointer;
      box-shadow: rgb(255, 255, 255) 0 0 0 2px, var(--highlight-color) 0 0 0 3px,
        rgba(0, 0, 0, 0) 0 0 0 0;
      border-radius: 50%;

      @media (min-width: 768px) {
        height: 1rem;
        width: 1rem;
      }

      &:focus-within {
        --highlight-color: var(--highlight-color-focus);
      }

      &.checked {
        background-color: var(--highlight-color);
      }
    }

    &__native {
      opacity: 0;
      position: absolute;
      top: 0;
      left: -0.25rem;
      height: 2rem;
      width: 2rem;
      cursor: pointer;

      @media (min-width: 768px) {
        top: 0.25rem;
        height: 1.5rem;
        width: 1.5rem;
      }
    }
  }

  .todo-content {
    min-height: 1.5em;
    opacity: 1;
    transition: opacity calc(350ms) ease;

    &__inner {
      --todo-item-length: 0;
      background-image: linear-gradient(
        transparent calc(100% - 2px),
        black 10px
      );
      background-repeat: no-repeat;
      background-size: 0% 65%;
      transition: background-size
        calc(140ms + (0.7ms * var(--todo-item-length)));
      outline: none;
    }
  }
  .todo-content.checked {
    opacity: 0.2;

    .todo-content__inner {
      background-size: 100% 65%;
    }
  }
}
</style>
