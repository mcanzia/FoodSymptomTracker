<template>
    <div class="overlay">
        <Modal :header-active="true" :footer-active="true">
            <template v-slot:header>
                <h3>{{customMessage ? customMessage : 'Are you sure you want to delete?' }}</h3>
            </template>
            <template v-slot:footer>
                <button class="confirm-button" @click="confirm(true)">Confirm</button>
                <button class="cancel-button" @click="confirm(false)">Cancel</button>
            </template>
        </Modal>
    </div>
</template>

<script setup>
import Modal from './Modal.vue';

defineProps({
    customMessage : String
});

const emits = defineEmits(['confirm']);
function confirm(confirmation) {
    emits('confirm', confirmation);
}
</script>

<style scoped>
.overlay {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5); 
    z-index: 1000;
}

h3 {
    font-family: Lato, sans-serif;
    color: black;
}

.confirm-button {
    height: 50px;
    width: 250px;
    border-radius: 10px;
    background-color: #846F91;
    border: solid #846F91;
    color: #FFFFFF;
    font-family: Lato, sans-serif;
    cursor: pointer;
}

.cancel-button {
    height: 50px;
    width: 250px;
    border-radius: 10px;
    background-color: none;
    border: solid #846F91;
    color: black;
    font-family: Lato, sans-serif;
    cursor: pointer;
    margin-left: 10px;
}

@media only screen and (min-width: 770px) {
    .confirm-button:hover {
        background-color: #423748;
        border: #423748;
    }
    .cancel-button:hover {
        background-color: #423748;
        color: white;
        border: solid #423748;
    }
}
</style>
  