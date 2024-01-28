<template>
    <form class="component-box">
        <div class="content-wrapper">
            <span class="trash-icon" v-if="layout && !component.selected">
                <ion-icon name="trash-outline" class="bi" @click="deleteComponent(component)" />
            </span>
            <h3 :id="'component-name-'+component.id" class="component-name">{{component.name}}</h3>
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
                    @click="toggleComponentSelection(component)"
                    >
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
            class="layout-slider"
            :disabled="disabled" 
            v-model="defaultValues" 
            style="background: linear-gradient(90deg, #999999 50%, #d1d3d1 50%)"
            :aria-labelledby="'component-name-'+component.id">
        <input 
            type="range" 
            id="component-range" 
            min="0" 
            max="10" 
            step="0.10"
            v-else
            :disabled="disabled" 
            v-model="component.values" 
            :style="sliderGradient"
            :aria-labelledby="'component-name-'+component.id">
        <h4 v-if="!layout">Value: {{ component.values }}</h4>
    </form>
</template>

<script setup>
import { useUserStore } from '../stores/userStore';
import { computed } from 'vue'

const props = defineProps({
    component: Object,
    disabled: Boolean,
    layout: Boolean
});

const userStore = useUserStore();
const defaultValues = 5;

let sliderGradient = computed(() => {
    const percent = (props.component.values / 10) * 100;
    const gradient = props.disabled ? 
        `linear-gradient(90deg, #999999 ${percent}%, #d1d3d1 ${percent}%)` :
        `linear-gradient(90deg, #846F91 ${percent}%, #d1d3d1 ${percent}%)`;

    return {
        background: gradient,
    };
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
.component-box {
    text-align: center;
}

.component-box:hover {
    background-color: #e9ecef;
}

.component-name, label {
    font-size: 18px;
    font-weight: 500;
    font-family: Lato, sans-serif;
    color: #343a40;
}

.layout-slider {
    margin-bottom: 15px;
}

input[type=range] {
    -webkit-appearance: none;
    background-color: #846F91;
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
    background-color: #846F91;
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
    background-color: #846F91;
    border-radius: 50%;
    width: 15px;
    height: 15px;
    border: none;
}

input[type='range']:disabled::-moz-range-thumb {
  background: #999999;
}

h4 {
    font-size: 15px;
    font-weight: 500;
    font-family: Lato, sans-serif;
    color: #343a40;
}

h3 {
    margin-left: 20px;
}

</style>