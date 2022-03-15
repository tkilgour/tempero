<template>
  <button
    class="theme-toggle"
    :aria-label="`Switch to ${this.theme === 'light' ? 'dark' : 'light'} theme`"
    @click="toggleTheme"
  >
    <Transition name="sunset">
      <svg
        v-if="theme === 'dark'"
        key="moon"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="icon"
      >
        <title>Switch to Light Theme</title>
        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
      </svg>
      <svg
        v-else
        key="sun"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="icon"
      >
        <title>Switch to Dark Theme</title>
        <circle cx="12" cy="12" r="5" />
        <path
          d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
        />
      </svg>
    </Transition>
  </button>
</template>

<script>
export default {
  data() {
    return {
      theme: null,
    };
  },

  methods: {
    toggleTheme() {
      this.theme = this.theme === "dark" ? "light" : "dark";
      localStorage.setItem("theme", this.theme);
      document.querySelector(":root").setAttribute("data-theme", this.theme);
    },

    getPreferedColorScheme() {
      return window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    },
  },

  created() {
    this.theme = localStorage.getItem("theme");
    if (!this.theme) {
      this.theme = this.getPreferedColorScheme();
    }
  },

  mounted() {
    document.querySelector(":root").setAttribute("data-theme", this.theme);
  },
};
</script>

<style lang="scss" scoped>
.theme-toggle {
  position: relative;
  padding-bottom: 4px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 3rem;
  height: 2rem;
  overflow: hidden;

  .icon {
    position: absolute;
  }

  transform: translateY(0);
  transition: transform 200ms ease;

  &:hover,
  &:focus {
    outline: none;
    transform: translateY(-0.2rem);
    color: var(--primary-color-light);
  }
}

.sunset-enter-active,
.sunset-leave-active {
  transition: transform 500ms ease-in-out;
}

.sunset-enter-from {
  transform: rotate(-70deg) translate(-40px, 10px);
}

.sunset-leave-to {
  transform: rotate(70deg) translate(40px, 10px);
}
</style>
