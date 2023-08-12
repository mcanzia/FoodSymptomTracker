<template>
    <div>
        <SliderComponent 
            v-if="component.typeId === 1" 
            :component="component" 
            :disabled="disabled" 
            :layout="layout" 
            @toggleComponentSelection="toggleComponentSelection(component)"/>
        <SingleSelectComponent 
            v-if="component.typeId === 2" 
            :component="component" 
            :disabled="disabled" 
            :layout="layout" 
            @toggleComponentSelection="toggleComponentSelection(component)"/>
        <MultiSelectComponent 
            v-if="component.typeId === 3" 
            :component="component" 
            :disabled="disabled" 
            :layout="layout" 
            @toggleComponentSelection="toggleComponentSelection(component)"/>
    </div>
</template>

<script setup>
import MultiSelectComponent from "./MultiSelectComponent.vue";
import SingleSelectComponent from "./SingleSelectComponent.vue";
import SliderComponent from "./SliderComponent.vue";

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
</style>
