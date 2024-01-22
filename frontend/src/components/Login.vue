<template>
        <div class="container">
            <div class="flex-column primary-background-color">
                <div class="form-wrapper">
                    <h1>{{ newUser ? 'Create Your Account' : 'Alimenti' }}</h1>
                    <label id="email-label" for="email-input"><b>Email</b></label>
                    <input type="email" id="email-input" placeholder="Enter email" v-model="loginForm.email" required>
                    <label id="password-label" for="password-input"><b>Password</b></label>
                    <input type="password" id="password-input" placeholder="Enter password" v-model="loginForm.password" required>
                    <label v-if="newUser" id="confirm-password-label" for="confirm-password-input"><b>Confirm Password</b></label>
                    <input v-if="newUser" type="password" id="confirm-password-input" placeholder="Enter password" v-model="loginForm.confirmPassword" required>
                    <button @click="signInOrCreateUser()" class="default-button">{{ newUser ? 'Register' : 'Login' }}</button>
                    <button class="accent-button" @click="toggleNewUser()">{{ newUser ? 'Already have an account?' : 'Don\'t have an account?' }}</button>
                    <button v-if="!newUser" class="google-signin" @click="googleSignIn()">
                        <ion-icon name="logo-google"></ion-icon>
                        <span>Sign in with Google</span>
                    </button>
                    <p class="error-text" v-if="errorMessage">{{ errorMessage }}</p>
                </div>
                <div class="spacer"></div>
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
  overflow-y: none;
}

.flex-column:first-of-type {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 99%;
    width: 80%;
    padding: 0px 20px;
}

.form-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    gap: 20px;
    flex-grow: 1;
}

.spacer {
    flex-grow: 1;
}

.flex-column:last-of-type {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}

h1 {
    color: #FFFFFF;
    font-family: 'Nickainley', Helvetica, Arial, sans-serif;
    font-size: 500%;
    margin: 0;
    margin-top: 10px;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
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

button {
    min-height: 50px;
    max-height: 50px;
    min-width: 45%;
    font-size: large;
}
.google-signin {
    height: 50px;
    width: 250px;
    border-radius: 10px;
    background-color: #FFFFFF;
    border: solid #FFFFFF;
    font-family: Lato, sans-serif;
    font-size: large;
    color: #333;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
}

.google-signin > ion-icon {
    color: #1b63c1;
}

.google-signin:hover {
    background-color: #423748;
    border: #423748;
    color: #FFFFFF;
}

input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 10px;
  max-width: 65%;
  min-width: 65%;
  resize: vertical
}

.error-text{
    color: red;
}



</style>