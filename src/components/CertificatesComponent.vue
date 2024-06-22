<script>
import FilterComponent from "@/components/FilterComponent.vue";
import PaginationComponent from "@/components/PaginationComponent.vue";
import CertificatedStudentsComponent from "@/components/CertificatedStudentsComponent.vue";
import SideBarSlot from "@/components/SideBarSlot.vue";
import {mapActions, mapGetters} from "vuex";

export default {
    name: "CertificatesComponent",
    components: {
        SideBarSlot,
        PaginationComponent,
        CertificatedStudentsComponent,
        FilterComponent
    },
    computed: {
        ...mapGetters([
            'getTotalCertificates',
            'getCurrentCertificatePage',
            'getAfterCourseFinishedDate',
            'getBeforeCourseFinishedDate',
            'getSearchCertificates',
            ]),
    },
    methods: {
        ...mapActions(['fetchCertificates']),
        onClickHandler(pageNum) {
            this.fetchCertificates({
                    page: pageNum,
                    search: this.getSearchCertificates,
                    afterCourseFinishedDate: this.getAfterCourseFinishedDate,
                    beforeCourseFinishedDate: this.getBeforeCourseFinishedDate
                }
            )
        }
    },
    mounted() {
        this.fetchCertificates({page: 1})
    }
}
</script>

<template>
    <div class="ms-lg-3 me-lg-3 mb-5 mt-4">
        <FilterComponent />
        <div class="p-0 rounded-3 border">
            <CertificatedStudentsComponent />
            <PaginationComponent
                :getPaginationItemsPerPage="Number(8)"
                :total-records="getTotalCertificates"
                :onClickHandler="onClickHandler"
                :getCurrentPage="Number(getCurrentCertificatePage)"
            />
        </div>
    </div>
</template>

<style scoped>

</style>
