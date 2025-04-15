<script lang="ts">
import { inject, ref } from "vue";
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

export default {
  name: "LoginPage",
  setup() {
    const moodo = inject('moodo');
    const api = moodo.Services;
    const authStore = useAuthStore();

    const router = useRouter();

    const email = ref("");
    const password = ref("");
    const errorMessage = ref("");

    const handleLogin = async () => {
      try {
        const response = await api.client.auth.login({
          url: "/auth/login",
          data: {
            email: email.value,
            password: password.value,
          }
        });

        if (response.data) {
          authStore.setUserLoginStatus(true);

          router.push({ name: 'home' });
        }
      } catch (error) {
        console.error("Login failed:", error);
        errorMessage.value = "Login failed. Please check inputs!";
      }
    };

    return {
      email,
      password,
      errorMessage,
      handleLogin,
    };
  },
};
</script>

<template>
  <div class="login-page">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="email">E-posta</label>
        <input type="email" id="email" v-model="email" placeholder="Type email" required />
      </div>
      <div class="form-group">
        <label for="password">Şifre</label>
        <input type="password" id="password" v-model="password" placeholder="Type password" required />
      </div>
      <button type="submit">Giriş Yap</button>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<style scoped>
.login-page {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h1 {
  font-size: 2rem;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.error {
  color: red;
  margin-top: 10px;
}
</style>
