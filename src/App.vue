<template>
  <router-view></router-view>
</template>

<style lang="scss">
* {
  -webkit-tap-highlight-color: transparent;
}

html,
body,
#app {
  height: 100%;
  background-color: var(--bg-color);
  transition: background-color 500ms ease;
  color: var(--text-color);
}

:root {
  --transition-timing: 200ms;

  &[data-theme="light"] {
    --bg-color: hsl(0, 0%, 100%);
    --text-color: hsl(0, 0%, 9%);
    --primary-color: hsl(209, 62%, 45%);
    --primary-color-light: hsl(209, 62%, 65%);
    --low-priority-color: hsl(218, 11%, 65%);
    --highlight-color: hsl(210, 2%, 66%);
  }

  &[data-theme="dark"] {
    --bg-color: hsl(218, 23%, 23%);
    --text-color: hsl(0, 0%, 90%);
    --primary-color: hsl(0, 97%, 85%);
    --primary-color-light: hsl(0, 97%, 90%);
    --low-priority-color: hsl(218, 11%, 65%);
    --highlight-color: hsl(210, 2%, 76%);

    color-scheme: dark;
  }
}

@media screen and (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.001ms !important;
    transition-duration: 0.001ms !important;
  }
}
</style>
