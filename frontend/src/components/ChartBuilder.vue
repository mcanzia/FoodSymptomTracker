<template>
    <div class="form-container">
        <div class="form-column">
            <div class="form-column-item">
                <label for="new-chart-title">Chart Title:</label>
                <div class="form-input-container">
                    <input class="add-chart-input" id="new-chart-title" v-model="chartStore.newChartDetails.chartTitle" @blur="updateTempChartTitle">
                    <ion-icon name="close" @click="resetChartTitle()"></ion-icon>
                </div>
            </div>
            <div class="form-column-item">
                <label for="new-chart-type">Chart Shape:</label>
                <div class="form-input-container">
                    <select class="add-chart-dropdown" id="new-chart-type" v-model="chartStore.newChartDetails.chartShape" @change="updateTempChartTitle">
                        <option v-for="option in chartStore.chartShapeParams" :key="option" :value="option.name">
                            {{ option.name }}
                        </option>    
                    </select>
                    <ion-icon name="close" @click="resetChartType()"></ion-icon>
                </div>
            </div>
            <div class="form-column-item">
                <label for="new-chart-component">Chart Component:</label>
                <div class="form-input-container">
                    <select class="add-chart-dropdown" id="new-chart-component" v-model="chartStore.newChartDetails.selectedComponent" @change="updateTempChartComponent">
                        <option v-for="option in componentStore.selectedComponents" :key="option.id" :value="option">
                            {{ option.name }}
                        </option> 
                    </select>
                    <ion-icon name="close" @click="resetSelectedComponent()"></ion-icon>
                </div>
            </div>
            <div class="form-column-item">
                <label for="new-chart-food-select">Target Food:</label>
                <div class="form-input-container">
                    <select class="add-chart-dropdown" id="new-chart-food-select" v-model="chartStore.newChartDetails.selectedFood" @change="updateTempChartComponent">
                        <option v-for="option in foodStore.foods" :key="option.id" :value="option">
                            {{ option.name }}
                        </option>
                    </select>
                    <ion-icon name="close" @click="resetSelectedFood()"></ion-icon>
                </div>
            </div>
            <div class="form-column-item form-button-container">
                <button id="closeEditButton" @click="closeChartBuilder()">Close</button>
                <button id="saveEditButton" @click="saveChart()">Save</button>
            </div>
        </div>
        <ChartComponent :chart-details="chartStore.newChartDetails" />
    </div>
</template>

<script setup>
import router from "../router/index";
import { useComponentStore } from '../stores/componentStore';
import { useFoodStore } from '../stores/foodStore';
import { useChartStore } from '../stores/chartStore';
import ChartComponent from './Chart.vue';
import ChartShape from '../models/ChartShape';
import ChartType from '../models/ChartType';
import { Chart } from '../models/Chart';
import { ChartOptions } from '../models/ChartOptions';
import { onBeforeMount, computed, ref } from 'vue';

const componentStore = useComponentStore();
const foodStore = useFoodStore();
const chartStore = useChartStore();

const chartBuilderActive = ref(true);

onBeforeMount(async() => {
    await componentStore.initializeComponentLists();
    await foodStore.initializeFoodList();
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
                chartStore.newChartDetails.chartType = ChartType.AVERAGE;
                chartStore.newChartDetails = await chartStore.createAverageChart(chartStore.newChartDetails);
            } else {
                chartStore.newChartDetails.chartType = ChartType.FOODVALUE;
                chartStore.newChartDetails = await chartStore.createFoodValueChart(chartStore.newChartDetails);
            }
            break;
        }
        case 2: {
            chartStore.newChartDetails.chartType = ChartType.SVCWEIGHTBYFOOD;
            chartStore.newChartDetails = await chartStore.createSingleValueComponentWeightByFoodChart(chartStore.newChartDetails);
            break;
        }
        case 3: {
            chartStore.newChartDetails.chartType = ChartType.MVCWEIGHTBYFOOD;
            chartStore.newChartDetails = await chartStore.createMultiValueComponentWeightByFoodChart(chartStore.newChartDetails);
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
    await chartStore.addCharts();
    closeChartBuilder();
}

async function closeChartBuilder() {
    await router.push({ name: 'summary'});
}

function resetNewChart() {
    const id = "chart_" + (chartStore.charts.length + 1);
    const defaultTitle = "New Chart - " + (chartStore.charts.length + 1);
    chartStore.newChartDetails = new Chart(id, defaultTitle, null, ChartShape.BAR, null, new ChartOptions(defaultTitle), null, null, "", "");
}

function resetChartTitle() {
    chartStore.newChartDetails.chartTitle = '';
    updateTempChartTitle();
}

function resetChartType() {
    chartStore.newChartDetails.chartShape = ChartShape.BAR;
    updateTempChartComponent();
}

function resetSelectedComponent()  {
    chartStore.newChartDetails.selectedComponent = '';
    updateTempChartComponent();
}

function resetSelectedFood() {
    chartStore.newChartDetails.selectedFood = '';
    updateTempChartComponent();
}

</script>

<style scoped>

.form-container {
  display: flex;
  height: 100%;
  gap: 20px;
}

.form-container > :not(:last-child) {
    width: 33%;
}

.form-container > *:last-child {
    width: 67%;
}

.form-column {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-evenly;
    align-items: center;
    margin: 0 auto;
}

.form-column-item:not(:last-child) {
  display: flex;
  flex-direction: column;
}

.form-input-container{
    display: inline-flex;
    align-items: center;
    width: 100%;
}

.form-input-container ion-icon {
    opacity: 0;
    margin-left: 8px;
    cursor: pointer;
}
.form-input-container:hover ion-icon {
    opacity: 1;
    animation: fade-right 0.1s linear forwards;
}

.form-button-container {
    display: flex;
    gap: 10px;
}

.form-button-container > button {
    flex: 1;
}

.form-column-item {
    padding: 10px;
    width: 100%;
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
</style>