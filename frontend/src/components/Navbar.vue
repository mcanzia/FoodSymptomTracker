<template>
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand :to="{name: 'home'}">Food Log</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">

            <b-nav-item :to="{name: 'layout'}" v-if="userStore.isLoggedIn">Layout</b-nav-item>
            <b-nav-item :to="{name: 'summary'}" v-if="userStore.isLoggedIn">Summary</b-nav-item>

            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template #button-content>
                <em>User</em>
              </template>
              <b-dropdown-item :to="{name: 'profile'}">Profile</b-dropdown-item>
              <b-dropdown-item @click="this.userStore.logoutUser">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
      </b-collapse>
      </b-navbar>
</template>

<script>
import { auth } from "../firebase";
import router from "../router/index";
import { useUserStore } from "../stores/userStore";
export default {
    setup() {
      const userStore = useUserStore()

      return {
          userStore
      }
    },
    data() {
        return {
            auth,
            router
        }
    },
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