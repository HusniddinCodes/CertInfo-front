<script>
import LogoComponent from "@/components/LogoComponent.vue";
import ResetPasswordComponent from "@/components/ResetPasswordComponent.vue";

export default {
    name: "LoginPage",
    components: {ResetPasswordComponent, LogoComponent}
}
</script>

<template>
    <nav class="navbar bg-body-light border border-bottom">
        <div class="container mb-2">
            <LogoComponent/>
        </div>
    </nav>
    
    <ResetPasswordComponent/>

</template>

<style scoped>

</style>
