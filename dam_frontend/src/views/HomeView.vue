<template>
    <div id="home">       
        <div id="homecontent">
            <div id="routers">
                <router-link id="homelink" to="/home" replace v-on:click="changeComponent('Home')">Home</router-link>
                <router-link id="panoramiclink" to="/home" replace v-on:click="changeComponent('Panoramic')">Panoramic</router-link>
                <router-link id="graphlink" to="/home" replace v-on:click="changeComponent('Graph')">Real-time data</router-link>
            </div>
            <div v-if="comp == 'Home'">
                <h1>
                    <p>
                        Home Page
                    </p>
                </h1>
                <h1>
                    <p>
                        Home Page
                    </p>
                </h1>
                <h1>
                    <p>
                        Home Page
                    </p>
                </h1>
                <h1>
                    <p>
                        Home Page
                    </p>
                </h1>
                <h1>
                    <p>
                        Home Page
                    </p>
                </h1><h1>
                    <p>
                        Home Page
                    </p>
                </h1><h1>
                    <p>
                        Home Page
                    </p>
                </h1><h1>
                    <p>
                        Home Page
                    </p>
                </h1>
                <h1>
                    <p>
                        Home Page
                    </p>
                </h1><h1>
                    <p>
                        Home Page
                    </p>
                </h1><h1>
                    <p>
                        Home Page
                    </p>
                </h1><h1>
                    <p>
                        Home Page
                    </p>
                </h1><h1>
                    <p>
                        Home Page
                    </p>
                </h1><h1>
                    <p>
                        Home Page
                    </p>
                </h1>
            </div>
            <div v-if="comp == 'Panoramic'"> 
                <PanoramicComponent></PanoramicComponent>
            </div>
            <div v-if="comp == 'Graph'"> 
                <GraphComponent></GraphComponent>
            </div>
        </div>        
    </div>
</template>

<script>
    import PanoramicComponent from "../components/PanoramicComponent.vue";
    import GraphComponent from "../components/GraphComponent.vue"
    export default {
    name: "HomeView",
        data() {
            return {
                comp: "Home",
            };
        },
        methods: {
            changeComponent(newComponent) {
                this.comp = newComponent;
            }
        },
        components: { PanoramicComponent, GraphComponent }
    }
</script>

<style scoped>
   @import '../css/home.css';
</style>