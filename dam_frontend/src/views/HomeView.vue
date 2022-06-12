<template>
    <div id="home">
        <div id="homecontent">
            <div id="routers">
                <router-link id="homelink" to="/home" replace @click="changeComponent($event, 'Home')">Home</router-link>
                <router-link id="panoramiclink" to="/home" replace @click="changeComponent($event, 'Panoramic')">Panoramic</router-link>
                <router-link id="graphlink" to="/home" replace @click="changeComponent($event, 'Graph')">Real-time data</router-link>
                <router-link id="controllerlink" to="/home" replace @click="changeComponent($event, 'Controller')">Controller</router-link>
            </div>
            <div v-if="comp == 'Home'">
                <HomeComponent></HomeComponent>
            </div>
            <div v-if="comp == 'Panoramic'">
                <PanoramicComponent></PanoramicComponent>
            </div>
            <div v-if="comp == 'Graph'">
                <GraphComponent></GraphComponent>
            </div>
            <div v-if="comp == 'Controller'">
                <ControllerComponent></ControllerComponent>
            </div>
        </div>
    </div>
</template>

<script>
import PanoramicComponent from "../components/PanoramicComponent.vue";
import GraphComponent from "../components/GraphComponent.vue"
import HomeComponent from "../components/HomeComponent.vue"
import ControllerComponent from "@/components/ControllerComponent.vue";
export default {
    name: "HomeView",
    data() {
        return {
            comp: "Home",
        };
    },
    methods: {
        initHome() {
            document.getElementById('homelink').style.color = '#ff0000'
        },
        changeComponent(event, newComponent) {
            this.comp = newComponent;
            document.getElementById(event.currentTarget.id).style.color = '#ff0000'
            switch (event.currentTarget.id) {
                case 'homelink':
                    document.getElementById("panoramiclink").style.color = '#000000'
                    document.getElementById("graphlink").style.color = '#000000'
                    document.getElementById("controllerlink").style.color = '#000000'
                    break
                case 'panoramiclink':
                    document.getElementById("homelink").style.color = '#000000'
                    document.getElementById("graphlink").style.color = '#000000'
                    document.getElementById("controllerlink").style.color = '#000000'
                    break
                case 'graphlink':
                    document.getElementById("panoramiclink").style.color = '#000000'
                    document.getElementById("homelink").style.color = '#000000'
                    document.getElementById("controllerlink").style.color = '#000000'
                    break
                case 'controllerlink':
                    document.getElementById("panoramiclink").style.color = '#000000'
                    document.getElementById("homelink").style.color = '#000000'
                    document.getElementById("graphlink").style.color = '#000000'
                    break
            }

        }
    },
    mounted() {
        this.initHome();
    },
    components: { PanoramicComponent, GraphComponent, HomeComponent, ControllerComponent }
}
</script>

<style scoped>
@import '../css/app.css';
@import '../css/home.css';
@import '../css/graph.css';
</style>