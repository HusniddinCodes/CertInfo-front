<script>
import LogoComponent from "@/components/LogoComponent.vue";
import ResetPasswordWidthEmailLinkComponent from "@/components/ResetPasswordWidthEmailLinkComponent.vue";

export default {
    name: "LoginPage",
    components: {ResetPasswordWidthEmailLinkComponent, LogoComponent}
}
</script>

<template>
    <nav class="navbar bg-body-light border border-bottom">
        <div class="container mb-2">
            <LogoComponent/>
        </div>
    </nav>
    
    <ResetPasswordWidthEmailLinkComponent/>

</template>

<style scoped>

</style>
