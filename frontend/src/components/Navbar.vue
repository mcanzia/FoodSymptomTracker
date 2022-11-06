<template>
  <User>
    <template v-slot:user="{ user }">
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand :to="{name: 'home'}">Food Log</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">

            <b-nav-item :to="{name: 'layout'}" v-if="user">Layout</b-nav-item>
            <b-nav-item :to="{name: 'summary'}" v-if="user">Summary</b-nav-item>

            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template #button-content>
                <em>User</em>
              </template>
              <b-dropdown-item :to="{name: 'profile'}">Profile</b-dropdown-item>
              <b-dropdown-item @click="auth.signOut()">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
      </b-collapse>
      </b-navbar>
    </template>
  </User>
</template>

<script>
import { auth } from "../firebase";
import router from "../router/index";
import User from "./User";
export default {
    data() {
        return {
            auth,
            router
        }
    },
    components: {
      User,
    },
    props: ['user'],
    methods: {
      redirectToProfile() {
        router.push({ name: 'profile' })
      },
      redirectToHome() {
        router.push({ name: 'home' })
      }
    }
    
}
</script>