<template>
    <h1 id="homePageTitle">
        <h2 id="hometitle">
            Welcome to the Smart Dam board!
        </h2>
        <p>Here are some of the most recent data extracted from the dam sensors.
            For the real time data, swipe to the Realtime tab.
        </p>
        <table>
            <tr>
                <th>Time of measurement</th>
                <td id="time"></td>
            </tr>
            <tr>
                <th>Water level</th>
                <td id="level"></td>
            </tr>
            <tr>
                <th>Dam total capacity</th>
                <td id="total_volume">30.000.000 m<sup>3</sup></td>
            </tr>
            <tr>
                <th>Water actual volume </th>
                <td id="volume">23.000.000 m<sup>3</sup></td>
            </tr>
            <tr>
                <th>Water actual volume percentage</th>
                <td id="volume_perc">76.67 %</td>
            </tr>
            <tr>
                <th>Humidity</th>
                <td id="humidity">76.67 %</td>
            </tr>
            <tr>
                <th>Water temperature</th>
                <td id="water_temp">8°C</td>
            </tr>
            <tr>
                <th>Air temperature</th>
                <td id="air_temp">21°C</td>
            </tr>
            <tr>
                <th>Daily rain</th>
                <td id="rain">2 mm</td>
            </tr>
            <tr>
                <th>Atmospheric pressure</th>
                <td id="pressure">912 mb</td>
            </tr>
        </table>
    </h1>
</template>

<script>
const axios = require('axios').default;

export default {
    data() {
        return {

        }
    },
    mounted() {
        axios.get("http://localhost:3000/api/summary")
            .then(response => {
                let date = new Date(response.data.timestamp);
                document.getElementById("time").innerText = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
                document.getElementById("level").innerText = response.data.level + " m";
                document.getElementById("water_temp").innerText = response.data.water_temperature + " °C";
                document.getElementById("air_temp").innerText = response.data.air_temperature + " °C";
                document.getElementById("pressure").innerText = response.data.atmospheric_pressure + " mmHg";
                document.getElementById("humidity").innerText = response.data.humidity + "%";
                document.getElementById("rain").innerText = response.data.rain + " mm";
                document.getElementById("total_volume").innerHTML = this.numberWithCommas(response.data.total_volume.toFixed(0)) + " m<sup>3</sup>";
                document.getElementById("volume").innerHTML = this.numberWithCommas(response.data.volume.toFixed(0)) + " m<sup>3</sup>";
                document.getElementById("volume_perc").innerText = response.data.volume_percentage.toFixed(2) + "%";
            });
    },
    methods: {
        numberWithCommas: function (x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'");
        },
    }
}
</script>
