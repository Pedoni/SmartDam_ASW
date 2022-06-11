<template>
    <h1 id="homePageTitle">
        <h2>
            Welcome to the Smart Dam board!
        </h2>
        <p>Here are some of the actual data extracted from the dam sensors:</p>
        <table>
            <tr>
                <th>Dam total capacity</th>
                <td>30.000.000 m<sup>3</sup></td>
            </tr>
            <tr>
                <th>Water actual volume </th>
                <td>23.000.000 m<sup>3</sup></td>
            </tr>
            <tr>
                <th>Water actual volume percentage</th>
                <td>76.67 %</td>
            </tr>
            <tr>
                <th>Water temperature</th>
                <td>8°C</td>
            </tr>
            <tr>
                <th>Air temperature</th>
                <td>21°C</td>
            </tr>
            <tr>
                <th>Daily rain</th>
                <td>2 mm</td>
            </tr>
            <tr>
                <th>Atmospheric pressure</th>
                <td>912 mb</td>
            </tr>
        </table>
    </h1>
</template>

<script>
//const axios = require('axios').default;

export default {
    data() {
        return {

        }
    },
    mounted(){

    },
    methods: {

    },
}
</script>

<style scoped>

table, td, th {  
    border: 1px solid #ddd;
    text-align: center;
    font-family: sans-serif;
}

table {
    border-collapse: collapse;
    margin: 25px 0;
    font-size: 0.9em;
    font-family: sans-serif;
    min-width: 400px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    margin-left: auto;
    margin-right: auto;
    table-layout: fixed;
}

th, td {
  padding: 15px;
  font-size: 1vw;
}

td {
    font-weight: normal;
}

h2 {
    text-align: center;
}

p {
    font-size: 1vw;
    font-weight: normal;
    text-align: center;
    font-family: sans-serif;
    margin-bottom: 3%;
}

</style>