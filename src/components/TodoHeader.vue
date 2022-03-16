<template>
  <header class="header">
    <h1 class="h1" :class="{ 'mobile-hidden': showSettings }">Tempero</h1>
    <button
      class="settings-btn"
      :class="{ rotate: showSettings }"
      title="Toggle Settings"
      @click="toggleSettings"
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
          d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
        />
      </svg>
    </button>
    <div class="settings-wpr">
      <Transition name="fade-down">
        <div v-show="showSettings">
          <button
            class="import-btn btn"
            title="Import from Clipboard"
            @click="importFromClipboard"
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
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          </button>
          <button
            class="copy-btn btn"
            title="Copy to Clipboard"
            @click="copyToClipboard"
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
                d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
              />
            </svg>
          </button>
          <ThemeToggle />
        </div>
      </Transition>
    </div>
  </header>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useUiStore } from "@/stores/ui";
import { useTodosStore } from "@/stores/todos";
import ThemeToggle from "../components/ThemeToggle.vue";

export default {
  components: {
    ThemeToggle,
  },

  methods: {
    ...mapActions(useUiStore, ["toggleSettings"]),
    ...mapActions(useTodosStore, ["copyToClipboard", "importFromClipboard"]),
  },

  computed: {
    ...mapState(useUiStore, ["showSettings"]),
  },
};
</script>

<style lang="scss" scoped>
.header {
  padding-top: 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr 3rem;
}

.h1 {
  font-size: 2rem;
  line-height: 1;
  color: var(--primary-color);
  grid-area: 1 / 1 / auto / span 2;
  justify-self: start;
  opacity: 1;
  transition: opacity 300ms ease;
}

.mobile-hidden {
  opacity: 0;
}

.settings-btn {
  place-self: center end;
  grid-column-start: 3;
  transform: rotate(0);
  transition: transform 150ms ease;

  &.rotate {
    transform: rotate(90deg);
  }

  &:hover,
  &:focus {
    color: var(--primary-color);
    outline: none;
  }
}

.settings-wpr {
  grid-area: 1 / 1 / 1 / 3;
  position: relative;
  min-height: 2rem;

  & > * {
    display: flex;
    justify-content: end;
    gap: 1rem;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .btn {
    width: 3rem;
    display: grid;
    place-items: center;
    transform: translateY(0);
    transition: transform 200ms ease;

    &:hover,
    &:focus {
      outline: none;
      transform: translateY(-0.2rem);
      color: var(--primary-color-light);
    }
  }
}

.fade-down-enter-active,
.fade-down-leave-active {
  transition: all 300ms ease-in;
}

.fade-down-enter-from,
.fade-down-leave-to {
  opacity: 0;
  transform: translateX(3rem);
}

@media (min-width: 768px) {
  .header {
    padding-top: 2rem;
    grid-row-gap: 1rem;
    grid-template-columns: repeat(3, 1fr);
  }

  .h1 {
    font-size: 2.75rem;
    grid-column-start: 2;
    grid-area: 1 / 2;
    justify-self: center;
  }

  .settings-wpr {
    min-height: 2rem;
    grid-area: 2 / 1 / 2 / 4;

    & > * {
      justify-content: center;
    }
  }

  .mobile-hidden {
    opacity: 1;
  }

  .fade-down-enter-from,
  .fade-down-leave-to {
    opacity: 0;
    transform: translateY(-0.5rem);
  }
}
</style>
