<template>
    <div class="container" @click.self="closeCalendar()">
        <div id="homeHeader" class="flex-item">
            <a href="#" v-if="!logEditMode" @click="goToPreviousDay()">
                <ion-icon name="caret-back"></ion-icon>
            </a>
            <a href="#" @click="calendarActive = true">
                <h1>{{dateLogStore.dayTitle}}</h1>
            </a>
            <a href="#" v-if="!logEditMode" @click="goToNextDay()">
                <ion-icon name="caret-forward"></ion-icon>
            </a>
            <br />
        </div>
        <div id="homeBody" class="flex-item">
            <FoodLogBase :editMode="logEditMode" />
        </div>
        <Modal class="modal" v-if="calendarActive" :bodyActive="true">
            <template v-slot:body>
                <Calendar :active="calendarActive" @date-set="setDateField" @close-calendar="closeCalendar()"/>
            </template>
        </Modal>
        <FloatingButton saveType="Date Log" :editMode="logEditMode" @saveOrEdit="saveOrEdit()" @closeEditMode="closeEditMode()"/>
    </div>
</template>

<script setup>
import FoodLogBase from './FoodLogBase.vue';
import Calendar from './Calendar.vue';
import Modal from './Modal.vue';
import FloatingButton from './FloatingButton.vue';
import { useUserStore } from '../stores/userStore';
import { useDateLogStore } from '../stores/dateLogStore';
import { useComponentStore } from '../stores/componentStore';
import { useFoodStore } from '../stores/foodStore';
import { onBeforeMount, computed, ref } from 'vue';

const userStore = useUserStore();
const dateLogStore = useDateLogStore();
const componentStore = useComponentStore();
const foodStore = useFoodStore();

onBeforeMount(async() => {
    userAccessToken = await userStore.getAccessToken();
    await componentStore.initializeComponentLists(userAccessToken);
    await dateLogStore.initializeStore(userAccessToken, currentDateString.value, componentStore.selectedComponents);
    await foodStore.initializeFoodList(userAccessToken);
    //testEndpoints()
});

let userAccessToken = null;
let selectedDay = 0;
let logEditMode = ref(false);
let dayTitle = "";
let calendarSelection = new Date();
let allFoods = [];
let calendarActive = ref(false);

let currentDateString = computed(() => {
  return new Date().toLocaleDateString();
});

let currentDate = computed(() => {
  return new Date();
});

async function saveOrEdit() {
    if (logEditMode.value) {
        await foodStore.addFoods(userAccessToken, dateLogStore.selectedDateLog.foodItems);
        dateLogStore.selectedDateLog.foodItems = dateLogStore.selectedDateLog.foodItems.map(food => {
            return foodStore.getExistingFood(food.name);
        });
        dateLogStore.addDateLogs(userAccessToken, new Array(dateLogStore.selectedDateLog));
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
    logEditMode.value = false;
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
.flex-item {
  text-align: center;
  flex: 0 0 100%;
  /* background-color: white; */
  padding: 5px 100px 5px 100px;
}

h1 {
    font-family: garamond;
}

a {
    color: black
}

a:link, a:visited, a:hover, a:active {
    text-decoration: none;
}


#homeHeader a, h1 {
    display: inline;
    margin: 10px;
}

.container:before {
    /* background-image: url('src/assets/food_background.png'); */
    background: wheat;
    content: ' ';
    display: block;
    position: absolute;
    left: 0;
    /* top: 0; */
    width: 100%;
    height: 100%;
    opacity: 1.0;
    background-repeat: no-repeat;
    /* background-position: 50% 0; */
    background-size: cover;
    z-index: -1;
}

#chooseDateModal button {
    border-radius: 25px;
    height: 50px;
    width: 200px;
    display: inline;
    margin: 5px;
    background-color: #4AAE9B;
    cursor: pointer;
}

#chooseDateModal button:hover {
    background-color: lightblue;
}

#homeHeader {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #f1f1f1;
}

#homeHeader a {
  color: #333;
  display: inline;
  text-decoration: none;
  margin-right: 10px;
  font-size: 20px;
}

#homeHeader h1 {
  margin: 0;
  font-size: 28px;
  font-weight: bold;
  display: inline;
}

.floating-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  color: #ffffff;
  font-size: 24px;
  line-height: 60px;
  text-align: center;
  border: none;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
  transition: background-color 0.3s ease;
}

.floating-button-edit {
  background-color: #2c3e50;
}

.floating-button-edit:hover {
  background-color: #34495e;
}

.floating-button-save {
  background-color: #4AAE9B;
}

.floating-button-save:hover {
  background-color: #42A38D;
}

.floating-button-cancel {
  background-color: #990000;
  right: 90px;
}

.floating-button-cancel:hover {
  background-color: #990000;
}

.close-icon {
    padding-top: 13px;
    font-size: 30px;
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
}



</style>