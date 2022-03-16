<template>
  <li class="todo-item">
    <!-- If today, show checkbox -->
    <div
      v-if="!archived"
      class="checkbox__custom"
      :class="{ checked }"
      @click="handleCheckboxClick"
    >
      <input
        class="checkbox__native"
        type="checkbox"
        :id="todo.id"
        v-model="checked"
        ref="checkbox"
      />
    </div>

    <!-- Else it's archived, so show add to today's list button -->
    <button v-else class="refresh-btn" @click="refreshArchivedTodo(todo.id)">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </button>

    <p class="todo-content" :class="{ checked }">
      <span
        :contenteditable="!archived && !checked"
        :tabindex="!archived && !checked"
        class="todo-content__inner"
        ref="todo-content"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown="handleKeydown"
      >
        {{ todo.content }}
      </span>
    </p>
    <Transition name="slide-fade">
      <div
        v-if="!archived && showSettings"
        class="edit-wpr"
        @click="resetSettingsTimeout"
      >
        <DeleteButton @click="deleteTodo(todo.id)" />
        <div class="drag-handle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 8h16M4 16h16"
            />
          </svg>
        </div>
      </div>
    </Transition>
  </li>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useTodosStore } from "../stores/todos";
import { useUiStore } from "../stores/ui";
import DeleteButton from "@/components/DeleteButton.vue";

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

  components: {
    DeleteButton,
  },

  computed: {
    ...mapState(useUiStore, ["showSettings"]),

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
    ...mapActions(useUiStore, ["resetSettingsTimeout"]),

    handleBlur(e) {
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

    handleCheckboxClick() {
      this.$refs.checkbox.blur();
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
  gap: 1rem;
  /* align-items: center; */
  margin-bottom: 1rem;
  position: relative;

  @media (min-width: 768px) {
    margin-bottom: 0.75rem;
  }
}

.checkbox {
  &__custom {
    position: relative;
    margin-top: 0.25em;
    flex-shrink: 0;
    height: 1.5rem;
    width: 1.5rem;
    cursor: pointer;
    box-shadow: rgb(255, 255, 255) 0 0 0 2px, var(--highlight-color) 0 0 0 3px,
      rgba(0, 0, 0, 0) 0 0 0 0;
    border-radius: 50%;
    transition: box-shadow 200ms ease;

    @media (min-width: 768px) {
      height: 1rem;
      width: 1rem;
    }

    &:focus-within,
    &:hover {
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
      top: -0.25rem;
      height: 1.5rem;
      width: 1.5rem;
    }
  }
}

.refresh-btn {
  font-size: 1.5rem;
  line-height: 1;
  align-self: start;
}

.todo-content {
  flex-grow: 1;
  font-size: 1.125rem;
  line-height: 1.75rem;
  min-height: 1.5em;
  opacity: 1;
  transition: opacity 350ms ease;

  @media (min-width: 768px) {
    font-size: 1rem;
    line-height: 1.5rem;
  }

  &__inner {
    --todo-item-length: 0;
    background-image: linear-gradient(transparent calc(100% - 2px), black 10px);
    background-repeat: no-repeat;
    background-size: 0% 65%;
    transition: background-size calc(140ms + (0.7ms * var(--todo-item-length)));
    outline: none;
  }
}

.todo-content.checked {
  opacity: 0.2;

  .todo-content__inner {
    background-size: 100% 65%;
  }
}

.edit-wpr {
  display: flex;
  gap: 0.5rem;
  align-items: center;

  .drag-handle {
    cursor: grab;
  }
}

.slide-fade-enter-active {
  transition: all 200ms ease-out;
}

.slide-fade-leave-active {
  transition: all 200ms ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
