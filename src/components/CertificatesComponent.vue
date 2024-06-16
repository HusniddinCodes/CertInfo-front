<script>
import FilterComponent from "@/components/FilterComponent.vue";
import CertificatedStudentsComponent from "@/components/CertificatedStudentsComponent.vue";
import PaginationComponent from "@/components/PaginationComponent.vue";
import {mapActions} from "vuex";

export default {
    name: "CertificatesComponent",
    components: {
        PaginationComponent,
        CertificatedStudentsComponent,
        FilterComponent
    },

    methods: {
        ...mapActions(['fetchCertificates'])
    },
    mounted() {
        this.fetchCertificates('?page=1');
    }
}
</script>

<template>
    <div class="ms-lg-3 me-lg-3 mb-5 mt-4">
        <FilterComponent/>
        <div class="p-0 rounded-3 border">

            <CertificatedStudentsComponent/>
            <PaginationComponent/>

        </div>
    </div>
</template>

<style>

</style>
