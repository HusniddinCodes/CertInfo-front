<script>
import LogoComponent from "@/components/LogoComponent.vue";
import SignInComponent from "@/components/SignInComponent.vue";

export default {
    name: "LoginPage",
    components: {
        SignInComponent,
        LogoComponent
    }
}
</script>

<template>

    <nav class="navbar bg-body-light border border-bottom">
        <div class="container mb-2">
            <LogoComponent />
        </div>
    </nav>

    <SignInComponent />

</template>

<style scoped>

</style>
