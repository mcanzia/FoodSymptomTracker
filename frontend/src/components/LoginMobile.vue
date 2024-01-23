<template>
    <div class="flex-column primary-background-color">
        <div class="form-wrapper">
            <h1>{{ newUser ? 'Create Your Account' : 'Alimenti' }}</h1>
            <label id="email-label" for="email-input"><b>Email</b></label>
            <input type="email" id="email-input" placeholder="Enter email" v-model="loginForm.email" required ref="emailInputRef">
            <label id="password-label" for="password-input"><b>Password</b></label>
            <input type="password" id="password-input" placeholder="Enter password" v-model="loginForm.password" required ref="passwordInputRef">
            <label v-if="newUser" id="confirm-password-label" for="confirm-password-input"><b>Confirm Password</b></label>
            <input v-if="newUser" type="password" id="confirm-password-input" placeholder="Enter password" v-model="loginForm.confirmPassword" required ref="confirmPasswordInputRef">
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
            <a href="#" @click="sendPasswordResetEmail()">Forgot password?</a>
            <!-- <a href="#" @click="signInAnonymously()">Try it out?</a> -->
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '../stores/userStore';

const userStore = useUserStore();

const newUser = ref(false);
const loading = ref(false);
const errorMessage = ref(false);
let loginForm = {
    email: '',
    password: '',
    confirmPassword: ''
}

const emailInputRef = ref(null);
const passwordInputRef = ref(null);
const confirmPasswordInputRef = ref(null);


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
            if (validateRegistrationForm()) {
                userStore.registerUser(loginForm.email, loginForm.password);
            }
        } else {
            if (validateLoginForm()) {
                userStore.loginUser(loginForm.email, loginForm.password);
            }
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

function sendPasswordResetEmail() {
    if (validateEmailField()) {
        userStore.sendPasswordResetEmail(loginForm.email);
    }
}

function validateLoginForm() {
    return validateEmailField() && validatePasswordField();
}

function validateRegistrationForm() {
    return validateEmailField() && validatePasswordField() && validateConfirmPasswordField();
}

function validateEmailField() {
    if (loginForm.email === null || loginForm.email === "") {
        setWarningMessage(emailInputRef.value, "Email field is required");
        return false;
    }
    let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!regex.test(loginForm.email)) {
        setWarningMessage(emailInputRef.value, "Email field is improper format");
        return false;
    }
    return true;
}

function validatePasswordField() {
    if (loginForm.password === null || loginForm.password === "") {
        setWarningMessage(passwordInputRef.value, "Password field is required");
        return false;
    }
    if (loginForm.password.length < 6) {
        setWarningMessage(passwordInputRef.value, "Password must be longer than 6 characters");
        return false;
    }
    return true;
}

function validateConfirmPasswordField() {
    if (loginForm.confirmPassword === null || loginForm.confirmPassword === "") {
        setWarningMessage(confirmPasswordInputRef.value, "Confirm password field is required");
        return false;
    }
    if (loginForm.confirmPassword.length < 6) {
        setWarningMessage(confirmPasswordInputRef.value, "Password must be longer than 6 characters");
        return false;
    }
    if (loginForm.confirmPassword !== loginForm.password) {
        setWarningMessage(confirmPasswordInputRef.value, "Passwords must match");
        return false;
    }
    return true;
}

function setWarningMessage(refTarget, message) {
  refTarget.setCustomValidity(message);
  refTarget.reportValidity();
  setTimeout(() => {
    refTarget.setCustomValidity("");
  },2000);
}

</script>

<style scoped>
.flex-column {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 93vh;
    width: 80vw;
    padding: 0px 20px;
}

.form-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    gap: 20px;
    flex-grow: 1;
}

.spacer {
    flex-grow: 1;
}

h1 {
    color: #FFFFFF;
    font-family: 'Nickainley', Helvetica, Arial, sans-serif;
    font-size: 500%;
    margin: 0;
    margin-top: 10px;
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