<template>
    <div class="container">
        <p>Logged in as {{ auth.currentUser.displayName }}</p>
        <button @click="logout()">Sign Out</button>
    </div>
</template>

<script setup>
import { auth } from "../firebase";
import { useUserStore } from "../stores/userStore";

const userStore = useUserStore();

const props = defineProps({
    user: Object
})

function logout() {
  userStore.logoutUser();
}

</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-content: left;
    font-family: Lato, sans-serif;
}

button {
  padding: 8px 16px;
  font-size: 16px;
  color: white;
  background-color: #846F91;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-bottom: 10px;
}

</style>