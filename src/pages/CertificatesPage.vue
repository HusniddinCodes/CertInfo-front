<script>
import FilterComponent from "@/components/FilterComponent.vue";
import StudentsList from "@/components/StudentsList.vue";
import Pagination from "@/components/Pagination.vue";

export default {
    name: "CertificatesPage",
    components: {Pagination, StudentsList, FilterComponent}
}
</script>

<template>
    <div class="container-fluid">
        <FilterComponent />
        <div class="p-0 rounded-3 border">
            <StudentsList />
            <Pagination />
        </div>
    </div>
</template>

<style>

</style>
