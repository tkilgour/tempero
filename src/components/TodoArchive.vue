<template>
  <div
    class="drawer"
    v-if="archiveLength"
    v-on-click-outside="closeDrawer"
    @keydown.esc="closeDrawer"
  >
    <button
      v-if="archiveLength"
      class="drawer-header"
      :aria-label="`Archive - ${archiveLength} item${
        archiveLength > 1 ? 's' : ''
      }`"
      @click="toggleDrawer"
    >
      <div>Archive ({{ archiveLength }})</div>
    </button>
    <Transition name="pop">
      <section class="content-wpr" :aria-expanded="expanded" v-show="expanded">
        <ul class="content">
          <TodoItem
            v-for="todo in todoStore.archivedTodos"
            :key="todo.id"
            :todo="todo"
            archived
          />
        </ul>
        <button
          class="delete-archive-btn"
          title="Delete Archive"
          @click="todoStore.deleteAllArchivedTodos"
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
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </section>
    </Transition>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useTodosStore } from "../stores/todos";
import { vOnClickOutside } from "@vueuse/components";
import TodoItem from "./TodoItem.vue";

const todoStore = useTodosStore();
const archiveLength = computed(() => {
  return todoStore.archivedTodos.length;
});
const expanded = ref(false);

const toggleDrawer = () => {
  expanded.value = !expanded.value;
};

const closeDrawer = () => {
  expanded.value = false;
};
</script>

<style lang="scss" scoped>
.drawer {
  position: fixed;
  left: 50%;
  bottom: 0;
  transform: translate(-50%, 0%);
  margin: 0 auto;
  width: calc(100% - 2rem);
  max-width: 36rem;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--highlight-color);
  border-bottom: none;
  border-radius: 0.5rem 0.5rem 0 0;
  background-color: var(--bg-color);
}

.content-wpr {
  height: 30vh;
  overflow: auto;
  position: relative;
}

.drawer-header {
  padding-block: 1rem;
  font-size: 1.25rem;
  line-height: 1.75rem;
  text-align: center;
  text-decoration: none;
  color: var(--primary-color);

  & > * {
    transform: scale(1);
    transition: all 200ms ease;
  }

  &:hover,
  &:focus-visible {
    outline: none;

    & > * {
      transform: scale(1.1);
    }
  }
}

.content {
  padding-inline: 1rem;
  padding-top: 1rem;
}

.delete-archive-btn {
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  padding: 0.5rem;
  background-color: var(--primary-color-light);
  color: var(--bg-color);
  border-radius: 50%;
  transform: scale(1);
  transition: transform 200ms ease;

  &:hover,
  &:focus {
    outline: none;
    transform: scale(1.1);
    background-color: var(--primary-color);
  }
}

.pop-enter-active {
  animation: pop-out 500ms ease-out;
}

.pop-leave-active {
  animation: pop-in 400ms ease-out;
}

@keyframes pop-out {
  0% {
    height: 0;
  }

  60% {
    height: 30vh;
  }

  75% {
    height: 29vh;
  }

  100% {
    height: 30vh;
  }
}

@keyframes pop-in {
  0% {
    height: 30;
  }

  60% {
    height: 0vh;
  }

  70% {
    height: 1.5vh;
  }

  100% {
    height: 0vh;
  }
}

@media (min-width: 768px) {
}
</style>
