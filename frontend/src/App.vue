<template>
  <div class="app-container">
    <ErrorToast id="error-notification" aria-label="error-notification"></ErrorToast>
    <SuccessToast id="success-notification" aria-label="success-notification"></SuccessToast>
    <div v-if="!userStore.isLoading && userStore.isLoggedIn && !userStore.isMobile()">
        <Navbar />
        <div class="display-box">
          <router-view />
        </div>
    </div>
    <div v-else-if="!userStore.isLoading && userStore.isLoggedIn && userStore.isMobile()">
        <div class="display-box-mobile">
          <router-view />
        </div>
        <NavbarMobile />
    </div>
    <Login v-else-if="!userStore.isLoading && !userStore.isMobile()" />
    <LoginMobile v-else-if="!userStore.isLoading && userStore.isMobile()" />
    <div v-else class="center">
        <PancakeLoader />
    </div>
  </div>
</template>

<script setup>
import Login from './components/Login.vue';
import LoginMobile from './components/LoginMobile.vue';
import Navbar from './components/Navbar.vue';
import NavbarMobile from './components/NavbarMobile.vue';
import PancakeLoader from './components/PancakeLoader.vue';
import ErrorToast from './components/ErrorToast.vue';
import SuccessToast from './components/SuccessToast.vue';
import { useUserStore } from './stores/userStore';

const userStore = useUserStore();
userStore.initalizeAuthListener();

</script>

<style>
html {
  height: 100vh;
  margin: 0;
  padding: 0;
}

body {
  background-color:#143542;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.app-container {
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
}

.center {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: #143542;
    height: 100vh;
    width: 100vw;
}

.display-box {
  background-color: #D9D9D9;
  border-radius: 10px;
  padding-left: 30px;
  padding-right: 20px;
  margin-left: auto;
  margin-right: auto;
  width: 90vw;
  max-width: 90vw;
  height: 75vh;
  max-height: 75vh;
}
.display-box-mobile {
  background-color: #D9D9D9;
  padding-left: 30px;
  top: 0;
  width: 90vw;
  max-width: 90vw;
  height: 82vh;
  max-height: 82vh;
}

@media only screen and (max-width: 770px) {
  body {
    background-color:#D9D9D9;
  }
}

</style>