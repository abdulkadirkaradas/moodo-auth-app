<script setup lang="ts">
import { inject, onMounted, useTemplateRef } from 'vue';

const moodo = inject('moodo');
const clientService = moodo.Services;

clientService.client.setStorageType({
  tokenStorage: 'localStorage'
});
const storage = clientService.client.getStorage('tokenStorage');

const newAT = useTemplateRef<HTMLPreElement>('newAT');
const newRT = useTemplateRef<HTMLPreElement>('newRT');
const prevAT = useTemplateRef<HTMLPreElement>('prevAT');
const prevRT = useTemplateRef<HTMLPreElement>('prevRT');

let handleRefreshTokens: () => Promise<void>;

onMounted(() => {
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
  <div>
    <div>
      <div class="refreshBtn disable-select" @click="handleRefreshTokens">Refresh Tokens</div>
    </div>
    <div class="token-field">
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
  </div>
</template>

<style scoped>
.token-field,
.token-field pre {
  border: 1px dotted white;
  padding: 10px;
}

.token-field span {
  font-weight: 700;
}

.refreshBtn {
  width: 120px;
  border: 1px dotted white;
  text-align: center;
  cursor: pointer;
  margin: 0 auto 30px;
}

.disable-select {
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
