<template>
    <div class="container" v-if="dateLogStore.selectedDateLog">
      <div class="flex-column">
        <h2>What you ate today: </h2>
        <div v-if="editMode" class="search-container">
          <FoodItemSearch @update:modelValue="addFoodItem" :clear-after-chosen="true" ref="foodSearchComponentRef"/>
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
import FoodItemSearch from './FoodItemSearch.vue';

const props = defineProps({
    editMode: Boolean
})

const dateLogStore = useDateLogStore();

const foodSearchComponentRef = ref(null);

function addFoodItem(foodItem) {
  if (foodItem === "") {
      return;
  }
  
  const newFoodItem = {
      id: null,
      name: foodItem
  }

  dateLogStore.selectedDateLog.foodItems.push(newFoodItem);
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

</style>