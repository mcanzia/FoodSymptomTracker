<template>
    <form class="component-box">
        <div class="content-wrapper">
            <span class="trash-icon" v-if="layout && !component.selected">
                <ion-icon name="trash-outline" class="bi" @click="deleteComponent(component)" />
            </span>
            <h3 class="component-name">{{component.name}}</h3>
            <span class="change-icon" v-if="layout">
                <ion-icon 
                    :name="component.selected ? 'remove-circle-outline' : 'add-circle-outline'" 
                    :class="component.selected ? 'bi red' : 'bi green'">
                </ion-icon>
                <ion-icon 
                    :name="component.selected ? 'remove-circle' : 'add-circle'" 
                    :class="component.selected ? 'bi red' : 'bi green'"
                    @click="toggleComponentSelection(component)">
                </ion-icon>
            </span>
        </div>
        <div class="component-options-container" id="component-checkbox">
            <div class="component-checkbox" v-for="(option, index) in component.selectOptions" :key="index">
                <input 
                    type="checkbox" 
                    :name="'btncheckbox_' + component.id"
                    :id="'btncheckbox_' + index" 
                    :disabled="disabled"
                    v-model="component.values[index]">
                <label :for="'btncheckbox_' + index" >{{ option.text }}</label>
            </div>
        </div>
    </form>
</template>

<script setup>

const props = defineProps({
    component: Object,
    disabled: Boolean,
    layout: Boolean
});

const emits = defineEmits(['toggleComponentSelection', 'deleteComponent']);
function toggleComponentSelection(component) {
    emits('toggleComponentSelection', component);
}
function deleteComponent(component) {
    emits('deleteComponent', component);
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
}

.component-checkbox {
    padding-bottom: 10px;
}

label {
    padding-left: 5px;
    font-size: 15px;
    font-weight: 500;
    font-family: Lato, sans-serif;
    color: #343a40;
}

input[type='checkbox']:after {
    width: 15px;
    height: 15px;
    top: -2px;
    left: -2px;
    position: relative;
    background-color: white;
    content: '';
    display: inline-block;
    visibility: visible;
    border: 1px solid #d1d3d1;
}

input[type='checkbox']:checked:after {
    width: 15px;
    height: 15px;
    top: -2px;
    left: -2px;
    position: relative;
    background-color: #846F91;
    content: '';
    display: inline-block;
    visibility: visible;
    border: 1px solid #d1d3d1;
}

input[type='checkbox']:disabled:checked:after {
    width: 15px;
    height: 15px;
    top: -2px;
    left: -2px;
    position: relative;
    background-color: #999999;
    content: '';
    display: inline-block;
    visibility: visible;
    border: 1px solid #d1d3d1;
}

h3 {
    margin-left: 20px;
}
.trash-icon {
    position: absolute;
    top: 0;
    left: 0;
    padding: 5px;
    opacity: 0;
}
</style>