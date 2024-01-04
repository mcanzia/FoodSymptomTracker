<template>
    <div class="remove-all-margin-padding chart-container d-flex">
      <div class="chart-slot" v-for="(chart) in charts" :key="chart.id">
            <span class="change-icon">
                <ion-icon name="pencil" class="bi" @click="editChart(chart)" />
            </span>
            <span class="trash-icon">
                <ion-icon name="trash-outline" class="bi" @click="deleteChart(chart)" />
            </span>
          <Chart :chart-details="chart" />
      </div>
    </div>
  </template>
  
<script setup>
import { ref, computed, onBeforeMount } from 'vue';
import { useChartStore } from '../stores/chartStore';
import { useUserStore } from '../stores/userStore';
import router from "../router/index";
import Chart from './Chart.vue';

const userStore = useUserStore();
let userAccessToken = null;
const chartStore = useChartStore();
let charts = computed(() => chartStore.charts);

onBeforeMount(async() => {
    userAccessToken = await userStore.getAccessToken();
});

function editChart(chart) {
    chartStore.newChartDetails = chart;
    router.push({ name: 'chart-builder'});
}

function deleteChart(chart) {
  const chartsToDelete = [chart];
  chartStore.deleteCharts(userAccessToken, chartsToDelete);
}

</script>

<style>
.remove-all-margin-padding{
  margin:0 !important;
  padding:0 !important;
}
.chart-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
.chart-slot {
  position: relative;
  flex-basis: calc(100% / 3);
  background-color: white;
  border-radius: 10px;
  padding: 10px;
  /* border: 1px solid gray;
  border-top: 0px; */
  max-height: 400px;
  max-width: 400px;
  margin-bottom: 10px;
  margin-top: 10px;
}

.chart-slot:hover {
  background-color: whitesmoke;
}

.chart-slot > span {
  opacity: 0;
  transition: opacity 0.5s;
}

.change-icon {
  position: absolute;
  top: 0;
  right: 0;
  padding: 5px;
} 

.chart-slot:hover .change-icon {
  opacity: 1;
}

.chart-slot:hover .trash-icon {
  opacity: 1;
}



.bi {   
  cursor: pointer;
}

</style>
  