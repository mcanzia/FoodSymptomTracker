<template>
    <div class="container remove-all-margin-padding">
        <canvas :id="chartDetails.id" class="canvas-height"></canvas>
    </div>
</template>

<script setup>
import { watch, onMounted, ref } from "vue";
import ChartInstance from "chart.js/auto";
import { Colors } from 'chart.js';

const props = defineProps({
    chartDetails : Object
});

let chart = null;

function createChartContextAlt() {
    const ctx = document.getElementById(props.chartDetails.id);
    ChartInstance.register(Colors);
    chart = new ChartInstance(ctx, {
        type: props.chartDetails.chartShape,
        data: props.chartDetails.chartData,
        options: props.chartDetails.chartOptions
    });

}

function isChartEmpty() {
    return chart === null || chart === undefined;
}

onMounted(() => {
    createChartContextAlt();
});

watch(() => props.chartDetails.chartOptions, () => {
        chart.destroy();
        createChartContextAlt();
    }
);
</script>

<style scoped>
.remove-all-margin-padding{
    margin:0 !important;
    padding:0 !important;
}
.canvas-height {
    height: 400px;
}
</style>