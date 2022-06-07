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
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0]
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
    mounted() {
        this.initGraph();
    },
    methods: {
        initGraph() {
            var chart = new ApexCharts(document.querySelector("#chart"), this.options);
            chart.render();
            var line = [];
            for (let i=0; i<10; i++) {
                line.push(150);
            }

            var url = 'http://localhost:3000/api/dashboard';
            setInterval(() => {
                axios({
                    method: 'GET',
                    url: url,
                }).then(response => {
                    chart.updateSeries([{
                        name: 'Water level',
                        data: response.data.waterlevels.reverse(),
                    },
                    {
                        name: 'Alarm',
                        data: line,
                    }]);
                    chart.updateOptions({
                        xaxis: {
                            categories: response.data.timestamps.reverse()
                        },
                    });
                })
            }, 1000);
        },
    },

}
</script>
