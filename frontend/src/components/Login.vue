<template>
        <div class="container">
            <div class="flex-column primary-background-color">
                    <h1>{{ newUser ? 'Create Your Account' : 'Logo' }}</h1>
                    <label id="email-label" for="email-input"><b>Email</b></label>
                    <input type="email" id="email-input" placeholder="Enter email" v-model="loginForm.email" required>
                    <label id="password-label" for="password-input"><b>Password</b></label>
                    <input type="password" id="password-input" placeholder="Enter password" v-model="loginForm.password" required>
                    <label v-if="newUser" id="confirm-password-label" for="confirm-password-input"><b>Confirm Password</b></label>
                    <input v-if="newUser" type="password" id="confirm-password-input" placeholder="Enter password" v-model="loginForm.confirmPassword" required>
                    <button @click="signInOrCreateUser()" class="default-button">{{ newUser ? 'Register' : 'Login' }}</button>
                    <button class="accent-button" @click="toggleNewUser()">{{ newUser ? 'Already have an account?' : 'Don\'t have an account?' }}</button>
                    <button class="default-button" @click="googleSignIn()">{{ newUser ? 'Sign up with Google' : 'Sign in with Google' }}</button>
                    <p class="error-text" v-if="errorMessage">{{ errorMessage }}</p>
                <div class="link-container">
                    <a href="#">Forgot password?</a>
                    <a href="#" @click="signInAnonymously()">Try it out?</a>
                </div>
            </div>
            <div class="flex-column">
                <img :src="backgroundImage" />
            </div>
        </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '../stores/userStore';
import backgroundImage from '../assets/beaver.png';

const userStore = useUserStore();

const newUser = ref(false);
const loading = ref(false);
const errorMessage = ref(false);
let loginForm = {
    email: '',
    password: '',
    confirmPassword: ''
}

//Functions
async function signInAnonymously() {
    errorMessage.value = '';
    await userStore.loginUserAnonymously();
}

async function signInOrCreateUser() {
    loading.value = true;
    errorMessage.value = '';
    try {
        if (newUser.value) {
            if (loginForm.confirmPassword && loginForm.password === loginForm.confirmPassword) {
                userStore.registerUser(loginForm.email, loginForm.password);
            } else {
                throw new Error("Passwords do not match");
            }
        } else {
            userStore.loginUser(loginForm.email, loginForm.password);
        }
    } catch (error) {
        errorMessage.value = error.message;
    }

    loading.value = false;
}

async function googleSignIn() {
    errorMessage.value = '';
    try {
        await userStore.loginUserGoogle();
    } catch (error) {
        errorMessage.value = error.message;
    }
}

function onReset() {
    loginForm.email = '';
    loginForm.password = '';
    loginForm.confirmPassword = '';
}

function toggleNewUser() {
    newUser.value = !newUser.value;
}

</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: stretch;
  padding: 0px;
  height: 100vh;
  overflow: hidden;
}

.flex-column:first-of-type {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    height: 100%;
    padding: 0px 50px 50px 50px;
}
.link-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0px 20px;
  }

a {
    color: #FFFFFF;
    margin-bottom: 20px;
}

form label {
    text-align: left;
    padding: 10px;
}

input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom: 16px;
  resize: vertical
}

.error-text{
    color: red;
}

h1 {
    color: #FFFFFF;
}

img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
}

</style>