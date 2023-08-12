<template>
        <div class="container">
            <div class="flex-item" v-if="!emailSignIn">
                <h1>{{ newUser ? 'Create Your Account' : 'Welcome Back' }}</h1>
                <label id="email-label" for="email-input"><b>Email</b></label>
                <input type="email" id="email-input" placeholder="Enter email" v-model="loginForm.email" required>
                <button @click="toggleEmailForm()">Continue</button><br><br>
                <a href="#" @click="toggleNewUser()">{{ newUser ? 'Already have an account?' : 'Don\'t have an account?' }}</a><br><br>
                <hr class="solid"><br>
                <button @click="googleSignIn()">{{ newUser ? 'Sign up with Google' : 'Sign in with Google' }}</button><br><br>
                <button @click="signInAnonymously()">Sign In Anonymously</button><br><br>
                <br>
                <p class="error-text" v-if="errorMessage">{{ errorMessage }}</p>
            </div>

            <div class="flex-item" v-if="emailSignIn">
                <h1>{{ newUser ? 'Create Your Account' : 'Enter Your Password' }}</h1>
                <form @submit="signInOrCreateUser()" @reset="onReset()">
                    <label id="email-label" for="email-input"><b>Email</b></label>
                    <input type="email" id="email-input" placeholder="Enter email" v-model="loginForm.email" required>
                    <br><br>
                    <label id="password-label" for="password-input"><b>Password</b></label>
                    <input type="password" id="password-input" placeholder="Enter password" v-model="loginForm.password" required>
                    <br><br>
                    <label v-if="newUser" id="confirm-password-label" for="confirm-password-input"><b>Confirm Password</b></label>
                    <input v-if="newUser" type="password" id="confirm-password-input" placeholder="Enter password" v-model="loginForm.confirmPassword" required>
                    <br><br>
                    <button type="submit">Submit</button>
                    <button type="reset">Reset</button>
                </form>
                <br>
                <a href="#" @click="toggleEmailForm()">See all sign in options</a>
                <br>
                <p class="error-text" v-if="errorMessage">{{ errorMessage }}</p>
            </div>
        
        </div>


</template>

<script setup>
import {auth, db} from '../firebase';
import { useUserStore } from '../stores/userStore';

const userStore = useUserStore();

let newUser = false;
let emailSignIn = false;
let loading = false;
let errorMessage = false;
let loginForm = {
    email: '',
    password: '',
    confirmPassword: ''
}

//Functions
async function signInAnonymously() {
    errorMessage = '';
    await userStore.loginUserAnonymously();
}

async function signInOrCreateUser() {
    loading = true;
    errorMessage = '';
    try {
        if (newUser) {
            if (loginForm.confirmPassword && loginForm.password === loginForm.confirmPassword) {
                userStore.registerUser(loginForm.email, loginForm.password);
            } else {
                throw new Error("Passwords do not match");
            }
        } else {
            userStore.loginUser(loginForm.email, loginForm.password);
        }
    } catch (error) {
        errorMessage = error.message;
    }

    loading = false;
}

async function googleSignIn() {
    errorMessage = '';
    try {
        await userStore.loginUserGoogle();
    } catch (error) {
        errorMessage = error.message;
    }
}

function onReset() {
    loginForm.email = '';
    loginForm.password = '';
    loginForm.confirmPassword = '';
}

function toggleEmailForm() {
    if (emailSignIn) {
        onReset();
    }
    emailSignIn = !emailSignIn;
}

function toggleNewUser() {
    newUser = !newUser;
}

</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px;
}
.flex-item {
  text-align: center;
  flex: 0 0 50%;
  border-radius: 25px;
  background-color: white;
  padding: 50px;
}

h1 {
    font-family: garamond;
}

a {
    color: black
}

a:link, a:visited, a:hover, a:active {
    text-decoration: none;
}

button {
    border-radius: 25px;
    background-color: lightblue;
    cursor: pointer;
}

button:hover {
    background-color: lightgreen;
}

.flex-item button {
    height: 50px;
    width: 250px;
}

form button {
    border-radius: 25px;
    height: 20px;
    width: 100px;
    background-color: lightblue;
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

hr.solid {
  border-top: 1px solid black;
  width: 250px;
}

.error-text{
    color: red;
}

</style>