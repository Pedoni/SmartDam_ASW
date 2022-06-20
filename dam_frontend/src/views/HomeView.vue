<template>
    <div id="home">
        <div class="header"><p>Smart Dam</p></div>
        <div id="homecontent">
            <div v-if="isOnDesktop()" id="routers">
                <router-link id="homelink" to="/home" replace @click="changeComponent($event, 'Home')">HOME</router-link>
                <router-link id="panoramiclink" to="/home" replace @click="changeComponent($event, 'Panoramic')">PANORAMIC</router-link>
                <router-link id="graphlink" to="/home" replace @click="changeComponent($event, 'Graph')">REAL-TIME</router-link>
                <router-link id="controllerlink" to="/home" replace @click="changeComponent($event, 'Controller')">CONTROLLER</router-link>
            </div>
            <div v-if="!isOnDesktop()" id="routerbuttons">
                <router-link id="homelink" to="/home" replace @click="changeComponent($event, 'Home')"><img class="buttonimage" src="../assets/home.webp" alt="go to home" /></router-link>
                <router-link id="panoramiclink" to="/home" replace @click="changeComponent($event, 'Panoramic')"><img class="buttonimage" src="../assets/panorama.webp" alt="go to panoramic view" /></router-link>
                <router-link id="graphlink" to="/home" replace @click="changeComponent($event, 'Graph')"><img class="buttonimage" src="../assets/graph.webp" alt="go to real-time data" /></router-link>
                <router-link id="controllerlink" to="/home" replace @click="changeComponent($event, 'Controller')"><img class="buttonimage" src="../assets/remote.webp" alt="go to dam controller" /></router-link>
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
            <footer>
                <button id="logoutbutton" @click="this.logout">
                    <img src="../assets/logout.webp" alt="logout" />
                    <p>Logout</p>
                </button>
                <img id="logoutimage" @click="this.logout" src="../assets/logout.webp" alt="logout" />
            </footer>
        </div>
        <div class="footer"><p>Smart Dam Corporation&trade;</p></div>
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
            current: "homelink",
            windowWidth: window.innerWidth
        };
    },
    methods: {
        logout(){
            if (confirm("Are you sure?") == true) {
                this.$router.replace({ name: "login" });
            }
        },
        isOnDesktop(){
            return this.windowWidth > 789;
        },
        initHome() {
            document.getElementById('homelink').classList.add("selectedItem");
        },
        changeComponent(event, newComponent) {
            this.current = event.currentTarget.id;
            this.comp = newComponent;
            document.getElementById("panoramiclink").classList.remove("selectedItem");
            document.getElementById("graphlink").classList.remove("selectedItem");
            document.getElementById("controllerlink").classList.remove("selectedItem");
            document.getElementById("homelink").classList.remove("selectedItem");
            document.getElementById(this.current).classList.add("selectedItem");
        },
    },
    mounted() {
        this.initHome();
        window.onresize = () => {
            document.getElementById(this.current).classList.add("selectedItem");
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