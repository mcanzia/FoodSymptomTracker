<template>
    <div>
        <ComponentWrapper v-if="component.typeId === 1">
            <template v-slot:content>
                <SliderComponent 
                    :component="component" 
                    :disabled="disabled" 
                    :layout="layout" 
                    @toggleComponentSelection="toggleComponentSelection(component)"
                    @deleteComponent="deleteComponent(component)"
                    @editComponent="editComponent(component)"
                />
            </template>
        </ComponentWrapper>
        <ComponentWrapper v-if="component.typeId === 2">
            <template v-slot:content>
                <SingleSelectComponent 
                    v-if="component.typeId === 2" 
                    :component="component" 
                    :disabled="disabled" 
                    :layout="layout" 
                    @toggleComponentSelection="toggleComponentSelection(component)"
                    @deleteComponent="deleteComponent(component)"
                    @editComponent="editComponent(component)"
                />
            </template>
        </ComponentWrapper>
        <ComponentWrapper v-if="component.typeId === 3">
            <template v-slot:content>
                <MultiSelectComponent 
                    v-if="component.typeId === 3" 
                    :component="component" 
                    :disabled="disabled" 
                    :layout="layout" 
                    @toggleComponentSelection="toggleComponentSelection(component)"
                    @deleteComponent="deleteComponent(component)"
                    @editComponent="editComponent(component)"
                />
            </template>
        </ComponentWrapper>
    </div>
</template>

<script setup>
import MultiSelectComponent from "./MultiSelectComponent.vue";
import SingleSelectComponent from "./SingleSelectComponent.vue";
import SliderComponent from "./SliderComponent.vue";
import ComponentWrapper from "./ComponentWrapper.vue";

const props = defineProps({
    component: Object,
    disabled: Boolean,
    layout: Boolean
});

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
</style>
