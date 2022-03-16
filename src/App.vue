<template>
  <!-- <nav>
    <router-link :to="{ name: 'Home' }">Home</router-link>
    <router-link :to="{ name: 'Feed' }">Feed</router-link>
    <span v-if="isLoggedIn"><button @click="logout">Logout</button></span>
    <span v-else>
      <router-link :to="{ name: 'Register' }">Register</router-link>
      <router-link :to="{ name: 'Login' }">Login</router-link>
    </span>
  </nav> -->
  <router-view></router-view>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "vue-router";

const router = useRouter();
const isLoggedIn = ref(true);
const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  if (user) {
    isLoggedIn.value = true; // if we have a user
  } else {
    isLoggedIn.value = false; // if we do not
  }
});
const logout = async () => {
  await signOut(auth);
  router.push("/");
};
</script>

<style lang="scss">
* {
  -webkit-tap-highlight-color: transparent;
}

html,
body,
#app {
  height: 100%;
  background-color: var(--bg-color);
  transition: color 700ms ease, background-color 700ms ease;
  color: var(--text-color);
}

:root {
  &[data-theme="light"] {
    --bg-color: hsl(0, 0%, 100%);
    --text-color: hsl(0, 0%, 9%);
    --primary-color: hsl(209, 62%, 50%);
    --primary-color-light: hsl(209, 62%, 60%);
    --low-priority-color: hsl(218, 11%, 65%);
    --highlight-color: hsl(216, 12%, 84%);
    --highlight-color-focus: hsl(217, 26%, 41%);
  }

  &[data-theme="dark"] {
    --bg-color: hsl(218, 23%, 23%);
    --text-color: hsl(0, 0%, 72%);
    --primary-color: hsl(0, 97%, 85%);
    --primary-color-light: hsl(0, 97%, 90%);
    --low-priority-color: hsl(218, 11%, 65%);
    --highlight-color: hsl(216, 75%, 29%);
    --highlight-color-focus: hsl(217, 26%, 41%);

    color-scheme: dark;
  }
}
</style>
