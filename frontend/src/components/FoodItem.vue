<template>
  <li class="food-item">
    <div class="content-wrapper">
      <h3 class="food-item-name">{{ foodItem.name }}</h3>
      <span class="change-icon" v-if="editMode">
        <ion-icon name="remove-circle-outline" class="bi"></ion-icon>
        <ion-icon name="remove-circle" class="bi" @click="removeFoodItem(foodItem)"></ion-icon>
      </span>
    </div>
  </li>
</template>

<script setup>
import { useDateLogStore } from '../stores/dateLogStore';

const props = defineProps({
    foodItem: Object,
    editMode: Boolean
})

const dateLogStore = useDateLogStore();

function removeFoodItem(item) {
    const index = dateLogStore.selectedDateLog.foodItems.indexOf(item);
    if (index > -1) {
        dateLogStore.selectedDateLog.foodItems.splice(index, 1); 
    }
    
}

</script>

<style scoped>
  .food-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
  margin-bottom: 10px;
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s;
}

.food-item:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.content-wrapper {
  display: flex;
  align-items: center;
  gap: 5px;
}

.food-item-name {
  font-size: 18px;
  font-weight: 500;
  margin: 0;
}

.change-icon {
  display: flex;
  align-items: center;
}

  .change-icon > .bi + .bi,
  .change-icon:hover > .bi {
    display: none;
  }

  .change-icon:hover > .bi + .bi {
    display: inherit;
  }

  .bi {
    color: #dc3545;
    cursor: pointer;
  }

  .bi:hover {
    color: #c82333;
  }
</style>
