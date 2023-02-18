<template>
  <div>
    <Navbar />
      <template>
          <div v-if="userStore.isLoggedIn">
              <router-view />
          </div>
          <Login v-else />
      </template>
  </div>
</template>

<script>
import Login from './components/Login.vue';
import Navbar from './components/Navbar.vue';
import { useUserStore } from './stores/userStore';
export default {
  name: 'App',
  components: {
    Login,
    Navbar
  },
  setup() {
    const userStore = useUserStore()

    return {
        userStore,
    }
  },
  created() {
    this.userStore.initalizeAuthListener();
  }
}
</script>

<style>

</style>