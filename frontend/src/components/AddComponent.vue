<template>
  <form id="add-component-form" class="add-component-container" @submit.prevent="addNewComponent()">
    <h3>Add New Component</h3>
    <div class="flex-item">
      <label for="new-component-name">Name:</label>
      <input
        class="add-component-input"
        id="new-component-name"
        v-model="newComponent.name"
        ref="nameInputRef"
        required
        minlength="1"
        maxlength="30"
        placeholder="Enter a name"
      />
    </div>
    <div class="flex-item">
      <label for="new-component-type">Type:</label>
      <select
        class="add-component-dropdown"
        id="new-component-type"
        v-model="newComponent.typeId"
        required
      >
        <option
          v-for="componentType in componentTypes"
          :value="componentType.typeId"
          :key="componentType.typeId"
        >
          {{ componentType.label }}
        </option>
      </select>
    </div>
    <div class="flex-item" v-if="optionsVisible">
      <label>Options:</label>
      <div
        v-for="(selectOption, index) in newComponent.selectOptions"
        :key="selectOption.value"
      >
        <input
          class="add-component-options-input"
          :id="`new-component-options-${index}`"
          v-model="selectOption.text"
          :ref="setOptionRef(index)"
        />
      </div>
      <button
        v-if="newComponent.selectOptions.length < 5"
        @click="addComponentOption()"
        id="add-new-option-button"
        type="button"
      >
        <ion-icon name="add-circle-outline"></ion-icon>
      </button>
    </div>
    <div class="flex-item submit-container">
        <button id="save-add-component" type="submit">Save</button>
        <button id="cancel-add-component" type="button" @click="closePanel()">Cancel</button>
    </div>
    </form>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { ref, watch, computed } from 'vue';
import { useComponentStore } from '../stores/componentStore';

const componentStore = useComponentStore();

const emits = defineEmits(['closeAddComponentPanel']);

const { newComponent, availableComponents, selectedComponents } = storeToRefs(componentStore);


const nameInputRef = ref(null);
const optionRefs = ref([]);

function setOptionRef(index) {
  return el => {
    if (el) {
      optionRefs.value[index] = el;
    }
  };
}

const componentTypes = [
  { label: 'Slider', typeId: 1},
  { label: 'Single Select', typeId: 2},
  { label: 'Multi Select', typeId: 3},
];

let optionsVisible = computed(() => {
  return newComponent.value.typeId === 2 || newComponent.value.typeId === 3;
});

let selectOptionsCount = computed(() => {
  return newComponent.value.selectOptions.filter(option => option.text !== '').length;
});

function initializeComponentOptions() {
  newComponent.value.selectOptions.push({text: '', value: ''});
  newComponent.value.selectOptions.push({text: '', value: ''});
  optionRefs.value.push(ref(null));
  optionRefs.value.push(ref(null));
}

function addComponentOption() {
  newComponent.value.selectOptions.push({text: '', value: ''});
  optionRefs.value.push(ref(null));
}

async function addNewComponent() {
    try {
        if(!validateForm()) {
            return;
        }
        newComponent.value.selectOptions.map((option) => { option.value = option.text});
        newComponent.value.selectOptions = newComponent.value.selectOptions
          .filter(option => option.text !== '');
        await componentStore.addComponents(new Array(newComponent.value));
    } catch (error) {
        console.log(error)
    }
    closePanel();
}

function validateForm() {
    if (newComponent.value.name === null || newComponent.value.name === "") {
        return false;
    }

    const nameIsDuplicate = availableComponents.value.find(component => component.name === newComponent.value.name) ||
      selectedComponents.value.find(component => component.name === newComponent.value.name);
    
    if (nameIsDuplicate) {
      setWarningMessage(nameInputRef.value, "An existing component already has this name.");
      return false;
    }

    if (newComponent.value.typeId === null || newComponent.value.typeId === -1) {
        return false;
    }

    if (optionsVisible.value) {
      if (selectOptionsCount.value < 2) {
          setWarningMessage(optionRefs.value[1], "Please create at least two options.");
          return false;
      }

      if (optionsIsDuplicate()) {
          setWarningMessage(optionRefs.value[0], "One or more options are duplicate");
          return false;
      }
      
    }
    return true;
}

function optionsIsDuplicate() {
  const seenValues = new Set();

  for (const option of newComponent.value.selectOptions) {
    if (seenValues.has(option.text)) {
      return true;
    }
    seenValues.add(option.text);
  }

  return false;
}

function setWarningMessage(refTarget, message) {
  refTarget.setCustomValidity(message);
  refTarget.reportValidity();
  setTimeout(() => {
    refTarget.setCustomValidity("");
  },2000);
}

function closePanel() {
    emits('closeAddComponentPanel');
}

watch(optionsVisible, (newValue, oldValue) => {
  if (newValue) {
    initializeComponentOptions();
  }
});

</script>

<style scoped>
.add-component-container {
  flex-direction: column;
  font-family: Lato, sans-serif;
  overflow-y: scroll;
  max-height: 400px;
}

.add-component-container::-webkit-scrollbar {
    width: 12px;
}

.add-component-container::-webkit-scrollbar-track {
    border-radius: 10px;
}

.add-component-container::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5); 
}

.flex-item {
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    margin-right: 10px;
}

h3 {
    margin-left: 10px;
}

label {
    color: black;
    margin-bottom: 5px;
}

.add-component-input, .add-component-options-input, .add-component-dropdown {
  flex-grow: 1;
  padding: 8px 16px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  background-color: #fff;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.add-component-input:focus, .add-component-options-input:focus, .add-component-dropdown:focus {
  outline: none;
  border-color: #846F91;
  box-shadow: 0 0 3px rgba(0, 184, 255, 0.3);
}

button {
  font-size: 16px;
  font-family: Lato, sans-serif;
  border: none;
  border-radius: 10px;
  margin-bottom: 10px;
  cursor: pointer;
}

#add-new-option-button {
    background-color: #846F91;
    color: white;
}

#save-add-component {
    background-color: #846F91;
    color: white;
    border: 2px solid #846F91;
    width: 100%;
    height: 30px;
}

#cancel-add-component {
    background-color: #E8DED9;
    color: black;
    border: 2px solid #846F91;
    width: 100%;
    height: 30px;
}

ion-icon {
    margin-top: 2px;
}

.submit-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 5px;
}
</style>