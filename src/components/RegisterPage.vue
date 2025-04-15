<script lang="ts">
import { defineComponent, inject, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

export default defineComponent({
  name: 'RegisterPage',
  setup() {
    const moodo = inject('moodo');
    const api = moodo.Services;
    const authStore = useAuthStore();

    const router = useRouter();

    const name = ref('');
    const email = ref('');
    const password = ref('');
    const errorMessage = ref("");

    const register = async () => {
      try {
        const response = await api.client.auth.register({
          url: "/users",
          data: {
            name: name.value,
            email: email.value,
            password: password.value,
            avatar: "https://picsum.photos/800"
          }
        });

        if (response.data) {
          console.log(response.data);
          authStore.setUserLoginStatus(true);

          router.push({ name: 'home' });
        }
      } catch (error) {
        console.error("Registration failed:", error);
        errorMessage.value = "Registration failed. Please check inputs!";
      }
    };

    return {
      name,
      email,
      password,
      errorMessage,
      register,
    };
  },
});
</script>

<template>
  <div class="register-page">
    <h1>Register</h1>
    <form @submit.prevent="register">
      <div class="form-group">
        <label for="name">Name:</label>
        <input id="name" v-model="name" type="text" placeholder="Type your name..." required />
      </div>
      <div class="form-group">
        <label for="email">E-mail:</label>
        <input id="email" v-model="email" type="email" placeholder="Type your email..." required />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input id="password" v-model="password" type="password" placeholder="Type your password..." required />
      </div>
      <button type="submit">Register</button>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<style scoped>
.register-page {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
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
