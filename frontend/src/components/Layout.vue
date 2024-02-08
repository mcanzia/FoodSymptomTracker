<template>
   <div class="container" @click.self="closeNewComponentModal()">
        <div class="flex-column">
            <div v-if="userStore.isMobile()" class="add-component-container">
              <button  @click="toggleNewComponentModal">Add Component</button>
              <h2>Available Components: </h2>
              <DropDown v-if="newComponentModalActive" class="add-component-dropdown">
                <template v-slot:body>
                  <AddComponent @closeAddComponentPanel="closeNewComponentModal" :editMode="editMode"/>
                </template>
              </DropDown>
            </div>
            <div v-else class="add-component-container">
              <h2>Available Components: </h2>
              <button @click="toggleNewComponentModal">Add Component</button>
              <DropDown v-if="newComponentModalActive" class="add-component-dropdown">
                <template v-slot:body>
                  <AddComponent @closeAddComponentPanel="closeNewComponentModal" :editMode="editMode"/>
                </template>
              </DropDown>
            </div>
            <div class="component-display">
              <ComponentDisplay
                v-for="component in availableComponents"
                :key="component.id"
                :component="component"
                :disabled="true"
                :layout="true"
                @toggleComponentSelection="toggleSelected(component)"
                @deleteComponent="toggleConfirmDelete(component, deleteComponent, null)"
                @editComponent="toggleEditComponent(component)"
              />
            </div>
        </div>
        <div class="flex-column">
            <h2>Selected Components: </h2>
            <div class="component-display">
              <ComponentDisplay
                v-for="component in selectedComponents"
                :key="component.id"
                :component="component"
                :disabled="true"
                :layout="true"
                @toggleComponentSelection="toggleConfirmDelete(component, toggleSelected, 'Are you sure you want to unselect this component?')"
              />
            </div>
        </div>
        <ConfirmDelete v-if="confirmModalActive" :customMessage="customDeleteMessage" @confirm="confirmDelete" />
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
import ConfirmDelete from './ConfirmDelete.vue';
const dateLogStore = useDateLogStore();
const componentStore = useComponentStore();
const userStore = useUserStore();

const { availableComponents, selectedComponents, newComponent } = storeToRefs(componentStore);

onBeforeMount(async() => {
  await componentStore.initializeComponentLists();
  await dateLogStore.initializeStore(currentDateString.value, componentStore.selectedComponents);
});

const newComponentModalActive = ref(false);
const editMode = ref(false);
const confirmModalActive = ref(false);
const componentToDelete = ref(null);
const deleteMethod = ref(null);
const customDeleteMessage = ref(null);

let currentDateString = computed(() => {
  return new Date().toLocaleDateString();
});

// Functions

async function toggleSelected(component) {
  const isSelected = !component.selected;
  await componentStore.toggleSelectedField(component, isSelected);
  if (isSelected) {
    await dateLogStore.addDateLogComponent(component);
  } else {
    await dateLogStore.removeDateLogComponent(component);
  }
}

function toggleNewComponentModal() {
  newComponentModalActive.value = !newComponentModalActive.value;
}

function openNewComponentModal() {
  newComponentModalActive.value = true;
}

function closeNewComponentModal() {
  componentStore.clearNewComponentForm();
  newComponentModalActive.value = false;
  editMode.value = false;
}

function toggleEditComponent(component) {
  componentStore.newComponent = {...component};
  editMode.value = true;
  openNewComponentModal();
}

async function deleteComponent(component) {
  await componentStore.deleteComponents([component]);
}

function toggleConfirmDelete(component, method, message) {
  confirmModalActive.value = true;
  componentToDelete.value = component;
  deleteMethod.value = method;
  customDeleteMessage.value = message;
}

async function confirmDelete(confirmation) {
  if (confirmation) {
    await deleteMethod.value(componentToDelete.value); 
  }
  confirmModalActive.value = false;
  componentToDelete.value = null;
  deleteMethod.value = null;
  customDeleteMessage.value = null;
}

</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  height: 80%;
}

.flex-column {
  flex-basis: calc(50% - 2rem);
}

.component-display > * {
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
    top: 23%;
    left: 25%;
    animation: fade 0.3s linear forwards;
    z-index: 100;
  }

  
@media only screen and (min-width: 770px) {
  .component-display {
    overflow-y: scroll;
    max-height: 80%;
  }
}

@media only screen and (max-width: 770px) {
    .container {
      flex-direction: column-reverse;
      flex-wrap: nowrap;
      height: 70vh;
      overflow-y: scroll;
      overflow-x: hidden;
    }

    h2 {
      text-align: center;
    }

    .component-display {
      flex-grow:1;
    }

    .add-component-container {
      flex-direction: column;
    }

    .add-component-dropdown {
      width: 80%;
      left: 0;
      margin-left: 10%;
    }

    .add-component-container button {
      width: 100%;
      margin: 0;
    }
}

</style>