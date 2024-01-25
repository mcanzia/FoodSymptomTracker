<template>
    <div class="container"
        @touchstart="handleTouchStart" 
        @touchmove="handleTouchMove" 
        @touchend="handleTouchEnd">
        <div class="date-header-container">
            <div id="homeHeader" @click.self="closeCalendar()" role="heading" aria-labelledby="calendarLabel" aria-level="1">
                <div>
                    <a href="#" v-if="!logEditMode" @click="goToPreviousDay()" aria-label="Previous Day">
                        <ion-icon name="caret-back" aria-hidden="true"></ion-icon>
                    </a>
                    <a href="#" @click="calendarActive = true">
                        <h1 id="calendarLabel" aria-live="polite" :aria-label="dateLogStore.dayTitle">{{dateLogStore.dayTitle}}</h1>
                    </a>
                    <a href="#" v-if="!logEditMode" @click="goToNextDay()" aria-label="Next Day">
                        <ion-icon name="caret-forward" aria-hidden="true"></ion-icon>
                    </a>
                </div>
                <div>
                    <button id="closeEditButton" v-if="logEditMode" @click="closeEditMode()">Close</button>
                    <button id="saveEditButton" @click="saveOrEdit()">{{ logEditMode ? 'Save' : 'Edit' }}</button>
                </div>
            </div>
                <DropDown class="date-dropdown" v-if="calendarActive && !logEditMode" role="dialog" aria-modal="true">
                    <template v-slot:body>
                        <air-calendar @date-input="setDateField"></air-calendar>
                    </template>
                </DropDown>
        </div>
        <FoodLogBase v-if="!isMobile()" id="homeBody" :editMode="logEditMode" @click="closeCalendar()" role="main" />
        <FoodLogBaseMobile v-else id="homeBody" :editMode="logEditMode" @click="closeCalendar()" role="main" />
    </div>
</template>

<script setup>
import FoodLogBase from './FoodLogBase.vue';
import FoodLogBaseMobile from './FoodLogBaseMobile.vue';
import AirCalendar from './AirCalendar.vue';
import { storeToRefs } from 'pinia';
import DropDown from './DropDown.vue';
import { useDateLogStore } from '../stores/dateLogStore';
import { useComponentStore } from '../stores/componentStore';
import { useFoodStore } from '../stores/foodStore';
import { onBeforeMount, computed, ref, watch } from 'vue';

const dateLogStore = useDateLogStore();
const componentStore = useComponentStore();
const foodStore = useFoodStore();

onBeforeMount(async() => {
    await componentStore.initializeComponentLists();
    await dateLogStore.initializeStore(currentDateString.value, componentStore.selectedComponents);
    await foodStore.initializeFoodList();
    //testEndpoints()
});

let selectedDay = 0;
let logEditMode = ref(false);
let dayTitle = "";
let calendarSelection = new Date();
let allFoods = [];
let calendarActive = ref(false);
let touchCoordinates = {
    touchStartX: 0,
    touchStartY: 0,
    touchEndX: 0,
    touchEndY: 0
}
      

let currentDateString = computed(() => {
  return new Date().toLocaleDateString();
});

let currentDate = computed(() => {
  return new Date();
});

function isMobile() {
  return screen.width <= 770 ? true : false;
}

async function saveOrEdit() {
    if (logEditMode.value) {
        await foodStore.addFoods(dateLogStore.selectedDateLog.foodItems);
        dateLogStore.selectedDateLog.foodItems = dateLogStore.selectedDateLog.foodItems.map(food => {
            return foodStore.getExistingFood(food.name);
        });
        dateLogStore.addDateLogs(new Array(dateLogStore.selectedDateLog));
    }
    if (!logEditMode.value) {
        dateLogStore.dateLogCopy = JSON.parse(JSON.stringify(dateLogStore.selectedDateLog));
    } 
    logEditMode.value = !logEditMode.value;
}

async function goToNextDay() {
    const nextDay = new Date(dateLogStore.selectedDateLog.date);
    nextDay.setDate(nextDay.getDate() + 1);
    dateLogStore.selectDay(nextDay.toLocaleDateString('en-us', {timeZone: 'UTC'}));
}

async function goToPreviousDay() {
    const previousDay = new Date(dateLogStore.selectedDateLog.date);
    previousDay.setDate(previousDay.getDate() - 1);
    dateLogStore.selectDay(previousDay.toLocaleDateString('en-us', {timeZone: 'UTC'}));
}

async function chooseDate() {
    dateLogStore.selectDay(calendarSelection.toLocaleDateString('en-us', {timeZone: 'UTC'}));
}

function setDateField(selectedDate) {
    calendarSelection = new Date(selectedDate);
    chooseDate();
    closeCalendar();
}

function closeCalendar() {
    calendarActive.value = false;
}

