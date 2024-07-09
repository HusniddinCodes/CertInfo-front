<script>
import {mapActions, mapGetters, mapMutations} from "vuex"
import CancelButton from "@/components/CancelButton.vue"
import SuccessButton from "@/components/SuccessButton.vue"
import IsLoading from "@/components/isLoading.vue"

export default {
    components: {
        IsLoading,
        CancelButton,
        SuccessButton
    },
    data() {
        return {
            file: '',
            avatarUrl: '',
            form: {
                email: '',
                familyName: '',
                givenName: '',
                course: '',
                courseFinishedDate: '',
                avatar: null,
                practiceDescription: '',
                certificateDefense: '',
            },
            localIsLoading: false,
            certificateId: this.$route.params.id,
        }
    },
    computed: {
        ...mapGetters(['getPicture', 'getCourses', 'getIsLoadingCourses', 'getCertificate']),
        isLoading() {
            return this.getIsLoadingCourses || this.localIsLoading
        }
    },
    methods: {
        ...mapActions(['fetchCourses', 'pushPicture', 'pushCertificate', 'fetchCertificate', 'changeCertificate']),
        ...mapMutations(['updateIsLoadingCertificates']),
        setCertificate() {
            const action = this.certificateId ? 'changeCertificate' : 'pushCertificate'
            this.localIsLoading = true
            this.updateIsLoadingCertificates(true)

            const certificateData = {
                email: this.form.email,
                familyName: this.form.familyName,
                givenName: this.form.givenName,
                course: this.form.course,
                courseFinishedDate: this.form.courseFinishedDate,
                avatar: this.form.avatar,
                practiceDescription: this.form.practiceDescription,
                certificateDefense: this.form.certificateDefense
            }

            const pushCertificate = () => {
                return this[action] (this.certificateId ? {id: this.certificateId, data : certificateData} : certificateData)
                    .then(() => {
                        this.$router.push('/admin/certificates')
                    })
                    .finally(() => {
                        this.localIsLoading = false
                        this.updateIsLoadingCertificates(false)
                    })
            }

            if (this.file) {
                const formData = new FormData()
                formData.append('file', this.file)

                this.pushPicture(formData)
                    .then(() => {
                        certificateData.avatar = this.getPicture
                        return pushCertificate()
                    })
                    .catch(() => {
                        this.localIsLoading = false
                        this.updateIsLoadingCertificates(false)
                    })
            } else {
                pushCertificate().catch(() => {
                    this.localIsLoading = false
                    this.updateIsLoadingCertificates(false)
                })
            }
        },
        triggerFileInput() {
            this.$refs.file.click()
        },
        handleDrop(event) {
            const file = event.dataTransfer.files[0]
            this.$refs.file.files = event.dataTransfer.files
            this.handleFileUpload({ target: { files: event.dataTransfer.files } })
        },
        handleFileUpload(event) {
            this.file = event.target.files[0]
            this.avatarUrl = URL.createObjectURL(this.file)
        },
        clearAvatar() {
            this.file = null
            this.avatarUrl = null
        },
        formatDate(date) {
            const d = new Date(date)
            let month = '' + (d.getMonth() + 1)
            let day = '' + d.getDate()
            const year = d.getFullYear()

            if (month.length < 2) {
                month = '0' + month
            }

            if (day.length < 2) {
                day = '0' + day
            }

            return [year, month, day].join('-')
        },
        loadCertificateData() {
            this.fetchCertificate(this.certificateId)
                .then(() => {
                    this.form.email = this.getCertificate.owner.email
                    this.form.familyName = this.getCertificate.owner.person.familyName
                    this.form.givenName = this.getCertificate.owner.person.givenName
                    this.form.course = this.getCertificate.course['@id']
                    this.form.courseFinishedDate = this.formatDate(this.getCertificate.courseFinishedDate)
                    this.form.practiceDescription = this.getCertificate.practiceDescription
                    this.form.certificateDefense = this.getCertificate.certificateDefense
                    this.form.avatar = this.getCertificate.owner.person.avatar['@id']
                })
        }
    },
    mounted() {
        this.fetchCourses()
        if (this.$route.path.startsWith('/admin/certificate-edit/')) {
            this.loadCertificateData()
        }
    },
    watch: {
        getIsLoadingCourses(newValue) {
            if (!newValue) {
                this.localIsLoading = false
            }
        }
    },
}
</script>

