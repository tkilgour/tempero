<template>
  <div
    class="drawer"
    v-if="todoStore.archivedTodos.length"
    v-on-click-outside="closeDrawer"
    @keydown.esc="closeDrawer"
  >
    <button
      v-if="todoStore.archivedTodos.length"
      class="drawer-header"
      @click="toggleDrawer"
    >
      <div>Archive ({{ todoStore.archivedTodos.length }})</div>
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
      </section>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useTodosStore } from "../stores/todos";
import { vOnClickOutside } from "@vueuse/components";
import TodoItem from "./TodoItem.vue";

const todoStore = useTodosStore();
// const { archivedTodos } = todoStore;
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
}

.drawer-header {
  padding-block: 1rem;
  font-size: 1.25rem;
  line-height: 1.75rem;
  text-align: center;
  text-decoration: none;

  & > * {
    color: var(--primary-color-light);
    transform: scale(1);
    transition: all 200ms ease;
  }

  &:hover,
  &:focus-visible {
    outline: none;

    & > * {
      color: var(--primary-color);
      transform: scale(1.1);
    }
  }
}

.content {
  padding-inline: 1rem;
  padding-top: 1rem;
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
