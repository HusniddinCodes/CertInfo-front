<script>
import SideBarSlot from "@/components/SideBarSlot.vue"
import CertificatesComponent from "@/components/CertificatesComponent.vue";

export default {
    name: "CertificatesPage",
    components: {
        CertificatesComponent,
        SideBarSlot,
    },
}
</script>

<template>
    <SideBarSlot>
        <CertificatesComponent/>
    </SideBarSlot>
</template>

<style scoped>

</style>
