<template>
    <div id="login">
        <form v-on:keyup.enter="login">
            <h1>
                <p>Welcome to Smart Dam</p>
            </h1>
            <input type="text" name="username" v-model="input.username" placeholder="Username" />
            <input type="password" name="password" v-model="input.password" placeholder="Password" />
            <button type="button" v-on:click="login()">Login</button>
            <p id="wrong_credentials" hidden>Wrong credentials</p>
        </form>
    </div>
</template>

<script>
export default {
    name: 'LoginView',
    data() {
        return {
            input: {
                username: "",
                password: ""
            }
        }
    },
    methods: {
        login() {
            if (this.input.username == "user" && this.input.password == "password") {
                this.$emit("authenticated", true);
                this.$router.replace({ name: "home" });
            } else {
                document.getElementById("wrong_credentials").removeAttribute("hidden");
            }
        }
    }
}
</script>

<style scoped>
@import '../css/login.css';
</style>