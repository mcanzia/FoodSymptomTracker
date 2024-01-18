<template>
      <nav>
            <ul>
              <li id="logoButton">
                <a @click="redirectToHome()" class="title"><b>LOGO</b></a>
              </li>
              <li id="logsButton">
                <a @click="redirectToHome()">Logs</a>
              </li>
              <li id="layoutButton" @click="redirectToLayout()">
                <a v-if="userStore.isLoggedIn">Layout</a>
              </li>
              <li id="summaryButton" @click="redirectToSummary()">
                <a v-if="userStore.isLoggedIn">Summary</a>
              </li>
              <li id="settingsButton" @click="redirectToProfile()">
                <a v-if="userStore.isLoggedIn">Settings</a>
              </li>
            </ul>
      </nav>
</template>

<script setup>
import router from "../router/index";
import { useUserStore } from "../stores/userStore";

const userStore = useUserStore();

function redirectToProfile() {
  router.push({ name: 'profile' })
}

function redirectToHome() {
  router.push({ name: 'home' })
}

function redirectToLayout() {
  router.push({ name: 'layout' })
}

function redirectToSummary() {
  router.push({ name: 'summary'})
}

</script>

<style scoped>
nav {
  width: 100%;
  background-color: #143542;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  background-color: #143542;
}

li a {
  display: block;
  color: #ffffff;
  text-align: left;
  padding: 1em;
  font-family: Lato, sans-serif;
  cursor: pointer;
  transition: color 0.3s ease, background-color 0.3s ease;
}

.title {
  font-size: x-large;
}

</style>