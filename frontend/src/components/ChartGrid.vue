<template>
    <b-container fluid class="remove-all-margin-padding background-gray display-table">
        <b-row no-gutters v-for="r in numberOfRows" :key="r">
            <b-col cols="4" v-for="(chart, index) in chartStore.charts.slice(chartStartIndex(r), chartEndIndex(r))" :key="index">
                <div class="chart-slot">
                    <Chart :chart-details="chart" />
                </div>
            </b-col>
            <b-col cols="4" v-if="chartEndIndex(r) === chartStore.charts.length" class="parent">
                <div class="empty-chart-slot">                    
                    <span class="change-icon" v-if="!newChartToggle">
                        <b-icon name="addNewChart" icon="plus-circle" class="bi h1" variant="dark"></b-icon>
                        <b-icon icon="plus-circle-fill" class="bi h1" variant="dark" @click="newChartToggle = true"></b-icon>
                    </span>
                    <b-icon icon="bar-chart-fill" v-if="newChartToggle" aria-controls="chart-build-sidebar" name="addBarChart" class="add-bar-chart-button h3" @click="addNewChart('bar')"></b-icon>
                    <b-icon icon="graph-up" v-if="newChartToggle" aria-controls="chart-build-sidebar" name="addLineChart" class="add-line-chart-button h3" @click="addNewChart('line')"></b-icon>
                    <span class="change-icon" name="closeChartToggle" v-if="newChartToggle">
                        <b-icon icon="x-circle" v-if="newChartToggle" class="bi h1"></b-icon>
                        <b-icon icon="x-circle-fill" v-if="newChartToggle" class="bi h1" @click="newChartToggle = false"></b-icon>
                    </span>
                    <b-icon icon="pie-chart-fill" v-if="newChartToggle" aria-controls="chart-build-sidebar" name="addPieChart" class="add-pie-chart-button h3" @click="addNewChart('pie')"></b-icon>
                    <b-icon icon="life-preserver" v-if="newChartToggle" aria-controls="chart-build-sidebar" name="addDonutChart" class="add-donut-chart-button h3" @click="addNewChart('doughnut')"></b-icon>
                    <b-icon icon="broadcast" v-if="newChartToggle" aria-controls="chart-build-sidebar" name="addRadarChart" class="add-radar-chart-button h3" @click="addNewChart('radar')"></b-icon>
                </div>            
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import { auth, db } from '../firebase';
import { useChartStore } from '../stores/chartStore';
import Chart from './Chart.vue';
export default {
    setup() {
        const chartStore = useChartStore();
        return {
            chartStore
        }
    },
    data() {
        return {
            auth,
            db,
            present: false,
            height: 1000,
            width: 1000,
            newChartToggle: false
        }
    },
    props: ["newChart"],
    components: {
        Chart
    },
    created() {
        this.getChartData();
    },
    mounted() {
    },
    methods: {
        addNewChart(type) {
            this.$emit('add-new-chart', type);
        },
        chartStartIndex(row) {
            return 3 * (row - 1);
        },
        chartEndIndex(row) {
            return this.chartStore.charts.length - this.chartStartIndex(row);
        },
        async getChartData() {
            try {
                await db.collection('users')
                        .doc(this.auth.currentUser.uid)
                        .collection('charts')
                        .get()
                        .then(snapshot => {
                            if (snapshot.empty) {
                                return;
                            }
                            this.chartStore.charts = snapshot.docs.map(value => {
                                    let chartData =
                                        {
                                            id: value.id,
                                            chartData: value.data().chartData,
                                            title: value.data().title,
                                            type: value.data().type,
                                            building: false
                                        }
                                        return chartData;
                                    });
                        })
                            
            } catch (error) {
                console.log(error)
            }
        }
    },
    computed: {
        numberOfRows() {
            return Math.floor(this.chartStore.charts.length / 3) + 1;
        }
    },
}
</script>

<style>
body {
    background-color: lightgrey;
}
.remove-all-margin-padding{
    margin:0 !important;
    padding:0 !important;
}
.display-table {
    display: table;
}
.chart-slot {
    background-color: white;
    border: 0px;
    border-radius: 25px;
    margin: 10px;
}
.empty-chart-slot {
    background-color: lightsteelblue;
    border: 0px;
    border-radius: 25px;
    margin: 10px;
    flex-grow: 1;
    flex-basis: 33%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.building-chart-slot {
    background-color: whitesmoke;
    border: 0px;
    border-radius: 25px;
    margin: 10px;
    flex-grow: 1;
    flex-basis: 33%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.background-gray {
    background-color: lightgrey;
}

.change-icon > .bi + .bi,
  .change-icon:hover > .bi {
    display: none;
  }
  .change-icon:hover > .bi + .bi {
    display: inherit;
  }

.parent {
    display: flex;
    flex-wrap: wrap; 
}
.canvas-height {
    height: 400px;
}

/* margin: top right bottom left*/
.add-bar-chart-button {
    margin: 0% 50% 25% 0%;
    color: whitesmoke;
    position: absolute;
}
.add-line-chart-button {
    margin: 40% 0% 0% 35%;
    color: whitesmoke;
    position: absolute;
}
.add-pie-chart-button {
    margin: 40% 35% 0% 0%;
    color: whitesmoke;
    position: absolute;
}
.add-radar-chart-button {
    margin: 55% 0% 0% 0%;
    color: whitesmoke;
    position: absolute;
}
.add-donut-chart-button {
    margin: 0% 0% 25% 50%;
    color: whitesmoke;
    position: absolute;
}

</style>