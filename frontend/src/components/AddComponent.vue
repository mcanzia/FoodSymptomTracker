<template>
  <div class="container">
    <h3>Add New Component</h3>
    <div class="form-container">
      <h4>Name:</h4>
      <input
        class="add-component-input"
        id="new-component-name"
        v-model="newComponent.name"
        required
        placeholder="Enter a name"
      />
    </div>
    <div class="form-container">
      <h4>Type:</h4>
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
    <div v-if="newComponent.typeId === 2 || newComponent.typeId === 3">
      <h4>Options:</h4>
      <div
        v-for="selectOption in newComponent.selectOptions"
        :key="selectOption.value"
      >
        <input
          class="add-component-input"
          id="new-component-options"
          v-model="selectOption.text"
        />
      </div>
      <button
        v-if="newComponent.selectOptions.length < 5"
        @click="addComponentOption()"
        id="add-new-option-button"
      >
        Add New Option
      </button>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useComponentStore } from '../stores/componentStore';

const componentStore = useComponentStore();

const { newComponent } = storeToRefs(componentStore);

const componentTypes = [
  { label: 'Slider', typeId: 1},
  { label: 'Single Select', typeId: 2},
  { label: 'Multi Select', typeId: 3},
];

function addComponentOption() {
  newComponent.value.selectOptions.push({text: '', value: ''});
}

</script>

<style scoped>
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
  border-color: #846F91;
  box-shadow: 0 0 3px rgba(0, 184, 255, 0.3);
}
</style>