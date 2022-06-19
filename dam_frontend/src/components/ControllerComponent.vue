<template>
    <div>
        <h1 id="controller"></h1>
        <div id="speedometer"></div>
        <div class="buttons">
            <button class="close" @click="setPercentage(0)">close</button>
            <button @click="setPercentage(20)">20 %</button>
            <button @click="setPercentage(40)">40 %</button>
            <button @click="setPercentage(60)">60 %</button>
            <button @click="setPercentage(80)">80 %</button>
            <button class="fullopen" @click="setPercentage(100)">full open</button>
        </div>
        <div class="mobilebuttons" hidden>
            <button class="close" @click="setPercentage(0)">close</button>
            <button class="buttons1" @click="setPercentage(20)">20 %</button>
            <button class="buttons1" @click="setPercentage(40)">40 %</button>
            <button class="buttons2" @click="setPercentage(60)">60 %</button>
            <button class="buttons2" @click="setPercentage(80)">80 %</button>
            <button class="fullopen" @click="setPercentage(100)">full open</button>
        </div>
    </div>
</template>

<script>
import ApexCharts from "apexcharts";
const axios = require("axios").default;

export default {
    data() {
        return {
            options: {
                series: [0],
                chart: {
                    height: 500,
                    type: "radialBar",
                    offsetY: -10,
                },
                plotOptions: {
                    radialBar: {
                        startAngle: -135,
                        endAngle: 135,
                        dataLabels: {
                            name: {
                                fontSize: "16px",
                                color: undefined,
                                offsetY: 120,
                            },
                            value: {
                                offsetY: 76,
                                fontSize: "22px",
                                color: undefined,
                                formatter: function (val) {
                                    return val + "%";
                                },
                            },
                        },
                    },
                },
                fill: {
                    type: "gradient",
                    gradient: {
                        shade: "dark",
                        shadeIntensity: 0.15,
                        inverseColors: false,
                        opacityFrom: 1,
                        opacityTo: 1,
                        stops: [0, 50, 65, 91],
                    },
                },
                stroke: {
                    dashArray: 4,
                },
                labels: ["Dam opening percentage"],
            },
        };
    },
    mounted() {
        this.speedometer = new ApexCharts(
            document.querySelector("#speedometer"),
            this.options
        );
        this.speedometer.render();
        this.updatePercentage();
    },
    methods: {
        setPercentage(level) {
            var url = "http://localhost:3000/api/opening";
            axios
                .post(url, {
                    percentage: level,
                })
                .then(this.updatePercentage);       
        },
        updatePercentage() {
            var url = 'http://localhost:3000/api/opening';
            axios.get(url).then(response => {
                this.speedometer.updateSeries([response.data.percentage]);
            });
        },
    },
};
</script>

<style>
@import '../css/controller.css';
</style>