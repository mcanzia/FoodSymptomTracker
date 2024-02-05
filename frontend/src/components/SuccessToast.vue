<template>
    <Toast :message="successMessage?.message" :type="NotificationType.SUCCESS" @toast-close="notificationStore.resetMessage"></Toast>
</template>
  
<script setup>
import Toast from "./Toast.vue";
import { useNotificationStore } from "../stores/notificationStore";
import { storeToRefs } from "pinia";
import { NotificationType } from "../models/NotificationType";

const notificationStore = useNotificationStore();
let { successMessage } = storeToRefs(notificationStore);

</script>

  
<style>
</style>
  