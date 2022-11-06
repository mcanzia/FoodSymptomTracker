<template>
    <div>
    <b-row>
        <b-col></b-col>
        <b-col cols="8">
            <b-card>
                <b-card-title>What did you eat today?</b-card-title>
                <b-form inline>
                    <b-form-input list="existing-food-items" id="food-item-search" v-model="foodItem" placeholder="Search" class="mr-2 w-75"></b-form-input>
                    <b-datalist id="existing-food-items" :options="existingFoodItems"></b-datalist>
                    <b-button @click="addFoodItem()">Add</b-button>
                </b-form>
            </b-card>
        </b-col>
        <b-col></b-col>
    </b-row>
    <b-row>
        <b-col></b-col>
        <b-col cols="8">
            <b-card>
                <b-list-group v-for="item in dateLogStore.foodItems" :key="item.name">
                    <b-list-group-item>
                        {{ item.name }} 
                        <span class="change-icon">
                            <b-icon icon="dash-circle" class="bi right mt-1" variant="danger"></b-icon>
                            <b-icon icon="dash-circle-fill" class="bi right mt-1" variant="danger" @click="removeFoodItem(item)"></b-icon>
                        </span>
                    </b-list-group-item>
                </b-list-group>
            </b-card>
        </b-col>
        <b-col></b-col>
    </b-row>
    <b-row>
        <b-col></b-col>
        <b-col cols="8">
            <b-card v-for="(component) in dateLogStore.components" :key="component.id">
                <b-form v-if="component.typeId == 1">
                    <label :for="component.id">{{component.name}}</label>
                    <b-form-input :id="component.id" type="range" min="0" max="10" step="0.10" class="text-center" v-model="component.value"></b-form-input>
                    <div class="mt-2">Value: {{ component.value }}</div>   
                </b-form>
                <b-form v-if="component.typeId == 2">
                    <label :for="component.id">{{component.name}}</label>
                    <b-form-radio-group :id="component.id" :name="component.name" :options="component.selectOptions" v-model="component.value" text-field="text" value-field="value" class="text-center"></b-form-radio-group>
                </b-form>
                <b-form v-if="component.typeId == 3">
                    <label :for="component.id">{{component.name}}</label>
                    <b-form-checkbox-group :id="component.id" :name="component.name" :options="component.selectOptions" v-model="component.values" text-field="text" value-field="value" class="text-center"></b-form-checkbox-group>
                </b-form>
            </b-card>
        </b-col>
        <b-col></b-col>
    </b-row>
    </div>
</template>

<script>
import { useDateLogStore } from '../stores/dateLogStore';
import { useComponentStore } from '../stores/componentStore';
import { useFoodStore } from '../stores/foodStore';
export default {
    setup() {
        const dateLogStore = useDateLogStore();
        const componentStore = useComponentStore();
        const foodStore = useFoodStore();

        return {
            dateLogStore,
            componentStore,
            foodStore
        }
    },
    components: {
    },
    data() {
        return {
            foodItem: "",
            existingFoodItems: ['Apple', 'Banana', 'Grape', 'Kiwi', 'Orange'],
            selectedDay: 0,
        }
    },
    methods: {
        addFoodItem() {
            if (this.foodItem == "") {
                return;
            }

            if (this.dateLogStore.containsFoodDuplicate(this.foodItem)) {
                return console.log("This food is already in the list");
            }

            const newFoodItem = {
                id: null,
                name: this.foodItem
            }

            this.dateLogStore.foodItems.push(newFoodItem);
            this.foodItem = "";
        },
        removeFoodItem(item) {
            const index = this.dateLogStore.foodItems.indexOf(item);
            if (index > -1) {
                this.dateLogStore.foodItems.splice(index, 1); 
            }
            
        }
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