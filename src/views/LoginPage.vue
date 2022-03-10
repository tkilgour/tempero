<template>
  <h1>Log In</h1>
  <form @submit.prevent="login">
    <input type="text" placeholder="Email" v-model="email" />
    <input type="password" placeholder="Password" v-model="password" />
    <button type="submit">Submit</button>
  </form>
  <p v-if="errorMessage">{{ errorMessage }}</p>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const errorMessage = ref();
const router = useRouter();
const auth = getAuth();

const login = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      console.log("Successfully logged in!");
      router.push({ name: "Feed" });
    })
    .catch((error) => {
      switch (error.code) {
        case "auth/invalid-email":
          errorMessage.value = "Invalid email";
          break;
        case "auth/user-not-found":
          errorMessage.value = "No account with that email was found";
          break;
        case "auth/wrong-password":
          errorMessage.value = "Incorrect password";
          break;
        default:
          errorMessage.value = "Email or password was incorrect";
          break;
      }
    });
};
</script>
