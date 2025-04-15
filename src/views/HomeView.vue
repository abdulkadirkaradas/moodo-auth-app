<script setup lang="ts">
import IndexPage from "../components/IndexPage.vue";
import GuestPage from "../components/GuestPage.vue";
import { useAuthStore } from "../stores/auth";

const authStore = useAuthStore();

</script>

<template>
  <main>
    <IndexPage v-if="authStore.userLoggedIn === true" />
    <GuestPage v-else />
  </main>
</template>
