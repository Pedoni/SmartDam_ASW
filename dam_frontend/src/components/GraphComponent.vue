<template>
    <div class="row">
        <p>Update frequency: </p>
        <select @change="changedFrequency">
            <option value="5">5 seconds</option>
            <option value="10">10 seconds</option>
            <option value="30">30 seconds</option>
            <option value="60">1 minute</option>
            <option value="300">5 minutes</option>
        </select>
        <button v-on:click="forceUpdateGraph">Force Update</button>
        <p id="no_new_data" hidden>No new data</p>
    </div>
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
        }
    },
    mounted() {
        this.chart = new ApexCharts(document.querySelector("#chart"), this.options);
        this.chart.render();
        this.last_values = [];
        // update the graph every 5 seconds
        this.updateGraph();
        this.timer = setInterval(this.regularUpdate, 5000);
    },
    unmounted() {
        clearInterval(this.timer);
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
                // if there's no new data, we don't update the chart
                if (response.data.timestamps.every((val, index) => val == this.last_values[index])) {
                    document.getElementById("no_new_data").removeAttribute("hidden");
                } else {

                    this.last_values = [...response.data.timestamps];

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
                    document.getElementById("no_new_data").setAttribute("hidden", "hidden");
                }
            });
        },
        changedFrequency: function (event) {
            // kill old timer
            clearInterval(this.timer);
            this.timer = setInterval(this.regularUpdate, event.target.value * 1000);
        },
    },
}
</script>

<style>
button {
    border-radius: 5px;
    border: 0px;
    color: white;
    background-color: rgb(0, 128, 255);
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
    padding: 10px;
    margin: 10px;
    cursor: pointer;
}

select {
    border-radius: 5px;
    border: 0px;
    color: white;
    background-color: rgb(0, 128, 255);
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
    padding: 10px;
    margin: 10px;
    cursor: pointer;
}

#no_new_data {
    color: red;
}

.row {
    display: flex;
    flex-direction: row;
    height: 60px;
}
</style>