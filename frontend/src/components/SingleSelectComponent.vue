<template>
    <form class="component-box">
        <div class="content-wrapper">
            <span class="trash-icon" v-if="layout && !component.selected">
                <ion-icon name="trash-outline" class="bi" @click="deleteComponent(component)" />
            </span>
            <h3 class="component-name">{{component.name}}</h3>
            <span class="edit-component-icon" v-if="layout && !component.selected">
                <ion-icon name="pencil" class="bi" @click="editComponent(component)" />
            </span>
            <span class="change-icon" v-if="layout">
                <ion-icon 
                    :name="component.selected ? 'remove-circle-outline' : 'add-circle-outline'" 
                    :class="component.selected ? 'bi red' : 'bi green'"
                    @click="toggleComponentSelection(component)">
                </ion-icon>
                <ion-icon 
                    v-if="!userStore.isMobile()"
                    :name="component.selected ? 'remove-circle' : 'add-circle'" 
                    :class="component.selected ? 'bi red' : 'bi green'"
                    @click="toggleComponentSelection(component)">
                </ion-icon>
            </span>
            </div>
        <div class="component-options-container" id="component-radio" role="group">
            <div class="component-radio" v-for="(option, index) in component.selectOptions" :key="option">
                <input 
                    type="radio" 
                    :name="'btnradio_' + component.id" 
                    :id="'btnradio_' + index" 
                    :disabled="disabled"
                    :value="option.value"
                    v-model="component.values"
                    >
                <label :for="'btnradio_' + index" >{{ option.text }}</label>
            </div>
        </div>
    </form>
</template>

<script setup>
import { useUserStore } from '../stores/userStore';
const props = defineProps({
    component: Object,
    disabled: Boolean,
    layout: Boolean
});

const userStore = useUserStore();

const emits = defineEmits(['toggleComponentSelection', 'deleteComponent', 'editComponent']);
function toggleComponentSelection(component) {
    emits('toggleComponentSelection', component);
}
function deleteComponent(component) {
    emits('deleteComponent', component);
}
function editComponent(component) {
    emits('editComponent', component)
}

</script>

<style scoped>
.component-name {
    font-size: 18px;
    font-weight: 500;
    font-family: Lato, sans-serif;
    color: #343a40;
}

.component-options-container {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
  }

.component-radio {
    padding-bottom: 10px;
}

.component-radio {
  display: flex;
  align-items: center;
  gap: 5px;
  padding-bottom: 10px;
}

input[type='radio'] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    position: relative;
    width: 15px;
    height: 15px;
    background-color: transparent;
    border: none;
}

input[type='radio']:after {
    content: '';
    display: inline-block;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: white;
    position: absolute;
    top: 0;
    left: 0;
    visibility: visible;
}

input[type='radio']:checked:after {
    background-color: #846F91;
}

input[type='radio']:disabled:after {
    background-color: lightgray;
}

input[type='radio']:disabled:checked:after {
    background-color: #999999;
}

label {
    font-size: 15px;
    font-weight: 500;
    font-family: Lato, sans-serif;
    color: #343a40;
}

h3 {
    margin-left: 20px;
}

</style>