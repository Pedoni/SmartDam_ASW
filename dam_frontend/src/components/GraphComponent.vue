<template>
    <div>
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
                <button @click="updateWaterlevelGraph">Force Update</button>
                <p id="waterlevel_no_new_data" hidden>No new data</p>
            </div>
            <div class="row">
                <p id="waterlevel_max">Max: 2000</p>
                <p id="waterlevel_min">Min: 100</p>
                <p id="waterlevel_avg">Average: 310</p>
            </div>
            <div id="waterlevel_chart"></div>
        </div>
        <div class="chart-container">
            <div class="row">
                <p>Weather data: </p>
                <select @change="changedWeatherData">
                    <option value="water_temp">Water temperature</option>
                    <option value="air_temp">Air temperature</option>
                    <option value="pressure">Atmospheric pressure</option>
                    <option value="humidity">Humidity</option>
                    <option value="rain">Rain</option>
                </select>
                <p>Update frequency: </p>
                <select @change="changedFrequencyWeather">
                    <option value="5">5 seconds</option>
                    <option value="10">10 seconds</option>
                    <option value="30">30 seconds</option>
                    <option value="60">1 minute</option>
                    <option value="300">5 minutes</option>
                </select>
                <button @click="updateWeatherGraph(false)">Force Update</button>
                <p id="weather_no_new_data" hidden>No new data</p>
            </div>
            <div class="row">
                <p id="weather_max">Max: 2000</p>
                <p id="weather_min">Min: 100</p>
                <p id="weather_avg">Average: 310</p>
            </div>
            <div id="weather_chart"></div>
        </div>
    </div>
</template>

