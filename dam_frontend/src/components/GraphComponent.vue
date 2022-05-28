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
                height: 650,
                zoom: {
                  enabled: false
                },
                animations: {
                    enabled: true,
                    easing: 'linear',
                    dynamicAnimation: {
                      speed: 1000
                    }
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
                align: 'center'
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
              yaxis: {
                labels: {
                  formatter: (value => value + " mt.")
                },  
                min: 100,
                max: 170
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
        //var cat = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
        var cat = [10, 41, 35, 51, 49, 62, 69, 91, 14];
        var line = [150, 150, 150, 150, 150, 150, 150, 150, 150];

        var url = 'http://my-json-server.typicode.com/apexcharts/apexcharts.js/yearly';
        setInterval(() => {
          axios({
            method: 'GET',
            url: url,
          }).then(response => {
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
        }, 1000);
      },
    },
    
  }

</script>

<style scoped>
  #chart {
    
  }  
</style>

