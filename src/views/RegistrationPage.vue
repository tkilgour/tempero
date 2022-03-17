<template>
  <h1>Create an Account</h1>
  <form @submit.prevent="register">
    <input type="text" placeholder="Email" v-model="email" />
    <input type="password" placeholder="Password" v-model="password" />
    <button type="submit">Submit</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const router = useRouter();
const auth = getAuth();

const register = () => {
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      console.log("Successfully registered!");
      router.push({ name: "Home" });
    })
    .catch((error) => {
      console.error(error.code, error.message);
    });
};
</script>
