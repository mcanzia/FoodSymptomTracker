<template>
   <div class="container" @click.self="closeNewComponentModal()">
        <div class="flex-column">
            <h2>Available Components: </h2>
            <ComponentDisplay
              v-for="component in availableComponents"
              :key="component.id"
              :component="component"
              :disabled="true"
              :layout="true"
              @toggleComponentSelection="toggleSelected(component)"
            />

        </div>
        <div class="flex-column">
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
        <Modal v-if="newComponentModalActive" class="modal" :headerActive="true" :bodyActive="true">
          <template v-slot:header>
              <h3>Add New Component</h3>
          </template>
          <template v-slot:body>
            <div class="form-container">
              <h4>Name: </h4>
              <input 
                  class="add-component-input" 
                  id="new-component-name" 
                  v-model="newComponent.name" 
                  required 
                  placeholder="Enter a name">
            </div>
            <div class="form-container">
              <h4>Type: </h4>
              <select 
                  class="add-component-dropdown" 
                  id="new-component-type" 
                  v-model="newComponent.typeId" 
                  required>
                    <option v-for="componentType in componentTypes" :value="componentType.typeId" :key="componentType.typeId">
                      {{ componentType.label }}
                    </option>
              </select>
            </div>
            <div v-if="newComponent.typeId === 2 || newComponent.typeId === 3">
              <h4>Options: </h4>
              <div v-for="selectOption in newComponent.selectOptions" :key="selectOption.value">
                <input class="add-component-input" id="new-component-options" v-model="selectOption.text">
              </div>
              <button 
                  v-if="newComponent.selectOptions.length < 5"    
                  @click="addComponentOption()" 
                  id="add-new-option-button">
                    Add New Option
              </button>
            </div>
          </template>
        </Modal>
        <FloatingButton saveType="Component" :editMode="newComponentModalActive" @saveOrEdit="toggleNewComponentModal()" @closeEditMode="closeNewComponentModal()"/>
    </div>
</template>

<script setup>
import { useDateLogStore } from '../stores/dateLogStore';
import { useComponentStore } from '../stores/componentStore';
import { useUserStore } from '../stores/userStore';
import { storeToRefs } from 'pinia';
import { onBeforeMount, computed, ref } from 'vue';
import Modal from './Modal.vue';
import ComponentDisplay from './ComponentDisplay.vue';
import FloatingButton from './FloatingButton.vue';

const dateLogStore = useDateLogStore();
const componentStore = useComponentStore();
const userStore = useUserStore();

const { availableComponents, selectedComponents } = storeToRefs(componentStore);

onBeforeMount(async() => {
  userAccessToken = await userStore.getAccessToken();
  await componentStore.initializeComponentLists(userAccessToken);
  await dateLogStore.initializeStore(userAccessToken, currentDateString.value, componentStore.selectedComponents);
});

const componentTypes = [
  { label: 'Slider', typeId: 1},
  { label: 'Single Select', typeId: 2},
  { label: 'Multi Select', typeId: 3},
];

let userAccessToken = null;

let newComponent = ref({
  name: "",
  id: -1,
  typeId: -1,
  selectOptions: [],
  selected: false
});

let newComponentModalActive = ref(false);

let currentDateString = computed(() => {
  return new Date().toLocaleDateString();
});

// Functions
async function addNewComponent() {
    try {
        newComponent.value.selectOptions.map((option) => { option.value = option.text});
        await componentStore.addComponents(userAccessToken, new Array(newComponent));
    } catch (error) {
        console.log(error)
    }
    clearNewComponentForm();
}

function clearNewComponentForm() {
  newComponent.value = {
    name: "",
    id: -1,
    typeId: -1,
    selectOptions: []
  }
}

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

function openNewComponentModal() {
  newComponentModalActive.value = true;
}

function closeNewComponentModal() {
  clearNewComponentForm();
  newComponentModalActive.value = false;
}

function addComponentOption() {
  newComponent.value.selectOptions.push({text: '', value: ''});
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

h2 {
    font-family: garamond;
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
}

.form-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.add-component-input, .add-component-dropdown {
  flex-grow: 1;
  padding: 8px 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  background-color: #fff;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.add-component-input:focus, .add-component-dropdown:focus {
  outline: none;
  border-color: #4AAE9B;
  box-shadow: 0 0 3px rgba(0, 184, 255, 0.3);
}

button {
  padding: 8px 16px;
  font-size: 16px;
  color: #fff;
  background-color: #4AAE9B;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #4AAE9B;
}

</style>