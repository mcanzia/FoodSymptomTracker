<template>
  <div class="chart-grid-container">
        <div class="type-layer" v-for="(shapeParam) in chartStore.chartShapeParams" :key="shapeParam.name">
          <div class="type-label-dropdown" @click="shapeParam.isOpen = !shapeParam.isOpen" ref="typeLayerRef">
            <h3>{{ shapeParam.name.toLocaleUpperCase() }}</h3>
            <span class="toggle-icon">
              <ion-icon name="caret-down-outline" v-if="shapeParam.isOpen"></ion-icon>
              <ion-icon name="caret-forward-outline" v-else></ion-icon>
            </span>
          </div>
          <div class="chart-container" v-if="shapeParam.isOpen">
            <div class="chart-slot" 
              v-for="(chart) in chartsByShape(shapeParam.name)" 
              :key="chart.id"
              :style="{ 'max-height': maxHeight(chart.chartShape), 'max-width': maxWidth(chart.chartShape)}">
                  <span class="edit-icon">
                      <ion-icon name="pencil" class="bi" @click="editChart(chart)" />
                  </span>
                  <span class="trash-icon">
                      <ion-icon name="trash-outline" class="bi" @click="toggleConfirmDelete(chart)" />
                  </span>
                <Chart :chart-details="chart" />
            </div>
          </div>
        </div>
        <ConfirmDelete v-if="confirmModalActive" @confirm="confirmDelete" />
    </div>
  </template>
  
<script setup>
import { ref, computed, onMounted } from 'vue';
import { useChartStore } from '../stores/chartStore';
import router from "../router/index";
import Chart from './Chart.vue';
import ConfirmDelete from './ConfirmDelete.vue';

const chartStore = useChartStore();
const confirmModalActive = ref(false);
const componentToDelete = ref(null); 
const typeLayerRef = ref([]);

onMounted(() => {
    if (typeLayerRef.value) {
      const typeLayerWidth = typeLayerRef.value[0].offsetWidth;
      chartStore.initializeChartShapeParams(typeLayerWidth);
    }
    
});

let charts = computed(() => chartStore.charts);

function editChart(chart) {
    chartStore.newChartDetails = chart;
    router.push({ name: 'chart-builder-mobile'});
}

function deleteChart(chart) {
  const chartsToDelete = [chart];
  chartStore.deleteCharts(chartsToDelete);
}

function maxHeight(chartShape) {
  return chartStore.chartShapeParams.find(chartShapeCurrent => chartShapeCurrent.name === chartShape).maxHeight;
}

function maxWidth(chartShape) {
  return chartStore.chartShapeParams.find(chartShapeCurrent => chartShapeCurrent.name === chartShape).maxWidth;
}

function chartsByShape(chartShape) {
  return chartStore.charts.filter(chart => chart.chartShape === chartShape);
}

function toggleConfirmDelete(component) {
  confirmModalActive.value = true;
  componentToDelete.value = component;
}


async function confirmDelete(confirmation) {
  if (confirmation) {
    await deleteChart(componentToDelete.value);
  }
  confirmModalActive.value = false;
  componentToDelete.value = null;
}

</script>

<style>

.chart-grid-container {
  margin-top: 10px;
  margin-bottom: 10px;
  overflow-y: scroll;
  max-height: 85%;
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



</style>
  