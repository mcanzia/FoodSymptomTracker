<template>
    <b-container fluid class="remove-all-margin-padding">
        <ChartGrid @add-new-chart="openBuildChartModal" :new-chart="newChart"/>
        <b-sidebar ref="chart-build-sidebar" id="chart-build-sidebar" v-model="sidebarVisible" :title="newChart.chartType" @shown="createTempChart" @hidden="removeTempChart" shadow right>
            <b-form class="form-style">
                <label for="chart-title">Chart Title</label>
                <b-form-input id="chart-title" v-model="newChart.chartOptions.plugins.title.text" @blur="updateTempChartTitle"></b-form-input>
                <br />
                <label for="chart-type-select">Chart Type</label>
                <b-form-select id="chart-type-select" v-model="newChart.chartType" @change="updateTempChartType">
                    <option v-for="option in typeSelectOptions" :key="option" :value="option">
                        {{ option }}
                    </option>
                </b-form-select>
                <br />
                <br />
                <label for="chart-component-select">Chart Component</label>
                <b-form-select id="chart-component-select" v-model="componentSelection" @change="updateTempChartComponent">
                    <option v-for="option in componentSelectOptions" :key="option.id" :value="option">
                        {{ option.name }}
                    </option>
                </b-form-select>
                <br />
                <br />
                <label for="chart-start-date-select">Start Date</label>
                <b-form-datepicker id="chart-start-date-select" v-model="newChart.chartData.startDate"></b-form-datepicker>
                <br />
                <label for="chart-end-date-select">End Date</label>
                <b-form-datepicker id="chart-end-date-select" v-model="newChart.chartData.endDate"></b-form-datepicker>
                <br />
                <label for="target-food-select">Target Food</label>
                <b-form-select id="target-food-select" v-model="foodSelection" @change="updateTempChartComponent">
                    <option v-for="option in foodStore.foods" :key="option.id" :value="option">
                        {{ option.name }}
                    </option>
                </b-form-select>
                <br />
                <br />
                <b-button type="submit" variant="primary">Save</b-button>
                <b-button type="reset" variant="danger" class="ml-2">Reset</b-button>
            </b-form>
        </b-sidebar>
    </b-container>
    
</template>

