<template>
  <div>
    <ErrorToast id="error-notification" aria-label="error-notification"></ErrorToast>
    <div v-if="!userStore.isLoading && userStore.isLoggedIn">
        <Navbar />
        <div class="display-box">
          <router-view />
        </div>
    </div>
    <Login v-else-if="!userStore.isLoading" />
    <div v-else class="center">
        <Spinner />
    </div>
  </div>
</template>

<script setup>
import Login from './components/Login.vue';
import Navbar from './components/Navbar.vue';
import Spinner from './components/Spinner.vue';
import ErrorToast from './components/ErrorToast.vue';
import { useUserStore } from './stores/userStore';

const userStore = useUserStore();
userStore.initalizeAuthListener();

</script>

<style>
body {
  background-color:#143542;
  margin: 0;
}

.center {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.display-box {
  background-color: #D9D9D9;
  padding-left: 20px;
  padding-right: 20px;
  margin: 0 auto;
  border-radius: 10px;
  width: 100%;
  max-width: 95%;
  box-sizing: border-box;
}

</style>