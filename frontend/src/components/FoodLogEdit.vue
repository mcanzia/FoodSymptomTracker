<template>
    <div>
        <div class="row">
            <div class="col"></div>
            <div class="col-8">
                <div class="card">
                    <div class="card-body">
                        <h3 class="card-title">What you ate today:</h3>
                        <input class="form-control mr-2 w-75" list="existing-food-items" id="food-item-search" placeholder="Type to search...">
                        <datalist id="existing-food-items" :options="existingFoodItems">
                            <option v-for="existingFoodItem in existingFoodItems" :key="existingFoodItem" :value="existingFoodItem"></option>
                        </datalist>
                        <button @click="addFoodItem()">Add</button>
                    </div>
                </div>
            </div>
            <div class="col"></div>
        </div>
        <div class="row">
            <div class="col"></div>
            <div class="col-8">
                <div class="card">
                    <div class="card-body">
                        <ul class="list-group">
                            <li class="list-group-item" v-for="foodItem in dateLogStore.selectedDateLog.foodItems" :key="foodItem.name">
                                {{ foodItem.name }}
                                <span class="change-icon">
                                    <ion-icon name="remove-circle-outline" class="bi right mt-1"></ion-icon>
                                    <ion-icon name="remove-circle" class="bi right mt-1" @click="removeFoodItem(item)"></ion-icon>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col"></div>
        </div>
        <div class="row">
            <div class="col"></div>
            <div class="col-8">
                <div class="card" v-for="component in dateLogStore.selectedDateLog.components" :key="component.id">
                    <div class="card-body">
                        <ComponentDisplay :component="component" :disabled="false" />
                    </div>
                </div>
            </div>
            <div class="col"></div>
        </div>
    </div>
</template>

<script setup>
import { useDateLogStore } from '../stores/dateLogStore';
import ComponentDisplay from './ComponentDisplay.vue';

const dateLogStore = useDateLogStore();

let foodItem = "";
let existingFoodItems = ['Apple', 'Banana', 'Grape', 'Kiwi', 'Orange'];
let selectedDay = 0;

function addFoodItem() {
    if (foodItem == "") {
        return;
    }

    if (dateLogStore.containsFoodDuplicate(foodItem)) {
        return console.log("This food is already in the list");
    }
    
    const newFoodItem = {
        id: null,
        name: foodItem
    }

    dateLogStore.selectedDateLog.foodItems.push(newFoodItem);
    foodItem = "";
}

function removeFoodItem(item) {
    const index = dateLogStore.selectedDateLog.foodItems.indexOf(item);
    if (index > -1) {
        dateLogStore.selectedDateLog.foodItems.splice(index, 1); 
    }
    
}

</script>

<style scoped>
.change-icon > .bi + .bi,
  .change-icon:hover > .bi {
    display: none;
  }
  .change-icon:hover > .bi + .bi {
    display: inherit;
  }
  .right {
    float: right;
  }
</style>