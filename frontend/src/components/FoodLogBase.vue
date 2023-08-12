<template>
    <div class="container" v-if="dateLogStore.selectedDateLog">
      <div class="flex-column">
        <h2>What you ate today: </h2>
        <div v-if="editMode" class="search-container">
          <input
            list="existing-food-items"
            id="food-item-search"
            placeholder="Type to search..."
            v-model="foodItem"
            class="search-input"
          />
          <datalist id="existing-food-items">
            <option
              v-for="existingFoodItem in existingFoodItems"
              :key="existingFoodItem"
              :value="existingFoodItem"
            ></option>
          </datalist>
          <button @click="addFoodItem()" class="search-button">Add</button>
        </div>
        <FoodItemList :foodItems="dateLogStore.selectedDateLog.foodItems" :editMode="editMode" />
      </div>
      <div class="flex-column">
        <h2>Components: </h2>
        <ComponentDisplay
          v-for="component in dateLogStore.selectedDateLog.components"
          :key="component.id"
          :component="component"
          :disabled="!editMode"
          :layout="false"
        />
      </div>
    </div>
  </template>

<script setup>
import { useDateLogStore } from '../stores/dateLogStore';
import { useComponentStore } from '../stores/componentStore';
import { useFoodStore } from '../stores/foodStore';
import ComponentDisplay from './ComponentDisplay.vue';
import FoodItemList from './FoodItemList.vue';

const props = defineProps({
    editMode: Boolean
})

const dateLogStore = useDateLogStore();
const componentStore = useComponentStore();
const foodStore = useFoodStore();

let foodItem = "";
let existingFoodItems = ['Apple', 'Banana', 'Grape', 'Kiwi', 'Orange'];

function addFoodItem() {
  if (foodItem == "") {
      return;
  }

  if (dateLogStore.containsFoodDuplicate(foodItem)) {
      return console.log("This food is already in the list");
  }
  
  const newFoodItem = {
      id: null,
      name: this.foodItem
  }

  dateLogStore.selectedDateLog.foodItems.push(newFoodItem);
  foodItem = "";
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
  overflow-y: auto;
  max-height: calc(75vh - 10px);
}

h2 {
    font-family: garamond;
}

.search-container {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.search-input {
  flex-grow: 1;
  padding: 8px 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  background-color: #fff;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.search-input:focus {
  outline: none;
  border-color: #4AAE9B;
  box-shadow: 0 0 3px rgba(0, 184, 255, 0.3);
}

.search-button {
  padding: 8px 16px;
  font-size: 16px;
  color: #fff;
  background-color: #4AAE9B;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.search-button:hover {
  background-color: #4AAE9B;
}

.search-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

</style>