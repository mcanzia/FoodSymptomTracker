<template>
      <nav>
            <ul>
              <li>
                <a @click="redirectToHome()">Food Log</a>
              </li>
              <li id="layoutButton" @click="redirectToLayout()">
                <a v-if="userStore.isLoggedIn">Layout</a>
              </li>
              <li id="summaryButton" @click="redirectToSummary()">
                <a v-if="userStore.isLoggedIn">Summary</a>
              </li>
              <li id="userButton" class="dropdown">
                <a class="dropbtn">User</a>
                <div class="dropdown-content">
                  <ul>
                    <li><a @click="redirectToProfile()">Profile</a></li>
                    <li><a @click="logout()">Sign Out</a></li>
                  </ul>
                </div>
              </li>
            </ul>
      </nav>
</template>

<script setup>

import { auth } from "../firebase";
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

function logout() {
  this.userStore.logoutUser();
}

</script>

<style scoped>
nav {
  width: 100%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Gives a slight elevation feel */
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex; /* makes the navbar items align nicely */
  justify-content: space-between; /* distribute items evenly */
  background-color: #2c3e50;
}

li {
  flex-grow: 1; /* grow items to take up space */
  text-align: center;
  margin: 0.5em 0; /* add some vertical margin */
}

li a {
  display: block;
  color: #ffffff;
  text-align: center;
  padding: 1em 2em; /* more padding - particularly horizontally */
  text-decoration: none;
  font-family: Arial, sans-serif; /* simple, clean font */
  transition: color 0.3s ease, background-color 0.3s ease; /* transitions for smooth hover effects */
}

li a:hover, .dropdown-content a:hover {
  color: #04AA6D; /* color transition on hover */
  background-color: #34495e;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
  transition: background-color 0.3s ease; /* transitions for smooth hover effects */
}

.dropdown:hover .dropdown-content {
  display: block;
}
</style>