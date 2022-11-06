<template>
    <b-container fluid>
        <br />
            <span class="change-icon h2">
                <b-icon icon="gear" class="bi right"></b-icon>
                <b-icon icon="gear-fill" class="bi right" @click="$router.push('chart-builder')"></b-icon>
            </span>
        <b-row>
            <b-col><Bar :chart-data="chartData" :chart-options="chartOptions" :width="400" :height="400" /></b-col>
            <b-col><Bar :chart-data="chartData" :chart-options="chartOptions" :width="400" :height="400" /></b-col>
        </b-row>
        <br />
        <b-row>
            <b-col><Bar :chart-data="chartData" :chart-options="chartOptions" :width="400" :height="400" /></b-col>
            <b-col><Bar :chart-data="chartData" :chart-options="chartOptions" :width="400" :height="400" /></b-col>
        </b-row>
        
    </b-container>
</template>

<script>
import { auth, db } from "../firebase";
import { Bar } from 'vue-chartjs/legacy'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
    data() {
        return {
            auth,
            db,
            chartData: {
                labels: [ 'January', 'February', 'March'],
                datasets: [
                {
                    label: 'Data One',
                    backgroundColor: '#f87979',
                    data: [40, 20, 12]
                }
                ]
            },
            chartOptions: {
                responsive: false
            },
            chartDataApi: null
        }
    },
    computed: {
        myStyles () {
            return {
                height: `${this.height}px`,
                position: 'relative'
            }
        }
    },
    async mounted() {
        try {
            await db.collection('users')
                    .doc(this.auth.currentUser.uid)
                    .collection('dateComponentValues')
                    .where('componentId', '==', '2qxzyxX82GmiDOAHcJVs')
                    .where('singleValue', '==', 'C')
                    .get()
                    .then(snapshot => {
                        if (snapshot.empty) {
                            return;
                        }
                        console.log("snapshot size --> " + snapshot.size);
                    })
        } catch (e) {
            console.log(e);
        }
    },
    props: {
    },
    components: {
        Bar
    }
}
</script>

<style scoped>
  .change-icon > .bi + .bi,
  .change-icon:hover > .bi {
    display: none;
  }
  .change-icon:hover > .bi + .bi {
    display: inherit;
  }
  .right {
    float: right;
  }
</style>