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
        <div class="component-options-container" id="component-radio" role="group">
            <div class="component-radio" v-for="(option, index) in component.selectOptions" :key="option">
                <input 
                    type="radio" 
                    name="btnradio_{{ index }}" 
                    id="btnradio_{{ index }}" 
                    :disabled="disabled" 
                    :v-model="layout ? '' : component.values[index]">
                <label for="btnradio_{{ index }}">{{ option.text }}</label>
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

.component-options-container {
    display: flex;
    justify-content: space-evenly;
  }

.component-radio {
    padding-bottom: 10px;
}

input[type='radio']:after {
    width: 15px;
    height: 15px;
    border-radius: 15px;
    top: -2px;
    left: -2px;
    position: relative;
    background-color: white;
    content: '';
    display: inline-block;
    visibility: visible;
    border: 1px solid #d1d3d1;
}

input[type='radio']:checked:after {
    width: 15px;
    height: 15px;
    border-radius: 15px;
    top: -2px;
    left: -2px;
    position: relative;
    background-color: #4AAE9B;
    content: '';
    display: inline-block;
    visibility: visible;
    border: 1px solid #d1d3d1;
}

input[type='radio']:disabled:checked:after {
    width: 15px;
    height: 15px;
    border-radius: 15px;
    top: -2px;
    left: -2px;
    position: relative;
    background-color: #999999;
    content: '';
    display: inline-block;
    visibility: visible;
    border: 1px solid #d1d3d1;
}

label {
    padding-left: 5px;
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