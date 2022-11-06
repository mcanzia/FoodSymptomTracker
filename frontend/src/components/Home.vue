<template>
        <b-container>
            <br />
            <b-carousel
                id="day-selection-carousel"
                v-model="selectedDay"
                controls
                background="#ababab"
            >
                    <b-row class="text-center">
                        <b-col cols="4">
                            <a href="javascript:void(0);" v-if="!logEditMode" @click="goToPreviousDay()" class="nav-link ml-5"><b-icon icon="caret-left-fill" scale="1.5"></b-icon></a>
                        </b-col>
                        <b-col cols="4">
                            <a href="javascript:void(0);" @click="$bvModal.show('date-select-modal')" class="nav-link"><h3>{{dayTitle}}</h3></a>
                            
                            <b-button @click="saveOrEdit()">{{ logEditMode ? "Save" : "Edit"}}</b-button>
                        </b-col>
                        <b-col cols="4">
                            <a href="javascript:void(0);" v-if="!logEditMode" @click="goToNextDay()" class="nav-link mr-5"><b-icon icon="caret-right-fill" scale="1.5"></b-icon></a>
                        </b-col>
                    </b-row>
                    <br />
                    <FoodLogEdit v-if="logEditMode" />
                    <FoodLogBase v-else />
                    <br />
            </b-carousel>
            <br />
            <b-modal 
                id="date-select-modal" 
                title="Please choose a date:"
                @ok="chooseDate()">
                <b-calendar v-model="calendarSelection" block value-as-date></b-calendar>
            </b-modal>
        </b-container>
</template>

