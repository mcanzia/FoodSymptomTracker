<template>
   <div class="container" @click.self="closeNewComponentModal()">
        <div class="flex-column component-container">
            <div class="add-component-container">
              <h2>Available Components: </h2>
              <button @click="toggleNewComponentModal">Add Component</button>
              <DropDown v-if="newComponentModalActive" class="add-component-dropdown">
                <template v-slot:body>
                  <AddComponent />
                </template>
              </DropDown>
            </div>
            <ComponentDisplay
              v-for="component in availableComponents"
              :key="component.id"
              :component="component"
              :disabled="true"
              :layout="true"
              @toggleComponentSelection="toggleSelected(component)"
            />

        </div>
        <div class="flex-column component-container">
            <h2>Selected Components: </h2>
            <ComponentDisplay
              v-for="component in selectedComponents"
              :key="component.id"
              :component="component"
              :disabled="true"
              :layout="true"
              @toggleComponentSelection="toggleSelected(component)"
            />
        </div>
        <FloatingButton saveType="Component" :editMode="newComponentModalActive" @saveOrEdit="toggleNewComponentModal()" @closeEditMode="closeNewComponentModal()"/>
    </div>
</template>

<script setup>
import { useDateLogStore } from '../stores/dateLogStore';
import { useComponentStore } from '../stores/componentStore';
import { useUserStore } from '../stores/userStore';
import { storeToRefs } from 'pinia';
import { onBeforeMount, computed, ref } from 'vue';
import DropDown from './DropDown.vue';
import AddComponent from './AddComponent.vue';
import ComponentDisplay from './ComponentDisplay.vue';
import FloatingButton from './FloatingButton.vue';

const dateLogStore = useDateLogStore();
const componentStore = useComponentStore();
const userStore = useUserStore();

const { availableComponents, selectedComponents, newComponent } = storeToRefs(componentStore);

onBeforeMount(async() => {
  userAccessToken = await userStore.getAccessToken();
  await componentStore.initializeComponentLists(userAccessToken);
  await dateLogStore.initializeStore(userAccessToken, currentDateString.value, componentStore.selectedComponents);
});

let userAccessToken = null;

const newComponentModalActive = ref(false);

let currentDateString = computed(() => {
  return new Date().toLocaleDateString();
});

// Functions

async function toggleSelected(component) {
  const isSelected = !component.selected;
  await componentStore.toggleSelectedField(userAccessToken, component, isSelected);
  if (isSelected) {
    await dateLogStore.addDateLogComponent(userAccessToken, component);
  } else {
    await dateLogStore.removeDateLogComponent(userAccessToken, component);
  }
}

function toggleNewComponentModal() {
  if (newComponentModalActive.value) {
    addNewComponent();
  }
  newComponentModalActive.value = !newComponentModalActive.value;
}

async function addNewComponent() {
    try {
        newComponent.value.selectOptions.map((option) => { option.value = option.text});
        await componentStore.addComponents(userAccessToken, new Array(newComponent.value));
    } catch (error) {
        console.log(error)
    }
    clearNewComponentForm();
}

function openNewComponentModal() {
  newComponentModalActive.value = true;
}

function closeNewComponentModal() {
  componentStore.clearNewComponentForm();
  newComponentModalActive.value = false;
}

</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
}

.flex-column {
  flex-basis: calc(50% - 2rem);
}

.component-container > * {
  margin-bottom: 20px;
}

h2 {
  font-family: Lato, sans-serif;
}

.add-component-container {
  display: flex;
  margin-bottom: 0;
}

.add-component-container button {
  padding: 8px;
  font-size: 16px;
  font-family: Lato, sans-serif;
  color: #000000;
  border: none;
  border-radius: 10px;
  margin-left: 10px;
  margin-top: 20px;
  height: 20%;
  background-color: #846F91;
  color: white;
  cursor: pointer;
}

.add-component-dropdown {
    position: absolute;
    top: 100%;
    left: 3%;
    animation: fade 0.3s linear forwards;
    z-index: 100;
  }

</style>