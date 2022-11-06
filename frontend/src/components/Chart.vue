<template>
    <b-container class="remove-all-margin-padding">
            <canvas :id="chartDetails.id" class="canvas-height"></canvas>
    </b-container>
</template>

<script>
import { auth, db } from '../firebase';
import Chart from "chart.js/auto";
import { bus } from '../main';
export default {
    setup() {
        return {
            
        }
    },
    props: ['chartDetails'],
    data() {
        return {
            auth,
            db,
            chart: {},
            chartType: this.chartDetails.chartType,
            chartData: this.chartDetails.chartData,
            chartOptions: this.chartDetails.chartOptions
        }
    },
    created() {
        bus.$on('chart-update', () => {
            this.chart.destroy();
            this.chartDetails.chartOptions.scales = {};
            this.createChartContext();
        });
    },
    mounted() {
        this.createChartContext();
    },
    components: {
    },
    methods: {
        createChartContext() {
            const ctx = document.getElementById(this.chartDetails.id);
            this.chart = new Chart(ctx, {
                type: this.chartDetails.chartType,
                data: this.chartDetails.chartData,
                options: this.chartDetails.chartOptions
            }); 
        }
    },
}
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