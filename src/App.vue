<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth';

const authStore = useAuthStore();
let handleLogout: () => void;

onMounted(() => {
  handleLogout = () => {
    authStore.setUserLoginStatus(false);
  };
});
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <nav>
        <router-link to="/">Home</router-link>
        <router-link v-show="authStore.userLoggedIn === false" to="/login">Login</router-link>
        <router-link v-show="authStore.userLoggedIn === false" to="/register">Register</router-link>
        <span v-show="authStore.userLoggedIn === true" @click="handleLogout"><a href="#">Logout</a></span>
      </nav>
    </div>
  </header>

  <router-view />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
  display: flex;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
    position: absolute;
    top: 30px;
    left: 30px;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
