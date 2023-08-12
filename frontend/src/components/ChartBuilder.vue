<template>
    <div class="form-container">
        <div class="form-column">
            <div class="form-column-item">
                <h4>Chart Title: </h4>
                <input class="add-chart-input" id="new-chart-title" v-model="chartStore.newChartDetails.chartTitle" @blur="updateTempChartTitle">
            </div>
            <div class="form-column-item">
                <h4>Chart Type: </h4>
                <select class="add-chart-dropdown" id="new-chart-type" v-model="chartStore.newChartDetails.chartType" @change="updateTempChartTitle">
                    <option v-for="option in typeSelectOptions" :key="option" :value="option">
                        {{ option }}
                    </option>    
                </select>
            </div>
            <div class="form-column-item">
                <h4>Chart Component: </h4>
                <select class="add-chart-dropdown" id="new-chart-component" v-model="chartStore.newChartDetails.selectedComponent" @change="updateTempChartComponent">
                    <option v-for="option in componentStore.selectedComponents" :key="option.id" :value="option">
                        {{ option.name }}
                    </option> 
                </select>
            </div>
            <div class="form-column-item">
                <h4>Start Date: </h4>
                <input class="add-chart-input" id="new-chart-start-date" v-model="chartStore.newChartDetails.startDate" @input="updateTempChartComponent">
            </div>
            <div class="form-column-item">
                <h4>End Date: </h4>
                <input class="add-chart-input" id="new-chart-end-date" v-model="chartStore.newChartDetails.endDate" @input="updateTempChartComponent">
            </div>
            <div class="form-column-item">
                <h4>Target Food: </h4>
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
import { Chart } from '../models/Chart';
import { ChartOptions } from '../models/ChartOptions';
import { onBeforeMount, computed, ref } from 'vue';

const componentStore = useComponentStore();
const foodStore = useFoodStore();
const chartStore = useChartStore();
const userStore = useUserStore();

let userAccessToken = null;
let chartBuilderActive = ref(true);
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
    chartStore.addCharts(userAccessToken);
    resetNewChart();
    await router.push({ name: 'summary'});
}

async function closeChartBuilder() {
    resetNewChart();
    await router.push({ name: 'summary'});
}

function resetNewChart() {
    const id = "chart_" + (chartStore.charts.length + 1);
    const defaultTitle = "New Chart - " + (chartStore.charts.length + 1);
    chartStore.newChartDetails = new Chart(id, defaultTitle, "bar", null, new ChartOptions(defaultTitle), null, null, "", "");
}

</script>

<style scoped>
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
}

.form-container {
  display: flex;
  gap: 20px;
}

.form-column-item {
  display: flex;
  align-content: center;
  padding: 10px;
  gap: 10px;
}

.add-chart-input, .add-chart-dropdown {
  flex-grow: 1;
  padding: 8px 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  background-color: #fff;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.add-chart-input:focus, .add-chart-dropdown:focus {
  outline: none;
  border-color: #4AAE9B;
  box-shadow: 0 0 3px rgba(0, 184, 255, 0.3);
}

button {
  padding: 8px 16px;
  font-size: 16px;
  color: #fff;
  background-color: #4AAE9B;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #4AAE9B;
}
</style>