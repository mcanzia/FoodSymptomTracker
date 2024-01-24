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
            @keyup.enter="addFoodItem()"
            class="search-input"
            ref="foodItemInput"
          />
          <button @click="addFoodItem()" class="search-button">Add</button>
        </div>
        <div class="list-wrapper">
          <FoodItemList :foodItems="dateLogStore.selectedDateLog.foodItems" :editMode="editMode" />
        </div>
      </div>
      <div class="flex-column">
        <h2>Components: </h2>
        <div class="list-wrapper">
          <ComponentDisplay
            v-for="component in dateLogStore.selectedDateLog.components"
            :key="component.id"
            :component="component"
            :disabled="!editMode"
            :layout="false"
          />
        </div>
      </div>
    </div>
  </template>

<script setup>
import { useDateLogStore } from '../stores/dateLogStore';
import { ref } from 'vue';
import ComponentDisplay from './ComponentDisplay.vue';
import FoodItemList from './FoodItemList.vue';

const props = defineProps({
    editMode: Boolean
})

const dateLogStore = useDateLogStore();

const foodItem = ref("");
const foodItemInput = ref(null);

function addFoodItem() {
  if (foodItem.value === "") {
      return;
  }

  if (dateLogStore.containsFoodDuplicate(foodItem.value)) {
      setWarningMessage(foodItemInput.value, "This food is already in the list");
      return;
  }
  
  const newFoodItem = {
      id: null,
      name: foodItem.value
  }

  dateLogStore.selectedDateLog.foodItems.push(newFoodItem);
  foodItem.value = "";
}

function setWarningMessage(refTarget, message) {
  refTarget.setCustomValidity(message);
  refTarget.reportValidity();
  setTimeout(() => {
    refTarget.setCustomValidity("");
  },2000);
}

</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow-y: scroll;
}

.flex-column {
  height: 100%;
}

.list-wrapper > * {
  margin-bottom: 20px;
}

h2 {
  font-family: Lato, sans-serif;
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
  border-color: #846F91;
  box-shadow: 0 0 3px rgba(0, 184, 255, 0.3);
}

.search-button {
  padding: 8px 16px;
  font-size: 16px;
  color: #fff;
  background-color: #846F91;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.search-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

</style>