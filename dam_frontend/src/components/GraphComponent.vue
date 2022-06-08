<template>
    <button v-on:click="forceUpdateGraph">Force Update</button>
    <div id="chart"></div>
</template>

<script>
import ApexCharts from "apexcharts";
const axios = require('axios').default;

export default {
    data() {
        return {
            options: {
                colors: ["#0000ff", "#ff0000", "#ffff00"],
                series: [{
                    type: 'area',
                    name: "Water level",
                    data: [],
                },
                {
                    type: 'line',
                    name: "Alarm",
                    data: [],
                },
                {
                    type: 'line',
                    name: "Pre-alert",
                    data: [],
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
        this.chart = new ApexCharts(document.querySelector("#chart"), this.options);
        this.chart.render();
        // update the graph every 5 seconds
        this.updateGraph();
        setInterval(this.regularUpdate, 5000);
    },
    methods: {
        forceUpdateGraph: function () {
            console.log("Force updating");
            this.updateGraph();
        },
        regularUpdate: function () {
            console.log("Regular update");
            this.updateGraph();
        },
        updateGraph: function () {
            var pre_alert_line = [];
            var alert_line = [];
            for (let i = 0; i < 10; i++) {
                alert_line.push(150);
                pre_alert_line.push(130);
            }

            var url = 'http://localhost:3000/api/dashboard';
            axios({
                method: 'GET',
                url: url,
            }).then(response => {

                this.chart.updateSeries([{
                    name: 'Water level',
                    data: response.data.waterlevels.reverse(),
                },
                {
                    name: 'Alarm',
                    data: alert_line,
                },
                {
                    name: 'Pre-alert',
                    data: pre_alert_line,
                }]);

                this.chart.updateOptions({
                    xaxis: {
                        categories: response.data.timestamps.reverse().map(t => {
                            let date = new Date(t);
                            return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
                        })
                    },
                });
            });
        },
    },
}
</script>

<style>
button {
    border-radius: 20px;
    color: white;
    background-color: rgb(0, 128, 255);
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
    padding: 10px;
}
</style>