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
    mounted() {},
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