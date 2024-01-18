<template>
    <button>{{ displayValue }}</button>
</template>

<script setup>
    const props = defineProps({
        displayValue: String
    })
</script>

<style scoped>
button {
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
    background-color: #4AAE9B;
}
</style>


