<template>
    <Toast :message="errorMessage?.message" @toast-close="errorStore.resetErrorMessage"></Toast>
</template>
  
<script setup>
import Toast from "./Toast.vue";
import { useErrorStore } from "../stores/errorStore";
import { storeToRefs } from "pinia";

const errorStore = useErrorStore();
let { errorMessage } = storeToRefs(errorStore);

</script>

  
<style>
</style>
  