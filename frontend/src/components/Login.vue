<template>
    <b-container>
        <b-row>
            <b-col></b-col>
            <b-col>
                <aside>
                    <b-card
                        title="Welcome Back"
                        style="max-width: 20rem;"
                        class="text-center"
                        v-if="!emailSignIn && !newUser"
                    >
                        <b-button @click="googleSignIn()" pill variant="outline-primary">Sign In with Google</b-button><br><br>
                        <b-button @click="testFacebook()" pill variant="outline-primary">Sign In with Facebook</b-button><br><br>
                        <b-button @click="toggleEmailForm()" pill variant="outline-primary">Sign In with Email</b-button><br><br>
                        <b-button @click="signInAnonymously()" pill variant="outline-primary">Sign In Anonymously</b-button><br><br>

                        <a href="#" @click="newUser = true">New User?</a>
                    </b-card>

                    <b-card
                        title="Sign In with Email"
                        style="max-width: 20rem;"
                        class="text-center"
                        v-if="emailSignIn && !newUser"
                    >
                        <b-form @submit="signInOrCreateUser()" @reset="onReset()">
                            <b-form-group id="email-label" label="Email" label-for="email-input">
                                <b-form-input
                                    id="email-input"
                                    v-model="loginForm.email"
                                    type="email"
                                    placeholder="Enter email"
                                    required
                                ></b-form-input>
                            </b-form-group>

                            <b-form-group id="password-label" label="Password" label-for="password-input">
                                <b-form-input
                                    id="password-input"
                                    v-model="loginForm.password"
                                    placeholder="Enter password"
                                    required
                                ></b-form-input>
                            </b-form-group>

                            <b-button type="submit" variant="primary" :class="{'is-loading': loading}">Submit</b-button>
                            <b-button type="reset" class="ml-3">Reset</b-button>
                        </b-form>
                        <br>
                        <a href="#" @click="toggleEmailForm()">See all sign in options</a>
                    </b-card>

                    <b-card
                        title="Welcome"
                        style="max-width: 20rem;"
                        class="text-center"
                        v-if="!emailSignIn && newUser"
                    >
                        <b-button @click="testGoogle()" pill variant="outline-primary">Sign Up with Google</b-button><br><br>
                        <b-button @click="testFacebook()" pill variant="outline-primary">Sign Up with Facebook</b-button><br><br>
                        <b-button @click="toggleEmailForm()" pill variant="outline-primary">Sign Up with Email</b-button><br><br>

                        <a href="#" @click="newUser = false">Returning User?</a>
                    </b-card>

                    <b-card
                        title="Sign Up with Email"
                        style="max-width: 20rem;"
                        class="text-center"
                        v-if="emailSignIn && newUser"
                    >
                        <b-form @submit="signInOrCreateUser()" @reset="onReset()">
                            <b-form-group id="email-label" label="Email" label-for="email-input">
                                <b-form-input
                                    id="email-input"
                                    v-model="loginForm.email"
                                    type="email"
                                    placeholder="Enter email"
                                    required
                                ></b-form-input>
                            </b-form-group>

                            <b-form-group id="password-label" label="Password" label-for="password-input">
                                <b-form-input
                                    id="password-input"
                                    v-model="loginForm.password"
                                    placeholder="Enter password"
                                    required
                                ></b-form-input>
                            </b-form-group>

                            <b-button type="submit" variant="primary" :class="{'is-loading': loading}">Submit</b-button>
                            <b-button type="reset" class="ml-3">Reset</b-button>
                        </b-form>
                        <br>
                        <a href="#" @click="toggleEmailForm()">See all sign in options</a>
                    </b-card>

                    <p class="has-text-danger" v-if="errorMessage">{{ errorMessage }}</p>
                
                </aside>
            </b-col>
            <b-col></b-col>
        </b-row>
    </b-container>
</template>

<script>
import {auth, db, GoogleAuthProvider} from '../firebase';
import { useUserStore } from '../stores/userStore';
export default {
    setup() {
        const userStore = useUserStore()

        return {
            userStore,
        }
    },
    data() {
        return {
            auth,
            db,
            newUser: false,
            emailSignIn: false,
            loading: false,
            errorMessage: '',
            loginForm: {
                email: '',
                password: '',
            },
        }
    },
    methods: {
        async signInAnonymously() {
            await auth.signInAnonymously()
                      .then(() => {
                        this.addUserToDB();
                      });
        },
        async signInOrCreateUser() {
            this.loading = true;
            this.errorMessage = '';
            try {
                if (this.newUser) {
                    await auth.createUserWithEmailAndPassword(this.loginForm.email, this.loginForm.password)
                              .then(() => {
                                    this.addUserToDB();
                              });
                } else {
                    await auth.signInWithEmailAndPassword(this.loginForm.email, this.loginForm.password);
                }
            } catch (error) {
                this.errorMessage = error.message;
            }

            this.loading = false;
        },
        async googleSignIn() {
            console.log('Google');
            this.errorMessage = '';
            let provider = GoogleAuthProvider;
            try {
                await auth.signInWithPopup(provider).then(function(result) {
                    console.log('Logged in ' + result.user.uid);
                    this.addUserToDB();
                });
            } catch (error) {
                this.errorMessage = error.message;
            }
        },
        async addUserToDB() {
            try {
                await db.collection('users')
                    .doc(this.auth.currentUser.uid)
                    .set({})
            } catch (error) {
                console.log(error)
            }
        },
        testFacebook() {
            console.log('Facebook');
        },
        onReset() {
            this.loginForm.email = '';
            this.loginForm.password = '';
        },
        toggleEmailForm() {
            this.emailSignIn = !this.emailSignIn;
            this.onReset();
        }
    }
}
</script>