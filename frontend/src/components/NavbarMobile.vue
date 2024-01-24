<template>
    <nav>
          <ul>
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
width: 100vw;
background-color: #143542;
}

ul {
list-style-type: none;
margin: 0;
padding: 0;
display: flex;
justify-content: space-evenly;
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

ul > li:first-of-type {
    background-color: #846F91;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
}

</style>