<script>
import { auth, db } from '../firebase';
import { useComponentStore } from '../stores/componentStore';
import { useFoodStore } from '../stores/foodStore';
import { useChartStore } from '../stores/chartStore';
import ChartGrid from './ChartGrid.vue';
import { bus } from '../main';
import { format} from 'date-fns';
export default {
    setup() {
        const componentStore = useComponentStore();
        const foodStore = useFoodStore();
        const chartStore = useChartStore();
        return {
            componentStore,
            foodStore,
            chartStore
        }
    },
    data() {
    
        return {
            auth,
            db,
            newChart: {
                chartType: "",
                chartData: {
                    labels: [],
                    datasets: [],
                    startDate: '',
                    endDate: '',
                },
                chartOptions: {
                    plugins: {
                        title: {
                            display: true,
                            text: ''
                        }
                    },
                },
                building: false,
            },
            dateLogs: [],
            componentSelectOptions: [],
            typeSelectOptions: [],
            componentSelection: null,
            foodSelection: null,
            sidebarVisible: false,
        }
    },
    components: {
        ChartGrid
    },
    created() {
        this.getComponentsFromDb();
        this.initializeFoodList();
        this.getAllDateLogs();
        this.initializeTypeOptions();
        console.log(this.auth.currentUser);
    },
    computed: {
        maxStartDate() {
            return this.endDate !== "" || this.endDate !== undefined ? new Date(this.endDate) : new Date('2970-01-01T00:00:00'); 
        },
        minEndDate() {
            return this.startDate !== "" || this.startDate !== undefined ? new Date(this.startDate) : new Date('1970-01-01T00:00:00');
        },
        chartStoreLastIndex() {
            return this.chartStore.charts.length - 1;
        }
    },
    methods: {
        openBuildChartModal : function(type) {
            switch(type) {
                case "bar":
                    this.newChart.chartType = "bar";
                    break;
                case "line":
                    this.newChart.chartType = "line";
                    break;
                case "pie":
                    this.newChart.chartType = "pie";
                    break;
                case "doughnut":
                    this.newChart.chartType = "doughnut";
                    break;
                case "radar":
                    this.newChart.chartType = "radar";
                    break;
                default:
                    this.newChart.chartType = "bar";
                    break;
            }
            //this.$refs["chart-build-modal"].show();
            this.sidebarVisible = !this.sidebarVisible; 
        },
        createTempChart() {
            const id = db.collection('users').doc(this.auth.currentUser.uid).collection('charts').doc().id;
            const chartData = {
                    labels: ["","",""],
                    datasets: [
                        {
                            label: "",
                            data: [5, 10, 15]
                        }
                    ],
                    startDate: '',
                    endDate: '',
                }
            const chartOptions = {
                    plugins: {
                        title: {
                            display: true,
                            text: ''
                        }
                    },
                    }
            this.chartStore.charts.push({
                id: id,
                chartType: this.newChart.chartType,
                chartData: chartData,
                chartOptions: chartOptions,
                building: true,
            });
        },
        updateTempChartType() {
            this.chartStore.charts[this.chartStoreLastIndex].chartType = this.newChart.chartType;
            this.notifyChartUpdates();
        }, 
        updateTempChartTitle() {
            this.chartStore.charts[this.chartStoreLastIndex].chartOptions.plugins.title.text = this.newChart.chartOptions.plugins.title.text;
            this.notifyChartUpdates();
        },
        updateTempChartComponent() {
            if (this.componentSelection === null) {
                return;
            }
            switch (this.componentSelection.typeId) {
                case 1: {
                    console.log("SCALE");
                    if (this.foodSelection === null) {
                        this.setAverageFoodValues();
                    } else {
                        this.setFoodValueOverTime();
                    }
                    break;
                }
                case 2: {
                    console.log("SINGLE");
                    if (this.foodSelection === null) {
                        this.setComponentOptionsWeightForAllFoods();
                    } else {
                        this.setComponentOptionsWeightForSpecificFood();
                    }
                    break;
                }
                case 3: {
                    console.log("MULTI");
                    if (this.foodSelection === null) {
                        this.setComponentOptionsWeightForAllFoodsMulti();
                    } else {
                        this.setComponentOptionsWeightForSpecificFoodMulti();
                    }
                    break;
                }
                default: {
                    break;
                }
            }
            //this.chartStore.charts[this.chartStoreLastIndex].chartData = this.newChart.chartData;   
            this.notifyChartUpdates();         
        },
        setAverageFoodValues() {
            const foodDataValues = [];
            this.setFreshChartData("Average Value");
            this.foodStore.foods.map(food => {
                const filteredDateLogs = this.dateLogs.filter(dateLog => { return dateLog.foods.get(food.id) != null; });
                var average = 0;
                filteredDateLogs.map(dateLog => {
                    average += Number(dateLog.components.get(this.componentSelection.id).value);
                });
                average = (average / filteredDateLogs.length).toFixed(2);
                
                foodDataValues.push({ 
                    name: food.name,
                    value: average
                });
            });
            foodDataValues.map(foodDataValue => {
                this.chartStore.charts[this.chartStoreLastIndex].chartData.labels.push(foodDataValue.name);
                this.chartStore.charts[this.chartStoreLastIndex].chartData.datasets[0].data.push(foodDataValue.value);
            });
        },
        setFoodValueOverTime() {
            const dateMonthFoodValueMap = new Map();
            this.setFreshChartData("Value over Time");
            // TODO - find way to sort by date
            this.dateLogs.sort((a,b) => b.date - a.date);
            this.dateLogs.map(dateLog => {
                if (dateLog.foods.has(this.foodSelection.id)) {
                    const dateMonth = format(new Date(dateLog.date), "MMM");
                    const dateYear = format(new Date(dateLog.date), "Y");
                    const monthYear = dateMonth + "-" + dateYear;
                    const componentWeight = dateLog.components.get(this.componentSelection.id).value;
                    if (!dateMonthFoodValueMap.has(monthYear)) {
                        var foodWeight = [componentWeight];
                        dateMonthFoodValueMap.set(monthYear, foodWeight);
                    } else {
                        dateMonthFoodValueMap.get(monthYear).push(componentWeight);
                    }
                }
            });
            for (const [key, value] of dateMonthFoodValueMap.entries()) {
                this.chartStore.charts[this.chartStoreLastIndex].chartData.labels.push(key);
                var average = 0;
                value.map(weightValue => {
                    average += Number(weightValue);
                });
                average = (average / value.length).toFixed(2);
                this.chartStore.charts[this.chartStoreLastIndex].chartData.datasets[0].data.push(average);
            }
        },
        setComponentOptionsWeightForAllFoods() {
            //TODO - make sure dateLogs is not empty
            var weightValueMap = new Map();
            this.componentSelection.selectOptions.map(selectOption => {
                weightValueMap.set(selectOption.value, 0);
            });
            this.setFreshChartData("Value Rankings for All Time");
            this.dateLogs.map(dateLog => {
                const componentValue = dateLog.components.get(this.componentSelection.id);
                if (weightValueMap.has(componentValue.value)) {
                    weightValueMap.set(componentValue.value, weightValueMap.get(componentValue.value) + 1);
                }
            });
            for (const [key, value] of weightValueMap.entries()) {
                this.chartStore.charts[this.chartStoreLastIndex].chartData.labels.push(key);
                this.chartStore.charts[this.chartStoreLastIndex].chartData.datasets[0].data.push(value);
            }

        },
        setComponentOptionsWeightForAllFoodsMulti() {
            var weightValueMap = new Map();
            this.componentSelection.selectOptions.map(selectOption => {
                weightValueMap.set(selectOption.value, 0);
            });
            this.setFreshChartData("Value Rankings for All Time");
            this.dateLogs.map(dateLog => {
                const componentValues = dateLog.components.get(this.componentSelection.id);
                componentValues.values.map(value => {
                    if (weightValueMap.has(value)) {
                        weightValueMap.set(value, weightValueMap.get(value) + 1);
                    }
                });   
            });
            for (const [key, value] of weightValueMap.entries()) {
                this.chartStore.charts[this.chartStoreLastIndex].chartData.labels.push(key);
                this.chartStore.charts[this.chartStoreLastIndex].chartData.datasets[0].data.push(value);
            }
        },
        setComponentOptionsWeightForSpecificFood() {
            //TODO - make sure dateLogs is not empty
            var weightValueMap = new Map();
            this.componentSelection.selectOptions.map(selectOption => {
                weightValueMap.set(selectOption.value, 0);
            });
            this.setFreshChartData("Value Rankings for All Time");
            this.dateLogs.filter(dateLog => dateLog.foods.has(this.foodSelection.id)).map(dateLog => {
                const componentValue = dateLog.components.get(this.componentSelection.id);
                if (weightValueMap.has(componentValue.value)) {
                    weightValueMap.set(componentValue.value, weightValueMap.get(componentValue.value) + 1);
                }
            });
            for (const [key, value] of weightValueMap.entries()) {
                this.chartStore.charts[this.chartStoreLastIndex].chartData.labels.push(key);
                this.chartStore.charts[this.chartStoreLastIndex].chartData.datasets[0].data.push(value);
            }

        },
        setComponentOptionsWeightForSpecificFoodMulti() {
            var weightValueMap = new Map();
            this.componentSelection.selectOptions.map(selectOption => {
                weightValueMap.set(selectOption.value, 0);
            });
            this.setFreshChartData("Value Rankings for All Time");
            this.dateLogs.filter(dateLog => dateLog.foods.has(this.foodSelection.id)).map(dateLog => {
                const componentValues = dateLog.components.get(this.componentSelection.id);
                componentValues.values.map(value => {
                    if (weightValueMap.has(value)) {
                        weightValueMap.set(value, weightValueMap.get(value) + 1);
                    }
                });   
            });
            for (const [key, value] of weightValueMap.entries()) {
                this.chartStore.charts[this.chartStoreLastIndex].chartData.labels.push(key);
                this.chartStore.charts[this.chartStoreLastIndex].chartData.datasets[0].data.push(value);
            }
        },
        setFreshChartData(dataLabel) {
            this.chartStore.charts[this.chartStoreLastIndex].chartData.labels = [];
            this.chartStore.charts[this.chartStoreLastIndex].chartData.datasets = [];
            this.chartStore.charts[this.chartStoreLastIndex].chartData.datasets.push({
                label: dataLabel,
                data: []
            });
        },
        removeTempChart() {
            this.chartStore.charts.pop();
            this.newChart = {
                type: "",
                chartData: {
                    labels: [],
                    datasets: [],
                    startDate: '',
                    endDate: '',
                },
                chartOptions: {
                    plugins: {
                        title: {
                            display: true,
                            text: ''
                        }
                    },
                },
                building: false,
                
            }
            this.componentSelection = null;
            this.foodSelection = null;
        },
        notifyChartUpdates() {
            bus.$emit('chart-update', {
                chart: this.chartStore.charts[this.chartStoreLastIndex]
            });
        },
        async getComponentsFromDb() {
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
                            this.componentSelectOptions = this.componentStore.selectedComponents;
                            
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
                        });
            } catch (e) {
                console.log(e);
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
        async getAllDateLogs() {
            try {
                await db.collection('users')
                        .doc(this.auth.currentUser.uid)
                        .collection('dateLogs')
                        .get()
                        .then(snapshot => {
                            if (snapshot.empty) {
                                return;
                            }
                            this.dateLogs = snapshot.docs.map(dateLog => {
                                const foodMap = new Map();
                                dateLog.data().foodItems.map(foodItem => {
                                    foodMap.set(foodItem.id, foodItem.name);
                                })
                                const componentValueMap = new Map();
                                dateLog.data().components.map(component => {
                                    componentValueMap.set(component.id, component);
                                })
                                
                                const dateLogData = {
                                    id: dateLog.id,
                                    date: dateLog.data().date,
                                    foods: foodMap,
                                    components: componentValueMap
                                }
                                return dateLogData;
                            });
                        })
            } catch (error) {
                console.log(error);
            }
        },
        initializeTypeOptions() {
            this.typeSelectOptions = ['bar', 'line', 'pie', 'doughnut', 'radar'];
        }
    }
}
</script>

<style scoped>
.remove-all-margin-padding{
    margin:0 !important;
    padding:0 !important;
}
.form-style {
    padding: 10px !important;
}
</style>