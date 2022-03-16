<template>
  <nav>
    <router-link :to="{ name: 'Home' }">Home</router-link>
    <router-link :to="{ name: 'Feed' }">Feed</router-link>
    <span v-if="isLoggedIn"><button @click="logout">Logout</button></span>
    <span v-else>
      <router-link :to="{ name: 'Register' }">Register</router-link>
      <router-link :to="{ name: 'Login' }">Login</router-link>
    </span>
  </nav>
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

<style>
* {
  -webkit-tap-highlight-color: transparent;
}

#app {
  height: 100%;
}

:root {
  --primary-color: hsl(216, 69%, 69%);
  --primary-color-light: hsl(216, 69%, 80%);
  --low-priority-color: hsl(218, 11%, 65%);
  --highlight-color: hsl(216, 12%, 84%);
  --highlight-color-focus: hsl(217, 26%, 41%);
}
</style>
