<script setup lang="ts">
import { inject, onMounted, ref, useTemplateRef } from 'vue';
import { useAuthStore } from './stores/auth';

const authStore = useAuthStore();
const moodo = inject('moodo');
const clientService = moodo.Services;

clientService.client.setStorageType({
  storage: 'localStorage'
});
const storage = clientService.client.getStorage('storage');

const newAT = useTemplateRef<HTMLPreElement>('newAT');
const newRT = useTemplateRef<HTMLPreElement>('newRT');
const prevAT = useTemplateRef<HTMLPreElement>('prevAT');
const prevRT = useTemplateRef<HTMLPreElement>('prevRT');

let handleLogout: () => void;
let handleRefreshTokens: () => Promise<void>;
const showTokensDiv = ref(false);

onMounted(() => {
  handleLogout = () => {
    storage.remove('accessToken');
    storage.remove('refreshToken');
    authStore.setUserLoginStatus(false);
  };

  handleRefreshTokens = async () => {
    const previousAT = storage.get('accessToken');
    const previousRT = storage.get('refreshToken');

    const response = await clientService.client.auth.refreshToken({
      url: "/auth/refresh-token",
      data: {
        refreshToken: storage.get('refreshToken')
      }
    });

    if (response.data) {
      showTokensDiv.value = true;
      if (prevAT.value && prevRT.value) {
        prevAT.value.style.display = "block";
        prevRT.value.style.display = "block";

        prevAT.value.innerText = previousAT;
        prevRT.value.innerText = previousRT;
      }

      if (newAT.value && newRT.value) {
        newAT.value.style.display = "block";
        newRT.value.style.display = "block";

        newAT.value.innerText = response.data.access_token;
        newRT.value.innerText = response.data.refresh_token;
      }
    }
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
        <span v-show="authStore.userLoggedIn === true" @click="handleRefreshTokens">
          <a href="#">Refresh Tokens</a>
        </span>
      </nav>
    </div>
  </header>

  <router-view />
  <br>
  <div class="token-field" v-if="authStore.userLoggedIn === true">
    <span>
      <span>Exist Access Token;</span>
      <pre class="previousAT" ref="prevAT"></pre>
      <br>
      <span>Exist Refresh Token;</span>
      <pre class="previousRT" ref="prevRT"></pre>
    </span>
    <br>
    <span>
      <span>New Access Token;</span>
      <pre class="newAToken" ref="newAT"></pre>
      <br>
      <span>New Refresh Token;</span>
      <pre class="newRToken" ref="newRT"></pre>
    </span>
  </div>
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

.token-field,
.token-field pre {
  border: 1px dotted white;
  padding: 10px;
}

.token-field span {
  font-weight: 700;
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
