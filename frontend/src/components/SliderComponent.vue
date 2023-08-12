<template>
    <form class="component-box">
        <div class="content-wrapper">
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
        <input 
            type="range" 
            id="component-range" 
            min="0" 
            max="10" 
            step="0.10" 
            v-if="layout"
            :disabled="disabled" 
            v-model="defaultValues" 
            style="background: linear-gradient(90deg, #999999 50%, #d1d3d1 50%)">
        <input 
            type="range" 
            id="component-range" 
            min="0" 
            max="10" 
            step="0.10"
            v-else
            :disabled="disabled" 
            v-model="component.values" 
            :style="sliderGradient">
        <h4 v-if="!layout">Value: {{ component.values }}</h4>
    </form>
</template>

<script setup>

import { computed } from 'vue'

const props = defineProps({
    component: Object,
    disabled: Boolean,
    layout: Boolean
});

const defaultValues = 5;

let sliderGradient = computed(() => {
    const percent = (props.component.values / 10) * 100;
    const gradient = props.disabled ? 
        `linear-gradient(90deg, #999999 ${percent}%, #d1d3d1 ${percent}%)` :
        `linear-gradient(90deg, #4AAE9B ${percent}%, #d1d3d1 ${percent}%)`;

    return {
        background: gradient,
    };
});

const emits = defineEmits(['toggleComponentSelection']);
function toggleComponentSelection(component) {
    emits('toggleComponentSelection', component);
}

</script>

<style scoped>
.component-box {
    background-color: #f8f9fa;
    width: 100%;
    border-radius: 8px;
    transition: all 0.3s ease;
    list-style-type: none;
    text-align: center;
}

.component-box:hover {
    background-color: #e9ecef;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.component-name, label {
    font-size: 18px;
    font-weight: 500;
    font-family: garamond;
    color: #343a40;
}

input[type=range] {
    -webkit-appearance: none;
    background-color: #4AAE9B;
    border-radius: 10px;
    width: 50%;
    height:10px;
}

input[type=range]::-webkit-slider-runnable-track {
    height: 10px;
    border-radius: 10px;
}

input[type="range"]::-webkit-slider-thumb {
     -webkit-appearance: none;
    background-color: #4AAE9B;
    border-radius: 50%;
    width: 15px;
    height: 15px;
    margin-top: -2.5px;
}

input[type='range']:disabled::-webkit-slider-thumb {
  background: #999999;
}

/* Firefox compatibility */
input[type=range]::-moz-range-track {
    height: 10px;
    border-radius: 10px;
}

input[type=range]::-moz-range-thumb {
    background-color: #4AAE9B;
    border-radius: 50%;
    width: 15px;
    height: 15px;
    border: none;
}

input[type='range']:disabled::-moz-range-thumb {
  background: #999999;
}

h4 {
    padding-bottom: 10px;
}

.content-wrapper {
  display: flex;
  position: relative;
  justify-content: center;
  gap: 5px;
}

.change-icon {
  position: absolute;
  top: 0;
  right: 0;
  padding: 5px;
}

.change-icon > .bi + .bi,
.change-icon:hover > .bi {
    display: none;
}

.change-icon:hover > .bi + .bi {
    display: inherit;
}

.bi {   
    cursor: pointer;
}

.red {
    color: #dc3545;
}
.red:hover {
    color: #c82333;
}

.green {
    color: #006400;
}
.green:hover {
    color: #006400;
}

</style>