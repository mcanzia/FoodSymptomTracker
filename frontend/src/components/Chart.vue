<template>
    <b-container class="remove-all-margin-padding">
            <canvas :id="chartDetails.id" class="canvas-height"></canvas>
    </b-container>
</template>

<script>
import { auth, db } from '../firebase';
import Chart from "chart.js/auto";
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
    },
    destroyed() {
    },
    mounted() {
        this.createChartContext();
    },
    components: {
    },
    watch: { 
        // Fix this with Vue 3
        'chartDetails.chartData': function() {
          console.log('lemon');
          this.chart.destroy();
          this.chartDetails.chartOptions.scales = this.chartDetails.chartOptions ? {} : null;
          this.createChartContext();
        },
        'chartDetails.chartOptions': function() {
            console.log('orange');
            this.chart.destroy();
            this.chartDetails.chartOptions.scales = this.chartDetails.chartOptions ? {} : null;
            this.createChartContext();
        },
        'chartDetails.chartType': function() {
            console.log('lime');
            this.chart.destroy();
            this.chartDetails.chartOptions.scales = this.chartDetails.chartOptions ? {} : null;
            this.createChartContext();
        }
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