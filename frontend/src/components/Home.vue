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
                            <a href="javascript:void(0);" @click="$bvModal.show('date-select-modal')" class="nav-link"><h3>{{dateLogStore.dayTitle}}</h3></a>
                            
                            <b-button @click="saveOrEdit()">{{ logEditMode ? "Save" : "Edit"}}</b-button>
                        </b-col>
                        <b-col cols="4">
                            <a href="javascript:void(0);" v-if="!logEditMode" @click="goToNextDay()" class="nav-link mr-5"><b-icon icon="caret-right-fill" scale="1.5"></b-icon></a>
                        </b-col>
                    </b-row>
                    <br />
                    <FoodLogEdit v-if="logEditMode"/>
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
        this.userAccessToken = await this.userStore.getAccessToken();
        await this.componentStore.initializeComponentLists(this.userAccessToken);
        await this.dateLogStore.initializeStore(this.userAccessToken, this.currentDateString, this.componentStore.selectedComponents);
        await this.foodStore.initializeFoodList(this.userAccessToken);
        //this.testEndpoints()
    },
    components: {
        FoodLogEdit,
        FoodLogBase
    },
    data() {
        return {
            auth,
            db,
            userAccessToken: null,
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
            return new Date().toLocaleDateString();
        },
        currentDate() {
            return new Date();
        }
    },
    methods: {
        async saveOrEdit() {
            if (this.logEditMode) {
                await this.foodStore.addFoods(this.userAccessToken, this.dateLogStore.selectedDateLog.foodItems);
                this.dateLogStore.selectedDateLog.foodItems = this.dateLogStore.selectedDateLog.foodItems.map(food => {
                    return this.foodStore.getExistingFood(food.name);
                });
                this.dateLogStore.addDateLogs(this.userAccessToken, new Array(this.dateLogStore.selectedDateLog));
            }
            this.logEditMode = !this.logEditMode;
        },
        async goToNextDay() {
            const nextDay = new Date(this.dateLogStore.selectedDateLog.date);
            nextDay.setDate(nextDay.getDate() + 1);
            this.dateLogStore.selectDay(nextDay.toLocaleDateString('en-us', {timeZone: 'UTC'}));
        },
        async goToPreviousDay() {
            const previousDay = new Date(this.dateLogStore.selectedDateLog.date);
            previousDay.setDate(previousDay.getDate() - 1);
            this.dateLogStore.selectDay(previousDay.toLocaleDateString('en-us', {timeZone: 'UTC'}));
        },
        async chooseDate() {
            this.dateLogStore.selectDay(this.calendarSelection.toLocaleDateString('en-us', {timeZone: 'UTC'}));
        },
        testEndpoints() {
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