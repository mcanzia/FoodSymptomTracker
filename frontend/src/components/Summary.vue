<template>
    <div class="container">
        <ChartGrid />
        <FloatingButton saveType="Chart" :editMode="chartBuilderActive" @saveOrEdit="openChartBuilder()" />               
    </div>
</template>

<script setup>
import router from "../router/index";
import { useChartStore } from '../stores/chartStore';
import { useUserStore } from '../stores/userStore';
import ChartGrid from './ChartGrid.vue';
import { Chart } from '../models/Chart';
import { ChartOptions } from '../models/ChartOptions';
import FloatingButton from './FloatingButton.vue';
import { onBeforeMount, ref } from 'vue';

const chartStore = useChartStore();
const userStore = useUserStore();

let chartBuilderActive = ref(false);

onBeforeMount(async() => {
    let userAccessToken = await userStore.getAccessToken();
    await chartStore.initializeCharts(userAccessToken);
    chartBuilderActive.value = false;
});

async function openChartBuilder() {
    createTempChart();
    await router.push({ name: 'chart-builder'});
}

function createTempChart() {
    // const id = db.collection('users').doc(this.auth.currentUser.uid).collection('charts').doc().id;
    const id = "chart_" + (chartStore.charts.length + 1);
    const defaultTitle = "New Chart - " + (chartStore.charts.length + 1);
    chartStore.newChartDetails = new Chart(id, defaultTitle, "bar", null, new ChartOptions(defaultTitle), null, null, "", "");
}

</script>


<style scoped>
</style>