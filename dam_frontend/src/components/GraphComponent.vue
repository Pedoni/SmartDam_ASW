<template>
    <div class="chart-container">
        <div class="row">
            <p>Update frequency: </p>
            <select @change="changedFrequencyWaterlevel">
                <option value="5">5 seconds</option>
                <option value="10">10 seconds</option>
                <option value="30">30 seconds</option>
                <option value="60">1 minute</option>
                <option value="300">5 minutes</option>
            </select>
            <button v-on:click="updateWaterlevelGraph">Force Update</button>
            <p id="waterlevel_no_new_data" hidden>No new data</p>
        </div>
        <div id="waterlevel_chart"></div>
    </div>
    <div class="chart-container">
        <div class="row">
            <p>Update frequency: </p>
            <select @change="changedFrequencyWeather">
                <option value="5">5 seconds</option>
                <option value="10">10 seconds</option>
                <option value="30">30 seconds</option>
                <option value="60">1 minute</option>
                <option value="300">5 minutes</option>
            </select>
            <button v-on:click="updateWeatherGraph">Force Update</button>
            <p id="weather_no_new_data" hidden>No new data</p>
        </div>
        <div id="weather_chart"></div>
    </div>
</template>

<script>
import ApexCharts from "apexcharts";
const axios = require('axios').default;

export default {
    data() {
        return {
            waterlevelChartOptions: {
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
                    height: 600,
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
            weatherChartOptions: {
                colors: ["#0000ff", "#ff0000", "#ffff00"],
                series: [{
                    type: 'area',
                    name: "Water temperature",
                    data: [],
                }],
                chart: {
                    height: 600,
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
                    text: 'Water temperature trend',
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
                        formatter: (value => value + " °C")
                    },
                    min: 0,
                    max: 30
                },

            },
        }
    },
    mounted() {
        this.waterlevelChart = new ApexCharts(document.querySelector("#waterlevel_chart"), this.waterlevelChartOptions);
        this.waterlevelChart.render();

        this.weatherChart = new ApexCharts(document.querySelector("#weather_chart"), this.weatherChartOptions);
        this.weatherChart.render();

        this.last_values = [];

        // update the graph every 5 seconds
        this.updateWaterlevelGraph();
        this.updateWeatherGraph();
        this.waterlevelTimer = setInterval(this.updateWaterlevelGraph, 5000);
        this.weatherTimer = setInterval(this.updateWeatherGraph, 5000);
    },
    unmounted() {
        clearInterval(this.waterlevelTimer);
        clearInterval(this.weatherTimer);
    },
    methods: {
        updateWaterlevelGraph: function () {
            var pre_alert_line = [];
            var alert_line = [];
            for (let i = 0; i < 10; i++) {
                alert_line.push(150);
                pre_alert_line.push(130);
            }

            var url = 'http://localhost:3000/api/waterlevel';
            axios({
                method: 'GET',
                url: url,
            }).then(response => {
                // if there's no new data, we don't update the chart
                if (response.data.timestamp.every((val, index) => val == this.last_values[index])) {
                    document.getElementById("waterlevel_no_new_data").removeAttribute("hidden");
                } else {

                    this.last_values = [...response.data.timestamp];

                    this.waterlevelChart.updateSeries([{
                        name: 'Water level',
                        data: response.data.waterlevel.reverse(),
                    },
                    {
                        name: 'Alarm',
                        data: alert_line,
                    },
                    {
                        name: 'Pre-alert',
                        data: pre_alert_line,
                    }]);

                    this.waterlevelChart.updateOptions({
                        xaxis: {
                            categories: response.data.timestamp.reverse().map(t => {
                                let date = new Date(t);
                                return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
                            })
                        },
                    });
                    document.getElementById("waterlevel_no_new_data").setAttribute("hidden", "hidden");
                }
            });
        },
        changedFrequencyWaterlevel: function (event) {
            // kill old timer
            clearInterval(this.waterlevelTimer);
            this.waterlevelTimer = setInterval(this.updateWaterlevelGraph, event.target.value * 1000);
        },
        updateWeatherGraph: function () {
            var pre_alert_line = [];
            var alert_line = [];
            for (let i = 0; i < 10; i++) {
                alert_line.push(150);
                pre_alert_line.push(130);
            }

            var url = 'http://localhost:3000/api/weather';
            axios({
                method: 'GET',
                url: url,
            }).then(response => {
                // if there's no new data, we don't update the chart
                if (response.data.timestamp.every((val, index) => val == this.last_values[index])) {
                    document.getElementById("weather_no_new_data").removeAttribute("hidden");
                } else {

                    this.last_values = [...response.data.timestamp];

                    this.weatherChart.updateSeries([{
                        name: 'Water temperature',
                        data: response.data.water_temperature.reverse(),
                    }]);

                    this.weatherChart.updateOptions({
                        xaxis: {
                            categories: response.data.timestamp.reverse().map(t => {
                                let date = new Date(t);
                                return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
                            })
                        },
                    });
                    document.getElementById("weather_no_new_data").setAttribute("hidden", "hidden");
                }
            });
        },
        changedFrequencyWeather: function (event) {
            // kill old timer
            clearInterval(this.weatherTimer);
            this.weatherTimer = setInterval(this.updateWeatherGraph, event.target.value * 1000);
        },
    },
}
</script>