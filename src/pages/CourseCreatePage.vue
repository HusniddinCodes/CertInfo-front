<script>
import SideBarSlot from "@/components/SideBarSlot.vue"
import CourseCreateComponent from "@/components/CourseCreateComponent.vue"

export default {
    components: {CourseCreateComponent, SideBarSlot},
}
</script>

<template>
    <SideBarSlot>

        <CourseCreateComponent />
    </SideBarSlot>
</template>

<style scoped>

</style>
