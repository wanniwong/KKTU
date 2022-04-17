<template>
  <!--<q-page class="flex flex-center">-->
    <q-page style="height:100%">
      <div class="pageTitle"><h5> Dashboard </h5></div>
     
      <div class="box" style="background-color:#8ab0be; color:white;">
        <q-item style="padding-left:50px">
            <q-icon name="group_add" style="font-size: 30px; color:white; margin:auto" ></q-icon>
            <q-item-section right style="margin-left:-80px; font-size:16px">
              <q-item-label>Today Queue</q-item-label>
            </q-item-section>
        </q-item>
          
        <p style="font-size:30px; margin-top:-5px; margin-bottom:20px;">30</p>
        <q-btn id="op" icon-right="arrow_right">More Info</q-btn>
      </div>

      <div class="box" style="background-color:#8287cc; color:white;">
        <q-item style="padding-left:50px">
            <q-icon name="trending_up" style="font-size: 30px; color:white; margin:auto" ></q-icon>
            <q-item-section right style="margin-left:-80px; font-size:16px">
              <q-item-label>Today Served</q-item-label>
            </q-item-section>
        </q-item>
          
        <p style="font-size:30px; margin-top:-5px; margin-bottom:20px;">28</p>
        <q-btn id="op" icon-right="arrow_right">More Info</q-btn>
      </div>

      <div class="box" style="background-color:#484c7f; color:white;">
        <q-item style="padding-left:50px">
            <q-icon name="call_missed" style="font-size: 30px; color:white; margin:auto" ></q-icon>
            <q-item-section right style="margin-left:-80px; font-size:16px">
              <q-item-label>Today Missed</q-item-label>
            </q-item-section>
        </q-item>
          
        <p style="font-size:30px; margin-top:-5px; margin-bottom:20px;">2</p>
        <q-btn id="op" icon-right="arrow_right">More Info</q-btn>
      </div>
      <div class="chart">
        <h5>Number of patients</h5>
        <apexcharts width="100%" type="bar" :options="chartOptions" :series="series"></apexcharts>
        </div>
      <div class="chart" style="text-align:left">
          <h5 style="text-align:center">Patient's Type</h5>
        <apexcharts width="101.5%" height="65%" type="pie" :options="options" :series="series2"></apexcharts>
        </div>
  </q-page>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'

export default {
  name: 'Dashboard',
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
        options: {
          series: [44, 55, 13, 33],
          labels: ['Senior Citizen', 'Goverment Officer', 'OKU', 'Other'],
          legend: {
            position: 'bottom',
},   
        },
        series2: [52.6, 15.8, 5.3, 26.3]
      }
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      }
    }
}
</script>

<style>
  
  .box{
    margin:10px 30px 20px 30px;
    width:300px; 
    height:150px; 
    padding:10px;
    display:inline-block;
    text-align:center;
  }

  .chart{
    width: 100%;
    height: 100%;
    background-color:white;
    /* margin:5px 10px 20px 20px; */
    /* padding:10px; */
    margin-left: -10px;
    margin-bottom: 20px;
    display:inline-block;
    /* box-shadow: 0px 0px 15px #b8bcc5; */
    text-align:center;
  }
  #op{
  
    background: rgba(0, 0, 0, 0.2); 
    color:white;
    width:107%;
    margin-left: -10px;
    margin-top:-12px;
    padding:10px;
  }

  
</style>

