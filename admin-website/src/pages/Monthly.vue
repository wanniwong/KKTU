<template>
  <q-page>
    <div class="pageTitle"><h5> Monthly Report </h5></div>
    <div class="directory"><q-item to="/Dashboard" dense
    style="color:#509cb6;">Dashboard</q-item></div>
    <div class="queueReport">
      <apexcharts width="100%" height="100%" type="bar" :options="chartOptions" :series="series"></apexcharts>
        </div>
  </q-page>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
export default {
  name: 'Reports',
  components: {
      apexcharts: VueApexCharts
    },
    data () {
      return {
        chartOptions: {
          chart: {
            id: 'vuechart-example'
          },
          xaxis: {
            categories: ["Jan", "Feb", "Mar","Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"]
          }
        },
        series: [{
          name: 'No. of patient',
          data: [30500, 32075, 30987, 30356, 35046, 35506, 34007, 34798, 33500, 32974, 33670]
        }],
        }
    }
}
</script>

<style>
  .queueReport{
    width: 95%;
    height: 100%;
    background-color:white;
    margin:60px 20px 20px 10px;
    padding:10px;
    box-shadow: 0px 0px 15px #b8bcc5;
  }
</style>