<template>
    <div>
        <slot name="user" :user="user"></slot>
    </div>
</template>

<script setup>
import { ref } from '@vue/composition-api';
import { auth } from '../firebase';
import { onBeforeUnmount } from 'vue';

const user = ref(null);
const unsubscribe = auth.onAuthStateChanged(
    userCred => user.value = userCred
);

onBeforeUnmount(() => {
  this.unsubscribe();
});

</script>