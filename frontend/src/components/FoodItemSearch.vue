<template>
    <div class="search-container">
        <div class="form-input-container">
          <input
                id="food-item-search"
                placeholder="Type to search..."
                v-model="searchTerm"
                @keyup.enter="submitFood"
                class="search-input"
                ref="foodItemSearchRef"
                @focus="searching = true"
                :disabled="disabled"
            />
          <ion-icon name="close" @click="resetFood()"></ion-icon>
        </div>
        <ul v-if="searchTerm && searching" class="search-results">
            <li v-for="item in filteredList" :key="item" @click="selectItem(item)">
                {{ item.name }}
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useFoodStore } from '../stores/foodStore';
import { useDateLogStore } from '../stores/dateLogStore';

const props = defineProps({
  clearAfterChosen: Boolean
});

const emits = defineEmits(['submitFood', 'resetFood']);

onMounted(async () => {
  await foodStore.initializeFoodList();
  if (foodStore.foods.length === 0) {
    disabled.value = true;
  }
});

const foodStore = useFoodStore();
const dateLogStore = useDateLogStore();
const searchTerm = ref("");
const foodItemSearchRef = ref(null);
const searching = ref(false);
const disabled = ref(false);

const filteredList = computed(() => {
  return foodStore.foods.filter(food => 
    food.name.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});

const selectItem = (item) => {
  searchTerm.value = item.name;
  submitFood();
};

defineExpose({
        foodItemSearchRef
    });

function submitFood() {
    if (props.clearAfterChosen) {
      if (dateLogStore.containsFoodDuplicate(searchTerm.value)) {
        setWarningMessage(foodItemSearchRef.value, "This food is already in the list");
        return;
      }
      emits('submitFood', searchTerm.value);
      resetFood();
    } else {
      const chosenFoodItem = foodStore.foods.find(food => food.name === searchTerm.value);
      if (!chosenFoodItem) {
        setWarningMessage(foodItemSearchRef.value, "This is not one of your chosen foods");
        return;
      }
      emits('submitFood', chosenFoodItem);
      searching.value = false;
    }
}

function resetFood() {
  emits('resetFood');
  searchTerm.value = "";
  searching.value = false;
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
.search-input {
  flex-grow: 1;
  padding: 8px 16px;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 16px;
  background-color: #fff;
  transition: border-color 0.2s, box-shadow 0.2s;
  width: 90%;
}

.search-input:focus {
  outline: none;
  border-color: #846F91;
  box-shadow: 0 0 3px rgba(0, 184, 255, 0.3);
}

.search-container {
  position: relative;
  flex-grow: 1;
}

.search-results {
  position: absolute;
  width: 100%;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 10;
  border: 1px solid #ccc;
  border-top: none;
  background-color: white;
  list-style: none;
  margin: 0;
  margin-top: 5px;
  padding: 0;
  max-height: 200px;
  overflow-y: auto;
  font-family: Lato, sans-serif;
}

.search-results li {
  padding: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.search-results li:hover {
  background-color: #f0f0f0;
}

.form-input-container{
    display: inline-flex;
    align-items: center;
    width: 100%;
}

.form-input-container ion-icon {
    margin-left: 8px;
    cursor: pointer;
}

@media only screen and (min-width: 770px) {
  .form-input-container:hover ion-icon {
    opacity: 1;
    animation: fade-right 0.1s linear forwards;
  }
}

</style>