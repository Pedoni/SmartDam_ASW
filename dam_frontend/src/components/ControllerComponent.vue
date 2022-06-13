<template>
  <div>
    <h1 id="controller"></h1>
    <div id="speedometer"></div>
    <div class="buttons">
      <button @click="setPercentage(0)">close</button>
      <button @click="setPercentage(20)">20 %</button>
      <button @click="setPercentage(40)">40 %</button>
      <button @click="setPercentage(60)">60 %</button>
      <button @click="setPercentage(80)">80 %</button>
      <button @click="setPercentage(100)">full open</button>
    </div>
  </div>
</template>

<script>
import ApexCharts from "apexcharts";
// const axios = require("axios").default;

export default {
  data() {
    return {
      options: {
        series: [67],
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
  },
  methods: {
    setPercentage(level){
        this.speedometer.updateSeries([level]);
    }
  }
};
</script>

<style scoped>
.buttons {
  text-align: center;
}
</style>