<template>
    <IsLoading v-if="isLoading" />
    <div v-else>
        {{getCertificate.email}}
        <div class="row">
            <div class="col-12"></div>
        </div>
        <div class="content ">
            <form @submit.prevent="setCertificate">
                <div class="container">
                    <div class="row border-bottom mb-3 ">
                        <div class="col-12">
                            <div class="title">Sertifikatlashtirish
                                <p>O’quvchi malumotlarini kiriting</p>
                            </div>
                        </div>
                    </div>
                    <div class="row w-100 d-flex justify-content-center  align-items-center border-bottom pb-3 ">
                        <div class="col-12  col-md-4 ">
                            <label for="inputGiveName" class="label-title">
                                O’quvchining ismi
                                <p>Sertifikat egasini isim sharifini kiriting</p>
                            </label>
                        </div>
                        <div class="col-12 col col-md-8">
                            <input
                                v-model="form.givenName"
                                type="text"
                                id="inputGiveName"
                                placeholder="John"
                                class="form-control ">
                        </div>
                    </div>
                    <div class="row w-100 d-flex justify-content-center  align-items-center border-bottom pb-3 ">
                        <div class="col-12  col-md-4 ">
                            <label for="inputFamilyName" class="label-title">
                                O’quvchining familiyasi
                                <p>Sertifikat egasini familyasini kiriting</p>
                            </label>
                        </div>
                        <div class="col-12 col col-md-8">
                            <input
                                v-model="form.familyName"
                                type="text"
                                id="inputFamilyName"
                                placeholder="Doe"
                                class="form-control ">
                        </div>
                    </div>
                    <div class="row w-100 d-flex justify-content-center  align-items-center border-bottom pb-3 pt-3 ">
                        <div class="col-12  col-md-4 ">
                            <label for="inputEmail" class="label-title">
                                Pochta
                                <p>O’quvchini pochtasini kiriting</p>
                            </label>
                        </div>
                        <div class="col-12 col col-md-8">
                            <input
                                v-model="form.email"
                                type="text"
                                id="inputEmail"
                                placeholder="example@mail.com"
                                class="form-control ">
                        </div>
                    </div>
                    <div class="row w-100 d-flex justify-content-center  align-items-center border-bottom pb-3 pt-3">
                        <div class="col-12  col-md-4">
                            <label for="courseName" class="label-title">
                                Kurs nomini kiriting
                                <p>Qaysi kursni tamomlaganini kiriting</p>
                            </label>
                        </div>
                        <div class="col-12 col col-md-8">
                            <select class="form-control" v-model="form.course">
                                <option
                                    v-for="course in getCourses"
                                    :key="course.id"
                                    :value="course['@id']"
                                >{{ course.name }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="row w-100 d-flex justify-content-center align-items-center border-bottom pb-3 pt-3">
                        <div class="col-12 col-md-4 align-self-start ">
                            <label for="practice" class="label-title ">
                                Praktika
                                <p>Malumot batafsil kiriting</p>
                            </label>
                        </div>
                        <div class="col-12 col-md-8">
                            <textarea
                                v-model="form.practiceDescription"
                                class="form-control costom-textarea"
                                placeholder=" Katta admin panelni yasab topshirdilar va uni funksionalini oylab chiqib mukammal darajaga yetqazib praktikani yuqori darajada topshirdilar"
                                id="practice">
                            </textarea>
                        </div>
                    </div>
                    <div class="row w-100 d-flex justify-content-center align-items-center border-bottom pb-3 pt-3">
                        <div class="col-12 col-md-4 align-self-start ">
                            <label for="protectionCertificate" class="label-title ">
                                Certifikat himoyasi
                                <p>Malumot batafsil kiriting</p>
                            </label>
                        </div>
                        <div class="col-12 col-md-8">
                            <textarea
                                v-model="form.certificateDefense"
                                class="form-control costom-textarea"
                                placeholder="Himoya mavzusi o’quv markazi uchun sertifikat admin paneli va foydalannuvchi ekranlarini yasash topshirilgan bolib, uni a’lo darajada topshirdilar va sertifikatni to’liq a’lo darajada himoya qildilar va taqdirlandilar"
                                id="protectionCertificate"
                            >
                            </textarea>
                        </div>
                    </div>
                    <div class="row w-100 d-flex justify-content-center  align-items-center border-bottom pb-3 ">
                        <div class="col-12 col-md-4 ">Kursni bitirgan vaqti
                            <p>Sertifikat egasining kursni tomomlagan vaqtini kiriting</p>
                        </div>
                        <div class="col-12 col-md-8">
                            <input
                                id="date-input-end"
                                v-model="form.courseFinishedDate"
                                v-mask-date
                                class="form-control"
                                placeholder="YYYY-OO-KK"
                            />
                        </div>
                    </div>
                    <div class="row mt-4 justify-content-center">
                        <div class="col-12">
                            <div class="row">
                                <div class="col-3 col-sm-2 col-xxl-1 relative-container" >
                                    <img v-if="this.getCertificate?.owner?.person?.avatar" class="avatar-mini" :src="avatarUrl ? avatarUrl : (this.$apiBaseMediaUrl + this.getCertificate.owner.person.avatar.filePath)" alt="avatar">
                                    <img v-else class="avatar-mini" :src="avatarUrl" alt="avatar">
                                    <button type="button" v-if="avatarUrl !== ''" @click="clearAvatar" class="clear-button">
                                        <i class="bi bi-x-lg"></i>
                                    </button>
                                </div>
                                <div class="col-9 col-sm-10 col-xxl-11" id="click-to-upload">
                                    <input
                                        type="file"
                                        class="form-control"
                                        id="file"
                                        ref="file"
                                        @change="handleFileUpload"
                                        style="display: none"
                                    >
                                    <div
                                        class="col-12"
                                        @click="triggerFileInput"
                                        @dragover.prevent
                                        @drop.prevent="handleDrop"
                                    >
                                        <img class="mx-auto d-block" src="@/assets/images/upload-img.svg" alt="">
                                        <p class="text-center mt-2 my-2" id="click" role="button">
                                            Click to upload
                                            <span>or drag and drop</span>
                                        </p>
                                        <p class="text-center mt-0">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row w-100 d-flex justify-content-end align-items-center pb-3 pt-3">
                        <div class="col-12 d-flex justify-content-start align-items-center align-self-start">
                            <SuccessButton :button-name="'Saqlash'"/>
                            <CancelButton :button-name="'Bekor qilish'"/>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>
#click-to-upload {
    border: 1px solid #EAECF0;
    border-radius: 12px;
    padding: 10px;
}

