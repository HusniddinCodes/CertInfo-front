<script>
import { mapActions, mapGetters } from "vuex"

export default {
    name: "CertInfoPage",
    methods: {
        ...mapActions(['fetchCertificate', 'fetchCertificateScanQr']),
        goBack() {
            this.$router.go(-1)
        },
    },
    computed: {
        ...mapGetters(['getCertificate']),
    },
    mounted() {
        this.fetchCertificate(this.$route.params.certificateId)
    }
}
</script>

<template>
    <div class="pb-4">
        <div class="user-info-header-wrapper">
            <div class="container">
                <div>
                    <a role="button" @click="goBack" v-if="this.$route.path.startsWith('/admin')" href="#" type="button" class="back-button">
                        <img src="@/assets/images/arrow-left.svg" alt=""/>
                        <span>Orqaga</span>
                    </a>
                </div>

                <div v-if="getCertificate.owner" class="profile d-sm-flex d-inline-block">
                    <!--        if certified, add .certified class to avatar-->
                    <div class="avatar-container certified">
                        <div class="avatar">
                            <img :src="getCertificate.owner?.person?.avatar?.filePath ? `${this.$apiBaseMediaUrl}${getCertificate.owner.person.avatar.filePath}` : `${this.$apiBaseMediaUrl}${getCertificate.imgCertificate.filePath}`" alt="avatar">
                        </div>
                    </div>
                    <div class="full-name-username-wrapper ms-0 mb-0 ms-sm-3 mb-sm-4">
                        <h4 class="full-name">{{getCertificate.owner.person.familyName}} {{getCertificate.owner.person.givenName}}</h4>
                        <p class="username">{{getCertificate.owner.email}}</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="container">
            <div class="row">
                <div class="col-lg-6">
                    <div class="cert-info-container">
                        <div v-if="getCertificate.course" class="wrapper">
                            <h6 class="header">Tamomlagan kursi</h6>
                            <p class="description">
                                {{getCertificate.course.description}}
                            </p>
                        </div>

                        <div class="wrapper">
                            <h6 class="header">Praktika</h6>
                            <p class="description">
                                {{getCertificate.practiceDescription}}
                            </p>
                        </div>

                        <div class="wrapper">
                            <h6 class="header">Sertifikat himoyasi</h6>
                            <p class="description">
                                {{getCertificate.certificateDefense}}
                            </p>
                        </div>

                        <a v-if="getCertificate.file" :href="`${this.$apiBaseMediaUrl}${getCertificate.file.filePath}`" class="d-lg-inline-block d-none download-button">Sertifikatni yuklab olish</a>

                    </div>
                </div>

                <div class="col-lg-5 offset-lg-1 mt-5 mt-lg-0">
                    <div v-if="getCertificate.imgCertificate" class="cert-wrapper w-100">
                        <img class="w-100" :src="`${this.$apiBaseMediaUrl}${getCertificate.imgCertificate.filePath}`" alt="">
                    </div>

                    <div  v-if="getCertificate.file" class="text-center">
                        <a :href="`${this.$apiBaseMediaUrl}${getCertificate.file.filePath}`" class="d-lg-none d-inline-block download-button">Sertifikatni yuklab olish</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.user-info-header-wrapper {
    position: relative;
    padding-top: 40px;
}

.user-info-header-wrapper:before {
    content: " ";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 52%;
    background: linear-gradient(180deg, #A5C0EE 0%, #FBC5EC 100%);
    z-index: -1;
}

.back-button {
    font-size: 14px;
    text-decoration: none;
    color: #fff;
    margin-bottom: 30px;
    margin-left: 20px;
    display: flex;
    align-items: center;
}

.back-button img {
    margin-right: 8px;
}

.user-info-header-wrapper .profile {
    display: flex;
    align-items: flex-end;
}

.user-info-header-wrapper .profile .avatar-container {
    position: relative;
}

.user-info-header-wrapper .profile .avatar-container .avatar {
    position: relative;
    border-radius: 50%;
    width: 160px;
    height: 160px;
    overflow: hidden;
    border: 4px solid rgba(250, 250, 250);
    box-shadow: 0 12px 16px -4px rgba(16, 24, 40, 0.08);

}

.user-info-header-wrapper .profile .avatar-container .avatar img {
    width: 100%;
}

.user-info-header-wrapper .profile .avatar-container.certified:before {
    display: block;
    content: " ";
    position: absolute;
    background: url("@/assets/images/verified.svg") no-repeat center center;
    background-size: cover;
    bottom: 9px;
    right: 9px;
    width: 32px;
    height: 32px;
    z-index: 99999;
}

.user-info-header-wrapper .profile .full-name-username-wrapper {
    margin-bottom: 30px;
}

.user-info-header-wrapper .profile .full-name-username-wrapper .full-name {
    font-size: 30px;
    font-weight: 600;
    color: #101828;
    margin: 0;
    padding: 0;
    line-height: 38px;
}

.user-info-header-wrapper .profile .full-name-username-wrapper .username {
    margin: 0;
    padding: 0;
    color: #475467;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
}

.cert-info-container {
    margin-top: 60px;
}

.cert-info-container .wrapper {
    border-left: 4px solid #F2F4F7;
    padding: 16px 24px;
}

.cert-info-container .wrapper .header {
    font-size: 20px;
    line-height: 30px;
    font-weight: 600;
    margin-bottom: 8px;
}


.cert-info-container .wrapper .description {
    margin: 0;
    padding: 0;
    color: #475467;
    font-size: 16px;
    line-height: 24px;
    font-weight: 400;
}

a.download-button {
    padding: 12px 20px;
    text-decoration: none;
    color: #fff;
    background-color: #7f56d9;
    border-radius: 8px;
    font-size: 16px;
    line-height: 24px;
    font-weight: 600;
    margin-top: 60px;
    display: inline-block;
    text-align: center;
    width: 50%;
    max-width: 360px;
}

.cert-wrapper {
    padding: 38px 35px;
    border: 1px solid #000;
    border-radius: 20px;
}

.cert-wrapper iframe {
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.15);
    border: none;
    outline: none;
    min-width: 348px;
    max-width: 454px;
    width: 100%;
    height: 74vh;
    max-height: 640px;
    overflow: hidden;
}

@media screen and (max-width: 768px) {
    .cert-wrapper {
        padding: 15px;
    }

    a.download-button {
        width: 100%;
    }
}
</style>
