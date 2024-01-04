<template>
    <div class="form-container">
        <div class="form-column">
            <div class="form-column-item date-picker-container">
                <button id="chart-date-picker" @click="toggleDatePicker()">
                    <ion-icon name="calendar-outline"></ion-icon>
                    <span>{{ dateString }}</span>
                </button>
                <button id="clear-date-selection" v-if="datePickerActive" @click="clearDateSelection()">
                    <ion-icon name="close"></ion-icon>
                </button>
                <DropDown class="date-dropdown" v-if="datePickerActive" role="dialog" aria-modal="true">
                    <template v-slot:body>
                        <air-date-range @date-input="setDateRange"></air-date-range>
                    </template>
                </DropDown>
            </div>
            <div class="form-column-item">
                <label for="new-chart-title">Chart Title:</label>
                <input class="add-chart-input" id="new-chart-title" v-model="chartStore.newChartDetails.chartTitle" @blur="updateTempChartTitle">
            </div>
            <div class="form-column-item">
                <label for="new-chart-type">Chart Type:</label>
                <select class="add-chart-dropdown" id="new-chart-type" v-model="chartStore.newChartDetails.chartType" @change="updateTempChartTitle">
                    <option v-for="option in typeSelectOptions" :key="option" :value="option">
                        {{ option }}
                    </option>    
                </select>
            </div>
            <div class="form-column-item">
                <label for="new-chart-component">Chart Component:</label>
                <select class="add-chart-dropdown" id="new-chart-component" v-model="chartStore.newChartDetails.selectedComponent" @change="updateTempChartComponent">
                    <option v-for="option in componentStore.selectedComponents" :key="option.id" :value="option">
                        {{ option.name }}
                    </option> 
                </select>
            </div>
            <div class="form-column-item">
                <label for="new-chart-food-select">Target Food:</label>
                <select class="add-chart-dropdown" id="new-chart-food-select" v-model="chartStore.newChartDetails.selectedFood" @change="updateTempChartComponent">
                    <option v-for="option in foodStore.foods" :key="option.id" :value="option">
                        {{ option.name }}
                    </option>
                </select>
            </div>
        </div>
        <ChartComponent :chart-details="chartStore.newChartDetails" />
        <FloatingButton saveType="Chart" :editMode="chartBuilderActive" @saveOrEdit="saveChart()" @closeEditMode="closeChartBuilder()"/>                        
    </div>
</template>

<script setup>
import router from "../router/index";
import { useComponentStore } from '../stores/componentStore';
import { useFoodStore } from '../stores/foodStore';
import { useChartStore } from '../stores/chartStore';
import { useUserStore } from '../stores/userStore';
import FloatingButton from './FloatingButton.vue';
import ChartComponent from './Chart.vue';
import DropDown from "./DropDown.vue";
import AirDateRange from "./AirDateRange.vue";
import { Chart } from '../models/Chart';
import { ChartOptions } from '../models/ChartOptions';
import { onBeforeMount, computed, ref } from 'vue';

const componentStore = useComponentStore();
const foodStore = useFoodStore();
const chartStore = useChartStore();
const userStore = useUserStore();

let userAccessToken = null;
const chartBuilderActive = ref(true);
const datePickerActive = ref(false);
const typeSelectOptions = ['bar', 'line', 'pie', 'doughnut', 'radar'];

onBeforeMount(async() => {
    console.log(chartStore.newChartDetails);
    userAccessToken = await userStore.getAccessToken();
    await componentStore.initializeComponentLists(userAccessToken);
    await foodStore.initializeFoodList(userAccessToken);
});

let maxStartDate = computed(() => {
    return endDate !== "" || endDate !== undefined ? new Date(endDate) : new Date('2970-01-01T00:00:00'); 
});

let minEndDate = computed(() => {
    return startDate !== "" || startDate !== undefined ? new Date(startDate) : new Date('1970-01-01T00:00:00');
});

