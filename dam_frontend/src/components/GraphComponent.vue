<template>
    <div id="chart"></div>
</template>

<script>
  import ApexCharts from "apexcharts";
  const axios = require('axios').default;

  export default {
    data() {
      return {
          options: {
              colors: ["#0000ff", "#ff0000"],
              series: [{
                type: 'area',
                name: "Water level",
                data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
              },
              {
                type: 'line',
                name: "Alarm",
                data: [150, 150, 150, 150, 150, 150, 150, 150, 150]
              },
              ],
              chart: {
                height: 350,
                zoom: {
                  enabled: false
                }
              },
              dataLabels: {
                enabled: false
              },
              stroke: {
                curve: 'smooth'
              },
              title: {
                text: 'Water level trend',
                align: 'left'
              },
              grid: {
                row: {
                  colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                  opacity: 0.5
                },
              },
              xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
              },
          },
      }
    },
    mounted(){
      this.initGraph();
    },
    methods: {
      initGraph(){
        var chart = new ApexCharts(document.querySelector("#chart"), this.options);
        chart.render();
        
        var data = [10, 41, 35, 51, 49, 62, 69, 91, 148];
        var cat = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
        var line = [150, 150, 150, 150, 150, 150, 150, 150, 150];

        var url = 'http://my-json-server.typicode.com/apexcharts/apexcharts.js/yearly';
        setInterval(function(){ 
          axios({
            method: 'GET',
            url: url,
          }).then(function(response) {
            data = data.slice(1, 10)
            data.push(response.data.sort(() => Math.random() - 0.5)[0].y/3);
            cat.push(cat.shift());
            chart.updateSeries([{
              name: 'Water level',
              data: data,
            }, 
            {
              name: 'Alarm',
              data: line,
            }]);
            chart.updateOptions({
              xaxis: {
                  categories: cat
              },
            });
          })
        }, 500);
      },
      updateGraph(chart){
        setInterval(function(){ 
          chart.updateSeries([{
            name: 'Water level',
            data: Math.floor(Math.random() * 150)
          }])
        }, 300);
      }
    },
    
  }

</script>

<style scoped>

</style>

