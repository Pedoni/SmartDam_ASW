<template>
  <div>
    <h1 id="controller"></h1>
    <div id="speedometer"></div>
    <div class="buttons">
      <button>close</button>
      <button>20 %</button>
      <button>40 %</button>
      <button>60 %</button>
      <button>80 %</button>
      <button>full open</button>
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
          height: 350,
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
        labels: ["Median Ratio"],
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
};
</script>

<style scoped>
.buttons {
  text-align: center;
}
</style>