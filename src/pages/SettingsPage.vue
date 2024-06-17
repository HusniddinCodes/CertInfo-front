<template>
    <SideBarSlot>
        <div class="ms-lg-3 me-lg-3 mb-5 mt-4">
            <SettingsComponent />
        </div>
    </SideBarSlot>
</template>

<script>
import SideBarSlot from "@/components/SideBarSlot.vue";
import SettingsComponent from "@/components/SettingsComponent.vue";

export default {
    name: "SettingsPage",
    components: {SettingsComponent, SideBarSlot}
}
</script>

<style scoped>

</style>