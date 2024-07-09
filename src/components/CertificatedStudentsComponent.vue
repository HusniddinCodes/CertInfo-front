<script>
import {mapActions, mapGetters} from "vuex"

export default {
    name: "CertificatedStudentsComponent",
    data() {
        return {
            search: ''
        }
    },
    computed: {
        ...mapGetters([
            'getCertificates',
            'getTotalCertificates',
            'getAfterCourseFinishedDate',
            'getBeforeCourseFinishedDate',
            'getCurrentCertificatePage',
            'getSearchCertificates'
        ])
    },
    methods: {
        ...mapActions(['fetchCertificates', 'deleteCertificate']),
        handleSearch() {
            if (!this.search.trim()) {
                return
            }

            this.fetchCertificates({
                page: 1,
                search: this.search,
                afterCourseFinishedDate: this.getAfterCourseFinishedDate,
                beforeCourseFinishedDate: this.getBeforeCourseFinishedDate
            })
        },
        clearSearch() {
            this.search = ''
            this.fetchCertificates({
                page: 1,
                afterCourseFinishedDate: this.getAfterCourseFinishedDate,
                beforeCourseFinishedDate: this.getBeforeCourseFinishedDate
            })
        },
        removeCertificate(id) {
            if (confirm('Sertifikatni o\'chirishni tasdiqlaysizmi ?')) {
                this.deleteCertificate(id)
                    .finally(() => {
                        this.fetchCertificates({
                            page: this.getCurrentCertificatePage,
                            search: this.search,
                            afterCourseFinishedDate: this.getAfterCourseFinishedDate,
                            beforeCourseFinishedDate: this.getBeforeCourseFinishedDate
                        })
                    })
            }
        },
        editCertificate(id) {
            this.$router.push({path: `/admin/certificate-edit/${id}`});
        },
        fillFormWithData() {
            this.search = this.getSearchCertificates
        },
    },
    created() {
        this.fillFormWithData()
    },
}
</script>

<template>
    <header class="row d-flex justify-content-between align-items-center m-0 rounded-top-3">
        <div class="col-12 col-md-7 mb-3 m-md-0">
            <h1 class="fs-5 m-0">
                Sertifikat olganlar ro’yxati
                <span class="certificates-count">{{getTotalCertificates}}ta sertifikat</span>
            </h1>
        </div>
        <div class="col-12 col-md-5">
            <label class="input-group border border-2 rounded-2">
                <input
                    v-model="search"
                    aria-describedby="basic-addon1"
                    class="form-control shadow-none border-0 ps-0"
                    placeholder=" Search"
                    type="text"
                    @keyup.enter="handleSearch"
                >
                <button v-show="search !== ''" @click="clearSearch"><i class="bi bi-x-lg"></i></button>
                <button class="" @click="handleSearch"><i class="bi bi-search bg-white input-group-text border-0"></i>
                </button>
            </label>
        </div>
    </header>
    <section>
        <div class="bg-white certificates-section">
            <div class="row m-0 students-table-head border-top border-bottom ">
                <div class="col-md-10 p-0">
                    <div class="row m-0">
                        <div class="col-6 col-md-4 table-head-content">
                            O'quvchi
                        </div>
                        <div class="col-6 col-md-4 table-head-content">
                            Kurs turi
                        </div>
                        <div class="d-none d-md-block col-md-4 table-head-content">
                            Elektron pochtasi
                        </div>
                    </div>
                </div>
                <div class="d-none d-md-block col-md-2"></div>
            </div>
            <div class="students-table-body">
                <div v-for="certificate of getCertificates"
                     :key="certificate.id" class="students-list row m-0 border-bottom"
                >
                    <div class="col-12 col-md-10 p-0">
                        <router-link :to="'/admin/certificate-info/' + certificate.id"
                                     class="row text-decoration-none m-0">
                            <div class="col-6 col-md-4 table-body-content d-flex align-content-center">
                                <div class="d-inline-block">
                                    <img
                                        :src="certificate.owner?.person?.avatar?.filePath ? `${this.$apiBaseMediaUrl}${certificate.owner.person.avatar.filePath}` : ''"
                                        alt="avatar"
                                        class="rounded-circle border">
                                </div>
                                <div class="d-inline-block ms-2 align-content-center">
                                    <p class="student-name m-0">{{ certificate.owner.person.givenName }}
                                        {{ certificate.owner.person.familyName }}</p>
                                    <p class="d-none d-sm-block d-md-none col-12 m-0">{{ certificate.owner.email }}</p>
                                </div>
                            </div>
                            <div class="col-6 col-md-4 table-body-content align-content-center">
                                {{ certificate.course.name }}
                            </div>
                            <div class="d-none d-md-block col-md-4 col-md table-body-content align-content-center">
                                {{ certificate.owner.email }}
                            </div>
                        </router-link>
                    </div>
                    <div class="d-none d-md-block col-md-2 table-body-content align-content-center">
                        <div class="text-center float-end">
                            <button class="list-icon p-0 m-0" type="button" @click="removeCertificate(certificate.id)">
                                <i
                                    class="bi bi-trash"></i></button>
                            <button class="list-icon p-0 m-0" type="button" @click="editCertificate(certificate.id)"><i
                                class="bi bi-pencil"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');

:root {
    --Inter: "Inter", sans-serif;
    --Primary: rgba(105, 65, 198, 1);
    --Magnolia: rgba(249, 245, 255, 1);
    --PaleLavender: rgba(233, 215, 254, 1);
    --Gray: rgba(71, 84, 103, 1);
}

body {
    background-color: whitesmoke !important;
    font-family: var(--Inter) !important;
    font-weight: 400 !important;
    font-size: 14px !important;
}

header {
    background-color: white;
    padding: 20px 24px;
}

.badge {
    font-size: 12px !important;
    background-color: var(--Magnolia);
    border: 1px solid var(--PaleLavender);
    color: var(--Primary) !important;
}

.certificates-count {
    padding: 2px 8px 2px 8px;
    gap: 0;
    border-radius: 16px;
    background: #F9F5FF;
    border: 1px solid #E9D7FE;
    color: #6941C6 !important;
    font-family: Inter;
    font-size: 12px;
    font-weight: 500;
    line-height: 18px;
    text-align: center;

}

h1 {
    line-height: 28px;
}

.input-group input {
    font-size: 16px;
    line-height: 24px;
}

.input-group-text {
    font-size: 15px;
    color: var(--Gray);
}

.students-table-head {
    background-color: whitesmoke;
}

.table-head-content {
    font-weight: 500;
    color: var(--Gray);
    font-size: 12px;
    line-height: 18px;
    padding: 12px 24px;
}

.table-body-content {
    font-weight: 400;
    color: var(--Gray);
    font-size: 12px;
    line-height: 18px;
    padding: 12px 24px;
}

.table-body-content img {
    height: 40px;
    width: 40px;
}

.table-body-content i {
    font-size: 20px;
    padding: 10px 5px;
    color: var(--Gray);
}

.table-body-content i:hover {
    color: var(--Primary);
}

.student-name {
    color: black;
    font-weight: 500;
}

a {
    color: var(--Gray);
    cursor: pointer;
}

.list-icon {
    background-color: white;
    border: none;
}

.certificates-section {
    min-height: 564px;
}
</style>