<script>
import FoodLogEdit from './FoodLogEdit.vue';
import FoodLogBase from './FoodLogBase.vue';
import { format, subDays, addDays, intervalToDuration, isBefore } from 'date-fns';
import { auth, db } from '../firebase';
import { useUserStore } from '../stores/userStore';
import { useDateLogStore } from '../stores/dateLogStore';
import { useComponentStore } from '../stores/componentStore';
import { useFoodStore } from '../stores/foodStore';
import { FoodService } from '../services/FoodService';
import { DateLogService } from '../services/DateLogService';
import { ComponentService } from '../services/ComponentService';
export default {
    setup() {
        const userStore = useUserStore();
        const dateLogStore = useDateLogStore();
        const componentStore = useComponentStore();
        const foodStore = useFoodStore();
        const foodService = new FoodService();
        const dateLogService = new DateLogService();
        const componentService = new ComponentService();

        return {
            userStore,
            dateLogStore,
            componentStore,
            foodStore,
            foodService,
            dateLogService,
            componentService
        }
    },
    async created() {
        this.initializeComponentLists();
        await this.retrieveDateLog(this.currentDateString);
        this.dayTitle = "Today";
        this.initializeFoodList();
        //this.allFoods = this.foodService.getAllFoods(this.auth.currentUser);
        //this.foodService.getFoodById(this.auth.currentUser, 'RzXHA9fgrB7748vRkvjM');
        //this.dateLogStore.foodItems.push({ id: "", name: "Banana"});
        //this.foodService.addFoods(this.auth.currentUser, this.dateLogStore.foodItems);
        this.dateLogService.getAllDateLogs(this.auth.currentUser);
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
        //this.componentService.getAllComponents(this.auth.currentUser);
        //this.componentService.getComponentById(this.auth.currentUser, '2qxzyxX82GmiDOAHcJVs');
        /*let componentItems = [];
        componentItems.push({
           id: '',
           name: 'Dummy',
           order: 0,
           selectOptions: this.componentStore.availableComponents[0].selectOptions,
           selected: false,
           typeId: 2
        });
        this.componentService.addComponents(this.auth.currentUser, componentItems);*/
        /*let componentUpdate = {
            id: 'rVT5buIqaEXwucr7WRwZ',
            name: 'Update Dummy',
            order: 4,
            selectOptions: this.componentStore.availableComponents[0].selectOptions,
            selected: true,
            typeId: 2
        };
        this.componentService.updateComponent(this.auth.currentUser, componentUpdate);*/
    },
    components: {
        FoodLogEdit,
        FoodLogBase
    },
    data() {
        return {
            auth,
            db,
            selectedDay: 0,
            logEditMode: false,
            dayTitle: "",
            calendarSelection: new Date(),
            allFoods: []
        }
    },
    props:[],
    computed: {
        currentDateString() {
            return format(new Date(), 'MM/dd/yyyy');
        },
        currentDate() {
            return new Date(format(new Date(), 'MM/dd/yyyy'));
        },
        selectedDate() {
            return new Date(this.dateLogStore.date);
        }
    },
    methods: {
        async initializeComponentLists() {
            try {
                await db.collection('users')
                        .doc(this.auth.currentUser.uid)
                        .collection('components')
                        .get()
                        .then(snapshot => {
                            if (snapshot.empty) {
                                return;
                            }
                            this.componentStore.availableComponents = snapshot.docs.filter(selection => !isSelected(selection)).map(selection => setComponentData(selection));
                            this.componentStore.selectedComponents = snapshot.docs.filter(selection => isSelected(selection)).map(selection => setComponentData(selection));

                            function isSelected(component) {
                                return component.data().selected;
                            }

                            function setComponentData(component) {
                                let componentData = 
                                {
                                    name: component.data().name,
                                    id: component.id,
                                    typeId: component.data().typeId,
                                    order: component.data().order,
                                    selectOptions: component.data().selectOptions,
                                    selected: component.data().selected
                                }
                                return componentData;
                            }
                        })
            } catch (error) {
                console.log(error)
            }
        },
        async initializeFoodList() {
            try {
                await db.collection('users')
                        .doc(this.auth.currentUser.uid)
                        .collection('foods')
                        .get()
                        .then(snapshot => {
                            if (snapshot.empty) {
                                return;
                            }
                            this.foodStore.foods = snapshot.docs.map(value => {
                                    let foodData =
                                        {
                                            id: value.id,
                                            name: value.data().name
                                        }
                                        return foodData;
                                    });
                        })
                
            } catch (error) {
                console.log(error)
            }
        },
        async retrieveDateLog(dateSelection) {
            try {                
                await db.collection('users')
                    .doc(this.auth.currentUser.uid)
                    .collection('dateLogs')
                    .where('date', '==', dateSelection)
                    .limit(1)
                    .get()
                    .then(snapshot => {
                        if (snapshot.empty) {
                            this.setNewDateLogFields(dateSelection);
                            return;
                        }
                        let snapshotData = snapshot.docs[0].data();
                        this.setExistingDateLogFields(snapshot.docs[0].id, snapshotData.date, snapshotData.foodItems, snapshotData.components);
                    })
            } catch (error) {
                console.log(error);
            }
        },
        async createDateLog() {
            try {
                await db.collection('users')
                    .doc(this.auth.currentUser.uid)
                    .collection('dateLogs')
                    .add({
                        date: this.dateLogStore.date,
                        foodItems: this.dateLogStore.foodItems,
                        components: this.dateLogStore.components
                    })
                    .then(createdDateLog => {
                        this.dateLogStore.dateLogId = createdDateLog.id;
                    })
            } catch (error) {
                console.log(error)
            }
            
        },
        async updateDateLog() {
            try {
                await db.collection('users')
                    .doc(this.auth.currentUser.uid)
                    .collection('dateLogs')
                    .doc(this.dateLogStore.dateLogId)
                    .update({
                        foodItems: this.dateLogStore.foodItems,
                        components: this.dateLogStore.components,
                    })
            } catch (error) {
                console.log(error);
            }
        },
        async addFood() {
            try {
                var batch = db.batch();
                for (var food of this.dateLogStore.foodItems) {
                    if (null === food.id) {
                        const existingFood = this.foodStore.getExistingFood(food.name);
                        console.log(existingFood);
                        if (existingFood !== null) {
                            food.id = existingFood.id;
                            continue;
                        }
                        const foodDoc = db.collection('users').doc(this.auth.currentUser.uid).collection('foods').doc();
                        const newFood = 
                            {
                                name: food.name
                            }
                        batch.set(foodDoc, newFood);
                        food.id = foodDoc.id;
                    }
                }

                await batch.commit();
            } catch (error) {
                console.log(error);
            }
        },
        setNewDateLogFields(date) {
            this.dateLogStore.dateLogId = "";
            this.dateLogStore.date = date;
            this.dateLogStore.foodItems = [];
            this.dateLogStore.components = this.componentStore.selectedComponents.map(comp => {
                const componentDetails = {
                    id: comp.id,
                    name: comp.name,
                    typeId: comp.typeId,
                    order: comp.order,
                    selectOptions: comp.selectOptions,
                }
                switch (comp.typeId) {
                    case 1:
                        componentDetails.value = 5;
                        break;
                    case 2:
                        componentDetails.value = "";
                        break;
                    case 3:
                        componentDetails.values = [];
                        break;
                }
                return componentDetails;
            });
            this.calendarSelection = new Date(date);
            this.dateLogStore.components.sort((a,b) => a.order - b.order);
        },
        setExistingDateLogFields(dateLogId, date, foodItems, components) {
            this.dateLogStore.dateLogId = dateLogId;
            this.dateLogStore.date = date;
            this.dateLogStore.foodItems = foodItems;
            this.dateLogStore.components = components;
            this.dateLogStore.components.sort((a,b) => a.order - b.order);
            this.calendarSelection = new Date(date);
        },
        saveOrEdit() {
            if (this.logEditMode) {
                this.addFood();
                if (this.dateLogStore.dateLogId != "") {
                    this.updateDateLog();
                } else {
                    this.createDateLog();
                }
            }
            this.logEditMode = !this.logEditMode;
        },
        async goToNextDay() {
            const nextDay = addDays(this.selectedDate, 1);
            const timeApart = this.differenceFromToday(nextDay);
            console.log(timeApart);
            await this.retrieveDateLog(format(nextDay, 'MM/dd/yyyy'))
                .then(() => {
                    this.setDateString(timeApart);
                });
            
        },
        async goToPreviousDay() {
            const previousDay = subDays(this.selectedDate, 1);
            const timeApart = this.differenceFromToday(previousDay);
            console.log(timeApart);
            await this.retrieveDateLog(format(previousDay, 'MM/dd/yyyy'))
                .then(() => {
                    this.setDateString(timeApart);
                });
        },
        differenceFromToday(targetDate) {
            console.log(targetDate);
            return intervalToDuration({
                start: targetDate,
                end: this.currentDate
            });
        },
        setDateString(timeApart) {
            if (timeApart.months == 0 && timeApart.years == 0) {
                if (timeApart.days == 1 && isBefore(this.currentDate, this.selectedDate)) {
                    this.dayTitle = "Tomorrow";
                } else if (timeApart.days == 0) {
                    this.dayTitle = "Today";
                } else if (timeApart.days == 1 && isBefore(this.selectedDate, this.currentDate)) {
                    this.dayTitle = "Yesterday";
                } else {
                    this.dayTitle = this.selectedDate.getMonth() + 1 + "/" + this.selectedDate.getDate() + "/" + this.selectedDate.getFullYear();
                }
            } else {
                this.dayTitle = this.selectedDate.getMonth() + 1 + "/" + this.selectedDate.getDate() + "/" + this.selectedDate.getFullYear();
            }
        },
        async chooseDate() {
            const timeApart = this.differenceFromToday(this.calendarSelection);
            await this.retrieveDateLog(format(this.calendarSelection, 'MM/dd/yyyy'))
                .then(() => {
                    this.setDateString(timeApart);
                });
        },
        isEmpty(str) {
            return (!str || str.length === 0 );
        }

    }
}
</script>

<style scoped>
    a.nav-link:link
    {
    color: #000000;
    text-decoration: none;
    }
    a.nav-link:visited
    {
    color: #000000;
    text-decoration: none;
    }
    a.nav-link:hover
    {
    color: #000000;
    text-decoration: none;
    }
    a.nav-link:active
    {
    color: #000000;
    text-decoration: none;
    }
</style>