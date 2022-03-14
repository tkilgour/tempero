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

html,
body,
#app,
main {
  min-height: 100%;
}

:root {
  --highlight-color: rgb(209 213 219);
  --highlight-color-focus: rgb(77, 98, 131);
}
</style>