<script>
import ApexCharts from "apexcharts";
const axios = require('axios').default;
const utils = require("../utils");

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
                colors: ["#0000ff"],
                series: [{
                    type: 'area',
                    name: "Water temperature", // if there's only one series, the name does not display
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
                        formatter: (value => value.toFixed(2) + " " + this.weatherUnit)
                    },
                    //min: 0,
                    //max: 40
                },
            },
        }
    },
    mounted() {
        this.waterlevelChart = new ApexCharts(document.querySelector("#waterlevel_chart"), this.waterlevelChartOptions);
        this.waterlevelChart.render();

        this.weatherChart = new ApexCharts(document.querySelector("#weather_chart"), this.weatherChartOptions);
        this.weatherChart.render();
        this.weatherData = "water_temperature";
        this.weatherUnit = "°C";
        this.weatherFormatter = (value => value.toFixed(2) + " " + this.weatherUnit);

        this.last_values = [];
        this.pre_alert_line = [];
        this.alert_line = [];
        for (let i = 0; i < 10; i++) {
            this.alert_line.push(150);
            this.pre_alert_line.push(130);
        }

        // update the graph every 5 seconds
        this.updateWaterlevelGraph();
        this.waterlevelTimer = setInterval(this.updateWaterlevelGraph, 5000);
        this.updateWeatherGraph(false);
        this.weatherInterval = 5000;
        this.weatherTimer = setInterval(() => this.updateWeatherGraph(false), this.weatherInterval);
    },
    unmounted() {
        clearInterval(this.waterlevelTimer);
        clearInterval(this.weatherTimer);
    },
    methods: {
        updateTimestamps: function (chart, timestamps) {
            chart.updateOptions({
                xaxis: {
                    categories: timestamps.reverse().map(t => utils.formatData(new Date(t)))
                },
            });
        },
        updateWaterlevelGraph: function () {
            var url = 'http://localhost:3000/api/waterlevel';
            axios.get(url).then(response => {
                // if there's no new data, we don't update the chart
                if (response.data.timestamp.every((val, index) => val == this.last_values[index])) {
                    document.getElementById("waterlevel_no_new_data").removeAttribute("hidden");
                    return;
                }

                this.last_values = [...response.data.timestamp];

                const values = response.data.waterlevel;

                document.getElementById("waterlevel_min").innerText = "Min: " + utils.arrayMin(values).toFixed(2) + " mt.";
                document.getElementById("waterlevel_max").innerText = "Max: " + utils.arrayMax(values).toFixed(2) + " mt.";
                document.getElementById("waterlevel_avg").innerText = "Average: " + utils.arrayAvg(values).toFixed(2) + " mt.";

                this.waterlevelChart.updateSeries([{
                    name: 'Water level',
                    data: values.reverse(),
                },
                {
                    name: 'Alarm',
                    data: this.alert_line,
                },
                {
                    name: 'Pre-alert',
                    data: this.pre_alert_line,
                }]);

                this.updateTimestamps(this.waterlevelChart, response.data.timestamp);
                document.getElementById("waterlevel_no_new_data").setAttribute("hidden", "hidden");
            });
        },
        changedFrequencyWaterlevel: function (event) {
            // kill old timer
            clearInterval(this.waterlevelTimer);
            this.waterlevelTimer = setInterval(this.updateWaterlevelGraph, event.target.value * 1000);
        },
        updateWeatherGraph: function (changedData) {
            var url = 'http://localhost:3000/api/weather';
            axios.get(url).then(response => {
                // if there's no new data, we don't update the chart
                if (!changedData && response.data.timestamp.every((val, index) => val == this.last_values[index])) {
                    document.getElementById("weather_no_new_data").removeAttribute("hidden");
                    return;
                }

                this.last_values = [...response.data.timestamp];

                const values = response.data[this.weatherData];

                document.getElementById("weather_min").innerText = "Min: " + utils.arrayMin(values).toFixed(2) + " " + this.weatherUnit;
                document.getElementById("weather_max").innerText = "Max: " + utils.arrayMax(values).toFixed(2) + " " + this.weatherUnit;
                document.getElementById("weather_avg").innerText = "Average: " + utils.arrayAvg(values).toFixed(2) + " " + this.weatherUnit;

                this.weatherChart.updateSeries([{
                    data: values.reverse(),
                }]);

                this.updateTimestamps(this.weatherChart, response.data.timestamp);
                document.getElementById("weather_no_new_data").setAttribute("hidden", "hidden");
            });
        },
        changedFrequencyWeather: function (event) {
            // kill old timer
            clearInterval(this.weatherTimer);
            this.weatherInterval = event.target.value * 1000;
            this.weatherTimer = setInterval(this.updateWeatherGraph, this.weatherInterval);
        },
        changedWeatherData: function (event) {
            switch (event.target.value) {
                case "water_temp":
                    this.weatherData = "water_temperature";
                    this.weatherUnit = "°C";
                    this.weatherChart.updateOptions({
                        series: [{
                            type: 'area',
                            name: "Water temperature" // if there's only one series, the name does not display
                        }],
                        title: {
                            text: 'Water temperature trend'
                        },
                        yaxis: {
                            labels: {
                                formatter: this.weatherFormatter
                            },
                            min: 0,
                            max: 40
                        },
                    });
                    break;
                case "air_temp":
                    this.weatherData = "air_temperature";
                    this.weatherUnit = "°C";
                    this.weatherChart.updateOptions({
                        series: [{
                            type: 'area',
                            name: "Air temperature" // if there's only one series, the name does not display
                        }],
                        title: {
                            text: 'Air temperature trend'
                        },
                        yaxis: {
                            labels: {
                                formatter: this.weatherFormatter
                            },
                            min: 0,
                            max: 40
                        },
                    });
                    break;
                case "pressure":
                    this.weatherData = "atmospheric_pressure";
                    this.weatherUnit = "mmHg";
                    this.weatherChart.updateOptions({
                        series: [{
                            type: 'area',
                            name: "Atmospheric Pressure" // if there's only one series, the name does not display
                        }],
                        title: {
                            text: 'Atmospheric pressure trend'
                        },
                        yaxis: {
                            labels: {
                                formatter: this.weatherFormatter
                            },
                            min: 950,
                            max: 1050
                        },
                    });
                    break;
                case "humidity":
                    this.weatherData = "humidity";
                    this.weatherUnit = "%";
                    this.weatherChart.updateOptions({
                        series: [{
                            type: 'area',
                            name: "Humidity" // if there's only one series, the name does not display
                        }],
                        title: {
                            text: 'Humidity trend'
                        },
                        yaxis: {
                            labels: {
                                formatter: this.weatherFormatter
                            },
                            min: 0,
                            max: 100
                        },
                    });
                    break;
                case "rain":
                    this.weatherData = "rain";
                    this.weatherUnit = "mm";
                    this.weatherChart.updateOptions({
                        series: [{
                            type: 'area',
                            name: "Rain" // if there's only one series, the name does not display
                        }],
                        title: {
                            text: 'Rain trend'
                        },
                        yaxis: {
                            labels: {
                                formatter: this.weatherFormatter
                            },
                            min: 0,
                            max: 100
                        },
                    });
                    break;
                default:
                    console.log("ERROR: unknown type of weather data");
                    break;
            }
            this.updateWeatherGraph(true);
            clearInterval(this.weatherTimer);
            this.weatherTimer = setInterval(() => this.updateWeatherGraph(false), this.weatherInterval);
        },
    },
}
</script>