<template>
    <ul class="food-item-list">
      <FoodItem
        v-for="foodItem in foodItems"
        :key="foodItem.name"
        :foodItem="foodItem"
        :editMode="editMode"
      />
    </ul>
  </template>

<script setup>
import FoodItem from './FoodItem.vue';

const props = defineProps({
    foodItems: Array,
    editMode: Boolean
})

</script>

<style scoped>
.food-item-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.food-item-list:not(:empty) {
  border: 2px #846F91 solid;
}

.food-item-list > li:not(:last-child) {
  border-bottom: 1px solid;
}
</style>