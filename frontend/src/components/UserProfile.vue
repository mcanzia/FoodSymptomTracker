<template>
    <div class="center">
        <Spinner />
        <p>Logged in as {{ auth.currentUser.displayName }}</p>
    </div>
</template>

<script setup>

import { auth } from "../firebase";
import Spinner from "./Spinner.vue";

const props = defineProps({
    user: Object
})

</script>

<style scoped>
.center {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}

</style>