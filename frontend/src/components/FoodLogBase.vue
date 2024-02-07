<template>
    <div class="container" v-if="dateLogStore.selectedDateLog">
      <div class="flex-column">
        <h2>What you ate today: </h2>
        <div v-if="editMode" class="search-container" >
          <FoodItemSearch @update:modelValue="addFoodItem" :clear-after-chosen="true" ref="foodSearchComponentRef"/>
        </div>
        <div class="list-wrapper">
          <FoodItemList :foodItems="dateLogStore.selectedDateLog.foodItems" :editMode="editMode" />
        </div>
      </div>
      <div class="flex-column">
        <h2>Components: </h2>
        <div class="list-wrapper" v-if="componentsPresent">
          <ComponentDisplay
            v-for="component in dateLogStore.selectedDateLog.components"
            :key="component.id"
            :component="component"
            :disabled="!editMode"
            :layout="false"
          />
        </div>
        <div v-else>
          <p>New components can be added in Layout page</p>
        </div>
      </div>
    </div>
  </template>

<script setup>
import { useDateLogStore } from '../stores/dateLogStore';
import { ref, computed } from 'vue';
import ComponentDisplay from './ComponentDisplay.vue';
import FoodItemList from './FoodItemList.vue';
import FoodItemSearch from './FoodItemSearch.vue';

const props = defineProps({
    editMode: Boolean
})

const dateLogStore = useDateLogStore();

const componentsPresent = computed(() => {
  return dateLogStore.selectedDateLog.components && dateLogStore.selectedDateLog.components.length !== 0;
});

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
  flex-wrap: wrap;
  gap: 2rem;
  height: 100%;
}

.flex-column {
  flex-basis: calc(50% - 2rem);
  height: 100%;
}

.list-wrapper > * {
  margin-bottom: 20px;
}

.list-wrapper {
  overflow-y: scroll;
  height: 100%;
  max-height: 85%;
}

h2, p {
  font-family: Lato, sans-serif;
}

.search-container {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
}

</style>