function closeEditMode() {
    dateLogStore.selectedDateLog = JSON.parse(JSON.stringify(dateLogStore.dateLogCopy));
    logEditMode.value = false;
}

function handleTouchStart(event) {
    touchCoordinates.touchStartX = event.changedTouches[0].screenX;
    touchCoordinates.touchStartY = event.changedTouches[0].screenY;
}
function handleTouchEnd(event) {
    touchCoordinates.touchEndX = event.changedTouches[0].screenX;
    touchCoordinates.touchEndY = event.changedTouches[0].screenY;
    if (!logEditMode.value) {
        handleSwipeGesture();
    }
}
function handleSwipeGesture() {
    const deltaX = touchCoordinates.touchEndX - touchCoordinates.touchStartX;
    const deltaY = touchCoordinates.touchEndY - touchCoordinates.touchStartY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX >= 100) {
            goToPreviousDay();
        } else if (deltaX <= -100) {
            goToNextDay();
        }
    }
}

function testEndpoints() {
    //this.allFoods = this.foodService.getAllFoods(this.auth.currentUser);
//this.foodService.getFoodById(this.auth.currentUser, 'RzXHA9fgrB7748vRkvjM');
//this.dateLogStore.foodItems.push({ id: "", name: "Banana"});
//this.foodService.addFoods(this.auth.currentUser, this.dateLogStore.foodItems);
//this.dateLogService.getAllDateLogs(await this.userStore.getAccessToken());
//this.dateLogService.getDateLogById(this.auth.currentUser, 'PGQ0CTGlM0Boe7Z79W3l');
/*let dateLogItems = [];
dateLogItems.push({
    id: '',
    date: '10/26/2022',
    foodItems: [
        {
            id: 'HriRbXuQ0Koa230LBtbf',
            name: 'Grape'
        }
    ],
    components: this.dateLogStore.components,
});
this.dateLogService.addDateLogs(this.auth.currentUser, dateLogItems);*/
/*let dateLogUpdate = {
    id: 'KZodVKilnluY3tVi4Tyz',
    date: '10/27/2022',
    foodItems: [],
    components: this.dateLogStore.components
}
this.dateLogService.updateDateLog(this.auth.currentUser, dateLogUpdate)*/
//this.componentService.getAllComponents(await this.userStore.getAccessToken());
//this.componentService.getComponentById(this.auth.currentUser, '2qxzyxX82GmiDOAHcJVs');
/*let componentItems = [];
componentItems.push({
    id: '',
    name: 'Dummy',
    selectOptions: this.componentStore.availableComponents[0].selectOptions,
    selected: false,
    typeId: 2
});
this.componentService.addComponents(this.auth.currentUser, componentItems);*/
/*let componentUpdate = {
    id: 'rVT5buIqaEXwucr7WRwZ',
    name: 'Update Dummy',
    selectOptions: this.componentStore.availableComponents[0].selectOptions,
    selected: true,
    typeId: 2
};
this.componentService.updateComponent(this.auth.currentUser, componentUpdate);*/
}

</script>

<style scoped>

.container {
    height: 100%;
}

.date-header-container {
    position: relative;
}

.date-dropdown {
    position: absolute;
    top: 100%;
    left: 4%;
    animation: fade 0.3s linear forwards;
    z-index: 100;
  }

#homeBody {
  text-align: center;
  max-height: 80%;
}

h1 {
    font-family: Lato, sans-serif;
}

a {
    color: black
}

a:link, a:visited, a:hover, a:active {
    text-decoration: none;
}

#homeHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
}

@media only screen and (max-width: 770px) {
    #homeHeader {
        flex-direction: column;
    }

    #homeHeader button {
        margin-top: 10px;
        margin-bottom: 5px;
        margin-right: 15px;
    }
}

#homeHeader a, h1 {
    display: inline;
    margin: 10px;
}

#homeHeader a {
  color: #333;
  text-decoration: none;
  margin-right: 10px;
  font-size: 20px;
}

#homeHeader h1 {
  margin: 0;
  font-size: 28px;
  font-weight: bold;
  display: inline;
  font-family: Lato, sans-serif;
}

#homeHeader button {
  padding: 8px 30px;
  font-size: 16px;
  font-family: Lato, sans-serif;
  border-radius: 10px;
  margin-left: 10px;
  height: 20%;
  cursor: pointer;
}

#closeEditButton {
    background-color: #D9D9D9;
    border: #846F91 2px solid;
    color: black;
}

#closeEditButton:hover {
    background-color: #423748;
    border: #423748 2px solid;
    color: white;
}

#saveEditButton {
    background-color: #846F91;
    color: white;
    border: #846F91 2px solid;
}

#saveEditButton:hover {
    background-color: #423748;
    border: #423748 2px solid;
}

.close-icon {
    padding-top: 13px;
    font-size: 30px;
}



</style>