let dateString = computed(() => {
    if (chartStore.dateRange.length === 0) {
        return "All Time";
    }

    const startDate = new Date(chartStore.dateRange[0]).toLocaleDateString();

    if (chartStore.dateRange.length === 1) {
        return `${startDate} - `;
    }

    const endDate = new Date(chartStore.dateRange[1]).toLocaleDateString();

    return `${startDate} - ${endDate}`;

});

let chartStoreLastIndex = computed(() => {
    return chartStore.charts.length - 1;
});

function updateTempChartTitle() {
    chartStore.newChartDetails.chartOptions = new ChartOptions(chartStore.newChartDetails.chartTitle);
    chartStore.newChartDetails.chartOptions.scales = chartStore.newChartDetails.chartOptions ? {} : null;
}

async function updateTempChartComponent() {
    if (chartStore.newChartDetails.selectedComponent === null) {
        return;
    }
    switch (chartStore.newChartDetails.selectedComponent.typeId) {
        case 1: {
            if (chartStore.newChartDetails.selectedFood === null) {
                await chartStore.createAverageChart(userAccessToken, chartStore.newChartDetails);
            } else {
                await chartStore.createFoodValueChart(userAccessToken, chartStore.newChartDetails);
            }
            break;
        }
        case 2: {
            await chartStore.createSingleValueComponentWeightByFoodChart(userAccessToken, chartStore.newChartDetails);
            break;
        }
        case 3: {
            await chartStore.createMultiValueComponentWeightByFoodChart(userAccessToken, chartStore.newChartDetails);
            break;
        }
        default: {
            break;
        }
    }
    chartStore.newChartDetails.chartOptions.scales = chartStore.newChartDetails.chartOptions ? {} : null;
}

async function resetChartForm() {
    await chartStore.resetNewChartDetails();
    updateTempChartDetails();
}

async function saveChart() {
    await chartStore.addCharts(userAccessToken);
    this.closeChartBuilder();
}

async function closeChartBuilder() {
    // resetNewChart();
    await router.push({ name: 'summary'});
}

function resetNewChart() {
    const id = "chart_" + (chartStore.charts.length + 1);
    const defaultTitle = "New Chart - " + (chartStore.charts.length + 1);
    chartStore.newChartDetails = new Chart(id, defaultTitle, "bar", null, new ChartOptions(defaultTitle), null, null, "", "");
}

function toggleDatePicker() {
    if (chartStore.dateRange.length !== 1) {
        datePickerActive.value = !datePickerActive.value;
    }
}

function clearDateSelection() {
    chartStore.dateRange = [];
    datePickerActive.value = false;
}


function setDateRange(selectedDateRange) {
    chartStore.dateRange = selectedDateRange;
    if (selectedDateRange.length === 2) {
        datePickerActive.value = false;
    }
}

</script>

<style scoped>

.date-picker-container {
    position: relative;
    display: flex;
}

#clear-date-selection {
    margin-left: 5px;
    background-color: #846F91;
    color: white;
}

#chart-date-picker {
    display: flex;
}

#chart-date-picker ion-icon{
    align-content: baseline;
    padding-top: 2px;
}

#chart-date-picker span {
    margin-left: 5px;
    padding-bottom: 2px;
}

.date-dropdown {
    position: absolute;
    top: 100%;
    left: 3%;
    animation: fade 0.3s linear forwards;
    z-index: 100;
  }

.form-container {
  display: flex;
  gap: 20px;
}

.form-column-item:not(:first-child) {
  display: flex;
  flex-direction: column;
}

.form-column-item {
    padding: 10px;
}

.form-column-item label {
    font-size: 15px;
    color: black;
    font-family: Lato, sans-serif;
    margin-bottom: 5px;
}

.add-chart-input, .add-chart-dropdown {
  flex-grow: 1;
  padding: 8px 16px;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 16px;
  background-color: #fff;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.add-chart-input:focus, .add-chart-dropdown:focus {
  outline: none;
  box-shadow: 0 0 3px rgba(0, 184, 255, 0.3);
}

button {
  padding: 8px 16px;
  font-size: 16px;
  font-family: Lato, sans-serif;
  color: #000000;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}
</style>