#click-to-upload:hover {
    border-color: #000;
}

#click {
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    text-align: left;
    color: #6941C6;
}

select {
    cursor: pointer;
}

p {
    font-family: inter;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #475467;
}

input::placeholder {
    font-family: inter;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #475467;
}

textarea {
    border-radius: 8px;
    resize: none;
    outline: none;
}

textarea::placeholder {
    font-family: inter;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #475467;
}

header {
    display: grid;
    height: 73px;
    gap: 20px;
    border-bottom: 8px black;
}

.title {
    font-family: inter;
    font-weight: 600;
    font-size: 18px;
    line-height: 28px;
}

form .label-title {
    font-family: Inter;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    color: #344054;
}

form .costom-textarea {
    width: 100%;
    height: 102px;
}

.form-control:focus {
    border-color: #6941C6;
    outline: none;
    box-shadow: 0 1px 0px 2px #1018280D;
}

.avatar-mini {
    width: 64px;
    height: 64px;
    border-radius: 200px;
}

.drag-area {
    width: 800px;
    height: 126px;
    gap: 16px;
    border-radius: 12px;
    padding: 16px 24px 16px 24px;
}

.drag-area .select {
    font-family: Inter;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    color: #6941C6;
    cursor: pointer;
}

.drag-area .select span {
    font-family: Inter;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #475467;
}

.relative-container {
    position: relative;
}

.clear-button {
    position: absolute;
    top: -10px;
    right: 10px;
    border: none;
    outline: none !important;
    background: transparent;
    cursor: pointer;
}

@media (min-width: 992px) {
    .content {
        padding: 50px 170px 50px 32px;
        gap: 24px;
    }
}
</style>
