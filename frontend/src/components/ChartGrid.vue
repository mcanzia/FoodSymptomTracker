<template>
    <div class="remove-all-margin-padding chart-container d-flex">
      <div class="chart-slot" v-for="(chart, index) in charts" :key="index">
            <span class="change-icon">
                <ion-icon name="pencil" class="bi" @click="editChart(chart)" />
            </span>
          <Chart :chart-details="chart" />
      </div>
    </div>
  </template>
  
<script setup>
import { ref, computed } from 'vue';
import { useChartStore } from '../stores/chartStore';
import router from "../router/index";
import Chart from './Chart.vue';

const chartStore = useChartStore();
let charts = computed(() => chartStore.charts);

function editChart(chart) {
    chartStore.newChartDetails = chart;
    router.push({ name: 'chart-builder'});
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
  padding: 10px;
  /* border: 1px solid gray;
  border-top: 0px; */
  max-height: 400px;
  max-width: 400px;
}

.chart-slot:hover {
  background-color: whitesmoke;
}

.change-icon {
  position: absolute;
  top: 0;
  right: 0;
  padding: 5px;
  opacity: 0;
  transition: opacity 0.5s;
} 

.chart-slot:hover .change-icon {
  opacity: 1;
}

.bi {   
  cursor: pointer;
}

</style>
  