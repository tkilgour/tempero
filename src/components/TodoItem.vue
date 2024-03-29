<template>
  <li class="todo-item">
    <!-- If today, show checkbox -->
    <div v-if="!archived" class="checkbox__custom" :class="{ checked }">
      <input
        class="checkbox__native"
        type="checkbox"
        :id="todo.id"
        v-model="checked"
        ref="checkbox"
      />
    </div>

    <!-- Else it's archived, so show add to today's list button -->
    <button
      v-else
      class="refresh-btn btn"
      title="Add to Today's List"
      @click="refreshArchivedTodo(todo.id)"
    >
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

    <label
      :for="todo.id"
      :aria-label="todo.content"
      class="todo-content"
      :class="{ checked }"
      @click="(e) => e.preventDefault()"
    >
      <span
        :contenteditable="!archived && !checked"
        :tabindex="!archived && !checked ? 1 : 0"
        class="todo-content__inner"
        ref="todo-content"
        @blur="handleBlur"
        @keydown="handleKeydown"
      >
        {{ todo.content }}
      </span>
    </label>
    <div
      v-if="!archived"
      class="edit-wpr"
      :class="{ hide: !showSettings }"
      @click="resetSettingsTimeout"
    >
      <DeleteButton :content="todo.content" @click="deleteTodo(todo.id)" />
      <div class="drag-handle" :class="{ hide: !showSettings }">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <title>Drag to Re-order</title>
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4 8h16M4 16h16"
          />
        </svg>
      </div>
    </div>
  </li>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapState } from "pinia";
import { useTodosStore } from "../stores/todos";
import { useUiStore } from "../stores/ui";
import DeleteButton from "@/components/DeleteButton.vue";

export default defineComponent({
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
});
</script>

<style scoped lang="scss">
.todo-item {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  position: relative;
}

.checkbox__custom {
  position: relative;
  margin-top: 0.25em;
  flex-shrink: 0;
  height: 1.5rem;
  width: 1.5rem;
  cursor: pointer;
  --ring-width: 3px;
  box-shadow: var(--bg-color) 0 0 0 2px,
    var(--highlight-color) 0 0 0 var(--ring-width), rgba(0, 0, 0, 0) 0 0 0 0;
  border-radius: 50%;
  transition: box-shadow var(--transition-timing) ease;

  &:focus-within,
  &:hover {
    --highlight-color: var(--primary-color);
    --ring-width: 4px;
  }

  &.checked {
    background-color: var(--primary-color-light);
  }
}
.checkbox__native {
  opacity: 0;
  position: absolute;
  top: 0;
  left: -0.25rem;
  height: 2rem;
  width: 2rem;
  cursor: pointer;
}

.refresh-btn {
  font-size: 1.5rem;
  line-height: 1;
  align-self: start;
  color: var(--highlight-color);
}

.todo-content {
  flex-grow: 1;
  font-size: 1.125rem;
  line-height: 1.75rem;
  min-height: 1.5em;
  opacity: 1;
  transition: opacity 350ms ease;

  &__inner {
    --todo-item-length: 0;
    background-image: linear-gradient(
      transparent calc(100% - 2px),
      currentColor 10px
    );
    background-repeat: no-repeat;
    background-size: 0% 65%;
    transition: background-size calc(140ms + (0.7ms * var(--todo-item-length)));
    outline: none;
  }
}

.todo-content.checked {
  opacity: 0.4;

  .todo-content__inner {
    background-size: 100% 65%;
  }
}

.edit-wpr {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  transform: translateX(0);
  opacity: 1;
  transition: transform var(--transition-timing) ease,
    opacity var(--transition-timing) ease;

  .drag-handle {
    cursor: grab;
    opacity: 1;
    transition: opacity var(--transition-timing) ease;

    &.hide {
      opacity: 0;
    }
  }

  &.hide:not(:focus-within) {
    pointer-events: none;
    transform: translateX(-0.5rem);
    opacity: 0;
  }
}

@media (min-width: 768px) {
  .checkbox__custom {
    height: 1rem;
    width: 1rem;
  }

  .checkbox__native {
    top: -0.25rem;
    height: 1.5rem;
    width: 1.5rem;
  }

  .todo-content {
    font-size: 1rem;
    line-height: 1.5rem;
  }
}
</style>
