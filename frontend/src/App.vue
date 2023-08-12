<template>
  <div>
    <div v-if="!userStore.isLoading && userStore.isLoggedIn">
        <Navbar />
        <router-view />
    </div>
    <Login v-else-if="!userStore.isLoading" />
    <div v-else class="center">
        <Spinner />
    </div>
  </div>
</template>

<script>
import Login from './components/Login.vue';
import Navbar from './components/Navbar.vue';
import Spinner from './components/Spinner.vue';
import { useUserStore } from './stores/userStore';
export default {
  name: 'App',
  components: {
    Login,
    Navbar,
    Spinner
  },
  setup() {
    const userStore = useUserStore()
    return {
        userStore
    }
  },
  created() {
    this.userStore.initalizeAuthListener();
  }
}
</script>

<style>
body {
  background-color:white;
  margin: 0;
}

.center {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}

</style>