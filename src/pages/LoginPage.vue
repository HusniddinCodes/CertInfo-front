<script>
import LogoComponent from "@/components/LogoComponent.vue";
import SignIn from "@/components/SignInComponent.vue";

export default {
    name: "LoginPage",
    components: {SignIn, LogoComponent}
}
</script>

<template>

    <nav class="navbar bg-body-light border border-bottom">
        <div class="container mb-2">
            <LogoComponent />
        </div>
    </nav>

    <SignIn />

</template>

<style scoped>

</style>
