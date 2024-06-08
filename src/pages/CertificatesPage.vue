<script>
import FilterComponent from "@/components/FilterComponent.vue";
import CertificatedStudentsComponent from "@/components/CertificatedStudentsComponent.vue";
import PaginationComponent from "@/components/PaginationComponent.vue";

export default {
    name: "CertificatesPage",
    components: {PaginationComponent, CertificatedStudentsComponent, FilterComponent}
}
</script>

<template>
    <div class="container-fluid">
        <FilterComponent />
        <div class="p-0 rounded-3 border">
            <CertificatedStudentsComponent />
            <PaginationComponent />
        </div>
    </div>
</template>

<style>

</style>
