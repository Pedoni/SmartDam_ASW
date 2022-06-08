<template>
    <div id="login">
        <form v-on:keyup.enter="login">
            <h1>
                <p>Welcome to Smart Dam</p>
            </h1>
            <input type="text" name="username" v-model="input.username" placeholder="Username" />
            <input type="password" name="password" v-model="input.password" placeholder="Password" />
            <button type="button" v-on:click="login()">Login</button>
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
            console.log("Your username: " + this.input.username);
            console.log("Your password: " + this.input.password);
            /*
            console.log("Required username: " + this.$parent.mockAccount.username);
            console.log("Required password: " + this.$parent.mockAccount.password);*/
            if (this.input.username != "" && this.input.password != "") {
                if (this.input.username == /*this.$parent.mockAccount.username*/ "user" && this.input.password == "password" /*this.$parent.mockAccount.password*/) {
                    this.$emit("authenticated", true);
                    this.$router.replace({ name: "home" });
                } else {
                    console.log("The username and / or password is incorrect");
                }
            } else {
                console.log("A username and password must be present");
            }
        }
    }
}
</script>

<style scoped>
@import '../css/login.css';
</style>