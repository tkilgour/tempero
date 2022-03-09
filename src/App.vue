<script>
export default {};
</script>

<template>
  <nav>
    <router-link :to="{ name: 'Home' }">Home</router-link>
    <router-link :to="{ name: 'Feed' }">Feed</router-link>
    <router-link :to="{ name: 'Register' }">Register</router-link>
    <router-link :to="{ name: 'Login' }">Login</router-link>
  </nav>
  <router-view></router-view>
</template>

<style>
* {
  -webkit-tap-highlight-color: transparent;
}
</style>
