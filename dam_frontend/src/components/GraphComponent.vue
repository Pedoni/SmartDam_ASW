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
                },
                {
                    type: 'line',
                    name: "Alarm",
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
                yaxis: {
                    labels: {
                        formatter: (value => value + " mt.")
                    },
                    min: 0,
                    max: 200
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
            for (let i = 0; i < 10; i++) {
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
                            categories: response.data.timestamps.reverse().map(t => {
                                let date = new Date(t);
                                return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
                            })
                        },
                    });
                })
            }, 1000);
        },
    },

}
</script>
