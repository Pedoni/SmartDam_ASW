<template>
    <div id="home">
        <div id="homecontent">
            <!-- <button @click="getSize()" id="menubutton">Menu</button> -->
            <div v-if="isOK()" id="routers">
                <router-link id="homelink" to="/home" replace @click="changeComponent($event, 'Home')">Home</router-link>
                <router-link id="panoramiclink" to="/home" replace @click="changeComponent($event, 'Panoramic')">Panoramic</router-link>
                <router-link id="graphlink" to="/home" replace @click="changeComponent($event, 'Graph')">Real-time</router-link>
                <router-link id="controllerlink" to="/home" replace @click="changeComponent($event, 'Controller')">Controller</router-link>
            </div>
            <div v-if="!isOK()" id="routerbuttons">
                <router-link id="homelink" to="/home" replace @click="changeComponent($event, 'Home')"><img class="buttonimage" src="../assets/home.png"/></router-link>
                <router-link id="panoramiclink" to="/home" replace @click="changeComponent($event, 'Panoramic')"><img class="buttonimage" src="../assets/panorama.png"/></router-link>
                <router-link id="graphlink" to="/home" replace @click="changeComponent($event, 'Graph')"><img class="buttonimage" src="../assets/graph.png"/></router-link>
                <router-link id="controllerlink" to="/home" replace @click="changeComponent($event, 'Controller')"><img class="buttonimage" src="../assets/remote.png"/></router-link>
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
            windowWidth: window.innerWidth
        };
    },
    methods: {
        isOK(){
            return this.windowWidth > 789;
        },
        initHome() {
            document.getElementById('homelink').style.color = '#0000ff'
        },
        changeComponent(event, newComponent) {
            this.comp = newComponent;
            document.getElementById(event.currentTarget.id).style.color = '#0000ff'
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

        },
    },
    mounted() {
        this.initHome();
        window.onresize = () => {
            this.windowWidth = window.innerWidth
        }
    },
    components: { PanoramicComponent, GraphComponent, HomeComponent, ControllerComponent }
}
</script>

<style scoped>
@import '../css/app.css';
@import '../css/home.css';
@import '../css/graph.css';
</style>