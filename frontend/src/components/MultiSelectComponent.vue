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
        <div class="component-options-container" id="component-checkbox">
            <div class="component-checkbox" v-for="(option, index) in component.selectOptions" :key="option">
                <input 
                    type="checkbox" 
                    :name="'btncheckbox_' + component.id"
                    :id="'btncheckbox_' + index" 
                    :disabled="disabled"
                    :checked="isSelected(option)"
                    :value="isSelected(option)"
                    @change="checkboxSetValue(option, $event.target.checked)">
                <label :for="'btncheckbox_' + index" >{{ option.text }}</label>
            </div>
        </div>
    </form>
</template>

<script setup>
import { useUserStore } from '../stores/userStore';
import { computed } from 'vue';

const props = defineProps({
    component: Object,
    disabled: Boolean,
    layout: Boolean
});

const userStore = useUserStore();

function checkboxSetValue(option, checked) {
    props.component.values = props.component.values.filter(value => value !== option.value);
    if (checked) {
        props.component.values.push(option.value);
    }
}

function isSelected(option) {
  return props.component.values.includes(option.value);
}

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

.component-checkbox {
  display: flex;
  align-items: center;
  gap: 5px;
  padding-bottom: 10px;
}

label {
    font-size: 15px;
    font-weight: 500;
    font-family: Lato, sans-serif;
    color: #343a40;
}

input[type='checkbox'] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    position: relative;
    width: 15px;
    height: 15px;
    background-color: white;
}

input[type='checkbox']:after {
    content: '';
    position: absolute;
    width: 15px;
    height: 15px;
    background-color: white;
    visibility: visible;
}

input[type='checkbox']:checked:after {
    background-color: #846F91;
}

input[type='checkbox']:disabled:after {
    background-color: lightgray;
}

input[type='checkbox']:disabled:checked:after {
    background-color: #999999;
}

input[type='checkbox']:not(:disabled):not(:checked):after {
    background-color: white;
}

input[type='checkbox']:after {
    top: 0;
    left: 0;
    transform: translateY(0);
}


h3 {
    margin-left: 20px;
}


</style>