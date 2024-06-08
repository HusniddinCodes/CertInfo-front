<script>
import FilterComponent from "@/components/FilterComponent.vue";
import CertificatedStudentsComponent from "@/components/CertificatedStudentsComponent.vue";
import Pagination from "@/components/Pagination.vue";

export default {
    name: "CertificatesPage",
    components: {Pagination, CertificatedStudentsComponent, FilterComponent}
}
</script>

<template>
    <div class="container-fluid">
        <FilterComponent />
        <div class="p-0 rounded-3 border">
            <CertificatedStudentsComponent />
            <Pagination />
        </div>
    </div>
</template>

<style>

</style>
