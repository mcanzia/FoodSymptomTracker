<template>
    <div v-if="visible" class="toast" :class="{ 'visible': visible, [type]: true }">
      {{ message }}
    </div>
</template>
  
<script setup>
import { defineProps, ref, watch } from "vue";

const props = defineProps({
    message: String,
    type: {
        type: String,
        default: 'error'
    }
});

const emit = defineEmits(["toastClose"]);

let visible = ref(false);

function showToast() {
    visible.value = true;
    setTimeout(() => {
        visible.value = false;
        emit("toastClose");
    }, 3000);
}

watch(() => props.message, (newValue, oldValue) => {
  if (newValue !== oldValue && newValue !== null && newValue !== undefined) {
    showToast();
  }
});

</script>

  
<style>
.toast {
position: fixed;
bottom: 20px;
left: 20px;
padding: 10px;
border-radius: 5px;
background-color: #f44336; /* Red for error */
color: white;
z-index: 1000;
transition: opacity 0.6s, bottom 0.6s;
}

.toast.success {
background-color: #4CAF50; /* Green for success */
}

.toast.error {
background-color: #f44336; /* Red for error */
}

.toast:not(.visible) {
opacity: 0;
bottom: 10px;
}
</style>
  