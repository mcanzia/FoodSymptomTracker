<template>
    <b-container fluid class="remove-all-margin-padding">
        <ChartGrid @add-new-chart="openBuildChartModal" />
        <b-sidebar ref="chart-build-sidebar" id="chart-build-sidebar" v-model="sidebarVisible" :title="chartStore.newChartDetails.chartType" @shown="createTempChart" @hidden="closeChartPanel" shadow :right="chartPanelDirectionRight">
            <b-form class="form-style">
                <label for="chart-title">Chart Title</label>
                <b-form-input id="chart-title" v-model="chartStore.newChartDetails.chartTitle" @blur="updateTempChartTitle"></b-form-input>
                <br />
                <label for="chart-type-select">Chart Type</label>
                <b-form-select id="chart-type-select" v-model="chartStore.newChartDetails.chartType" @change="updateTempChartDetails">
                    <option v-for="option in typeSelectOptions" :key="option" :value="option">
                        {{ option }}
                    </option>
                </b-form-select>
                <br />
                <br />
                <label for="chart-component-select">Chart Component</label>
                <b-form-select id="chart-component-select" v-model="chartStore.newChartDetails.selectedComponent" @change="updateTempChartComponent">
                    <option v-for="option in componentStore.selectedComponents" :key="option.id" :value="option">
                        {{ option.name }}
                    </option>
                </b-form-select>
                <br />
                <br />
                <label for="chart-start-date-select">Start Date</label>
                <b-form-datepicker id="chart-start-date-select" v-model="chartStore.newChartDetails.startDate" @input="updateTempChartComponent"></b-form-datepicker>
                <br />
                <label for="chart-end-date-select">End Date</label>
                <b-form-datepicker id="chart-end-date-select" v-model="chartStore.newChartDetails.endDate" @input="updateTempChartComponent"></b-form-datepicker>
                <br />
                <label for="target-food-select">Target Food</label>
                <b-form-select id="target-food-select" v-model="chartStore.newChartDetails.selectedFood" @change="updateTempChartComponent">
                    <option v-for="option in foodStore.foods" :key="option.id" :value="option">
                        {{ option.name }}
                    </option>
                </b-form-select>
                <br />
                <br />
                <b-button type="submit" variant="primary" @click="saveChart()">Save</b-button>
                <b-button variant="danger" class="ml-2" @click="resetChartForm()">Reset</b-button>
            </b-form>
        </b-sidebar>
    </b-container>
    
</template>

<script>
import { auth, db } from '../firebase';
import { useComponentStore } from '../stores/componentStore';
import { useFoodStore } from '../stores/foodStore';
import { useChartStore } from '../stores/chartStore';
import { useUserStore } from '../stores/userStore';
import ChartGrid from './ChartGrid.vue';
import { Chart } from '../models/Chart';
import { ChartOptions } from '../models/ChartOptions';
export default {
    setup() {
        const componentStore = useComponentStore();
        const foodStore = useFoodStore();
        const chartStore = useChartStore();
        const userStore = useUserStore();
        return {
            componentStore,
            foodStore,
            chartStore,
            userStore
        }
    },
    data() {
    
        return {
            auth,
            db,
            dateLogs: [],
            typeSelectOptions: ['bar', 'line', 'pie', 'doughnut', 'radar'],
            sidebarVisible: false,
            chartPanelDirectionRight: false,
        }
    },
    components: {
        ChartGrid
    },
    async created() {
        this.userAccessToken = await this.userStore.getAccessToken();
        await this.chartStore.initializeCharts(this.userAccessToken);
        await this.componentStore.initializeComponentLists(this.userAccessToken);
        await this.foodStore.initializeFoodList(this.userAccessToken);
        (this.chartStore.charts.length + 1) % 3 === 0 ? this.chartPanelDirectionRight = false : this.chartPanelDirectionRight = true;
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
                    this.chartStore.newChartDetails.chartType = "bar";
                    break;
                case "line":
                    this.chartStore.newChartDetails.chartType = "line";
                    break;
                case "pie":
                    this.chartStore.newChartDetails.chartType = "pie";
                    break;
                case "doughnut":
                    this.chartStore.newChartDetails.chartType = "doughnut";
                    break;
                case "radar":
                    this.chartStore.newChartDetails.chartType = "radar";
                    break;
                default:
                    this.chartStore.newChartDetails.chartType = "bar";
                    break;
            }
            this.sidebarVisible = !this.sidebarVisible;
            this.chartStore.chartPanelOpen = true;
        },
        createTempChart() {
            const id = db.collection('users').doc(this.auth.currentUser.uid).collection('charts').doc().id;
            const defaultTitle = "New Chart - " + (this.chartStore.charts.length + 1);
            this.chartStore.newChartDetails = new Chart(id, defaultTitle, this.chartStore.newChartDetails.chartType, null, new ChartOptions(defaultTitle), null, null, "", "");
            this.chartStore.charts.push(this.chartStore.newChartDetails);
        },
        removeTempChart() {
            this.chartStore.charts.pop();
            this.chartStore.newChartDetails = new Chart(null, "", "", null, null, null, null, "", "");
        },
        closeChartPanel() {
            this.removeTempChart();
            this.chartStore.chartPanelOpen = false;
        },
        updateTempChartTitle() {
            this.chartStore.charts[this.chartStoreLastIndex] = this.chartStore.newChartDetails;
            this.chartStore.charts[this.chartStoreLastIndex].chartOptions = new ChartOptions(this.chartStore.newChartDetails.chartTitle);
            this.chartStore.charts = this.chartStore.charts.filter(chart => chart);
        },
        updateTempChartDetails() {
            this.chartStore.charts[this.chartStoreLastIndex] = this.chartStore.newChartDetails;
            this.chartStore.charts = this.chartStore.charts.filter(chart => chart);
        },
        async updateTempChartComponent() {
            if (this.chartStore.newChartDetails.selectedComponent === null) {
                return;
            }
            switch (this.chartStore.newChartDetails.selectedComponent.typeId) {
                case 1: {
                    console.log("SCALE");
                    if (this.chartStore.newChartDetails.selectedFood === null) {
                        await this.chartStore.createAverageChart(this.userAccessToken, this.chartStore.newChartDetails);
                    } else {
                        await this.chartStore.createFoodValueChart(this.userAccessToken, this.chartStore.newChartDetails);
                    }
                    break;
                }
                case 2: {
                    console.log("SINGLE");
                    await this.chartStore.createSingleValueComponentWeightByFoodChart(this.userAccessToken, this.chartStore.newChartDetails);
                    break;
                }
                case 3: {
                    console.log("MULTI");
                    await this.chartStore.createMultiValueComponentWeightByFoodChart(this.userAccessToken, this.chartStore.newChartDetails);
                    break;
                }
                default: {
                    break;
                }
            }
            this.chartStore.charts[this.chartStoreLastIndex] = this.chartStore.newChartDetails;
            this.chartStore.charts = this.chartStore.charts.filter(chart => chart);
        },
        async saveChart() {
            await this.chartStore.addCharts(this.userAccessToken);
            (this.chartStore.charts.length + 1) % 3 === 0 ? this.chartPanelDirectionRight = false : this.chartPanelDirectionRight = true;
        },
        async resetChartForm() {
            await this.chartStore.resetNewChartDetails();
            this.updateTempChartDetails();
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