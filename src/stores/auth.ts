import { defineStore } from 'pinia'

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    userLoggedIn: false,
  }),
  actions: {
    setUserLoginStatus(status: boolean) {
      this.userLoggedIn = status
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'authStore',
        storage: localStorage,
      },
    ],
  },
})
