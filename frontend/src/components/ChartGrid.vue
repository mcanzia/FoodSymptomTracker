<template>
  <div class="chart-grid-container">
        <div class="type-layer" v-for="(shapeParam) in chartStore.chartShapeParams" :key="shapeParam.name">
          <div class="type-label-dropdown" @click="shapeParam.isOpen = !shapeParam.isOpen">
            <h3>{{ shapeParam.name.toLocaleUpperCase() }}</h3>
            <span class="toggle-icon">
              <ion-icon name="caret-down-outline" v-if="shapeParam.isOpen"></ion-icon>
              <ion-icon name="caret-forward-outline" v-else></ion-icon>
            </span>
          </div>
          <div class="chart-container" v-if="shapeParam.isOpen">
            <div class="chart-slot" 
              v-for="(chart) in chartsByType(shapeParam.name)" 
              :key="chart.id"
              :style="{ 'max-height': maxHeight(chart.chartType), 'max-width': maxWidth(chart.chartType)}">
                  <span class="edit-icon">
                      <ion-icon name="pencil" class="bi" @click="editChart(chart)" />
                  </span>
                  <span class="trash-icon">
                      <ion-icon name="trash-outline" class="bi" @click="deleteChart(chart)" />
                  </span>
                <Chart :chart-details="chart" />
            </div>
          </div>
        </div>
    </div>
  </template>
  
<script setup>
import { ref, computed, onBeforeMount } from 'vue';
import { useChartStore } from '../stores/chartStore';
import router from "../router/index";
import Chart from './Chart.vue';

const chartStore = useChartStore();

let charts = computed(() => chartStore.charts);

function editChart(chart) {
    chartStore.newChartDetails = chart;
    router.push({ name: 'chart-builder'});
}

function deleteChart(chart) {
  const chartsToDelete = [chart];
  chartStore.deleteCharts(chartsToDelete);
}

function maxHeight(chartType) {
  return chartStore.chartShapeParams.find(chartShape => chartShape.name === chartType).maxHeight;
}

function maxWidth(chartType) {
  return chartStore.chartShapeParams.find(chartShape => chartShape.name === chartType).maxWidth;
}

function chartsByType(chartType) {
  return chartStore.charts.filter(chart => chart.chartType === chartType);
}

</script>

<style>

.chart-grid-container {
  margin-top: 10px;
  margin-bottom: 10px;
  overflow-y: scroll;
  max-height: 80%;
}

.type-layer {
  font-family: Lato, sans-serif;
}

.type-label-dropdown {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background: #143542;
  color: white;
  border-radius: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  cursor: pointer;
}

.type-label-dropdown > * {
  margin-left: 10px;
}

.type-label-dropdown > span {
  margin-left: 5px;
}

.chart-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  gap: 1rem;
}
.chart-slot {
  position: relative;
  flex-basis: calc(100% / 3);
  background-color: white;
  border-radius: 10px;
  padding: 10px;
  border: 2px solid #846F91;
  /* margin-top: 10px; */
}

.chart-slot:hover {
  background-color: whitesmoke;
}

.chart-slot > span {
  opacity: 0;
}

.edit-icon {
  position: absolute;
  top: 0;
  right: 0;
  padding: 5px;
} 

.chart-slot:hover .edit-icon {
  opacity: 1;
}

.chart-slot:hover .trash-icon {
  opacity: 1;
}

</style>
  