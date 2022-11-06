<template>
  <div>
    <Navbar />
    <User>
      <template v-slot:user="{ user }">
          <div v-if="user">
              <router-view />
          </div>
          <Login v-else />
      </template>
    </User>
    
  </div>
</template>

<script>
import User from './components/User.vue';
import Login from './components/Login.vue';
import Navbar from './components/Navbar.vue';
export default {
  name: 'App',
  components: {
    User,
    Login,
    Navbar
  }
}
</script>

<style>

</style>
