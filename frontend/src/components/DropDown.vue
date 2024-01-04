<template>
    <transition name="dropdown-fade">
        <div class="dropdown">
            <slot name="body"></slot>
        </div>
    </transition>
</template>

<script setup>

const emits = defineEmits(['close']);
function close() {
    emits('close');
}
</script>

<style scoped>
  .dropdown {
    background: #E8DED9;
    display: flex;
    flex-direction: column;
    height: auto;
    border-radius: 10px;
    border: 2px solid #846F91;
  }
</style>
  