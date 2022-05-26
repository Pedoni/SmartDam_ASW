<template>
    <div id="injectedApp">
        <!--div id="nav">
            <router-link v-if="authenticated" to="/login" v-on:click="logout()" replace>Logout</router-link>
        </div-->
        <router-view @authenticated="setAuthenticated" />
    </div>
</template>

<script>
    export default {
        name: 'App',
        data() {
            return {
                authenticated: false,
                mockAccount: {
                    username: "user",
                    password: "password"
                }
            }
        },
        mounted() {
            if(!this.authenticated) {
                this.$router.replace({ name: "login" });
            }
        },
        methods: {
            setAuthenticated(status) {
                this.authenticated = status;
            },
            logout() {
                this.authenticated = false;
            }
        }
    }
</script>

<style>
    body {
        background: url("./assets/dam.jpg") no-repeat center center fixed;
        background-size: cover;
        background-attachment: fixed;
        overflow-y: scroll;
    }

    h1 {
        padding: 0;
        margin-top: 0;
    }

    #app {
        width: 100%;
        height: 100%;
    }
</style>