<template>
    <Toast :message="errorMessage?.message" :type="NotificationType.ERROR" @toast-close="notificationStore.resetMessage"></Toast>
</template>
  
<script setup>
import Toast from "./Toast.vue";
import { useNotificationStore } from "../stores/notificationStore";
import { storeToRefs } from "pinia";
import { NotificationType } from "../models/NotificationType";

const notificationStore = useNotificationStore();
let { errorMessage } = storeToRefs(notificationStore);

</script>

  
<style>
</style>
  