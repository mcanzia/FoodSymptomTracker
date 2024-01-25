<template>
    <div class="container">
        <div class="chart-header">
            <div class="date-picker-container">
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
            <button id="open-chart-builder-button" v-if="!chartBuilderActive" @click="openChartBuilder()">Add Chart</button>
        </div>
        <ChartGrid />
    </div>
</template>

<script setup>
import router from "../router/index";
import { useChartStore } from '../stores/chartStore';
import ChartGrid from './ChartGrid.vue';
import { Chart } from '../models/Chart';
import { ChartOptions } from '../models/ChartOptions';
import DropDown from "./DropDown.vue";
import AirDateRange from "./AirDateRange.vue";
import ChartShape from "../models/ChartShape";
import { onBeforeMount, ref, computed } from 'vue';

const chartStore = useChartStore();

const chartBuilderActive = ref(false);
const datePickerActive = ref(false);

onBeforeMount(async() => {
    // chartStore.initializeChartShapeParams();
    await chartStore.initializeCharts();
    chartBuilderActive.value = false;
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

let maxStartDate = computed(() => {
    return endDate !== "" || endDate !== undefined ? new Date(endDate) : new Date('2970-01-01T00:00:00'); 
});

let minEndDate = computed(() => {
    return startDate !== "" || startDate !== undefined ? new Date(startDate) : new Date('1970-01-01T00:00:00');
});

async function openChartBuilder() {
    createTempChart();
    if (isMobile()) {
        await router.push({ name: 'chart-builder-mobile'});
    } else {
        await router.push({ name: 'chart-builder'});
    }
}

function createTempChart() {
    const id = "chart_" + (chartStore.charts.length + 1);
    const defaultTitle = "New Chart - " + (chartStore.charts.length + 1);
    chartStore.newChartDetails = new Chart(id, defaultTitle, null, ChartShape.BAR, null, new ChartOptions(defaultTitle), null, null, "", "");
}

function toggleDatePicker() {
    if (chartStore.dateRange.length !== 1) {
        datePickerActive.value = !datePickerActive.value;
    }
}

async function clearDateSelection() {
    chartStore.dateRange = [];
    datePickerActive.value = false;
    await chartStore.recalculateCharts();
}


async function setDateRange(selectedDateRange) {
    chartStore.dateRange = selectedDateRange;
    if (selectedDateRange.length === 2) {
        datePickerActive.value = false;
        await chartStore.recalculateCharts();
    }
}

function isMobile() {
  return screen.width <= 770 ? true : false;
}

</script>


<style scoped>
.container {
    height: 100%;
}
.chart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 20px;
}

#open-chart-builder-button {
    padding: 8px 30px;
    font-size: 16px;
    font-family: Lato, sans-serif;
    border-radius: 10px;
    margin-left: 10px;
    height: 20%;
    background-color: #846F91;
    color: white;
    border: #846F91 2px solid;
    cursor: pointer;
}

#open-chart-builder-button button:hover {
    background-color: #423748;
    border: #423748 2px solid;
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


</style>