<script>
import ChangePasswordComponent from "@/components/ChangePasswordComponent.vue"
import SuccessButton from "@/components/SuccessButton.vue"
import CancelButton from "@/components/CancelButton.vue"
import { mapActions, mapGetters } from "vuex"
import IsLoading from "@/components/isLoading.vue";
import SuccessAndErrorModal from "@/components/SuccessAndErrorModal.vue";

export default {
    name: "SettingsComponent",
    components: {SuccessAndErrorModal, IsLoading, CancelButton, SuccessButton, ChangePasswordComponent},
    data() {
        return {
            form: {
                email: "",
                familyName: "",
                givenName: "",
                avatar: "",
            },
            file: "",
            avatarUrl: "",
        }
    },
    computed: {
        ...mapGetters(["getUser", "getPicture", "getUserResponse", 'getResponse', 'getIsLoadingSettings']),
        isLoading() {
            return this.getIsLoadingSettings
        },
    },
    methods: {
        ...mapActions(["fetchUser", "pushPicture", "changeUserData"]),
        fillFormWithData() {
            const userData = this.getUser
            if (userData !== null) {
                this.form.email = userData.email || ''
                if (this.getUser.person) {
                    this.form.familyName = userData.person.familyName || ''
                    this.form.givenName = userData.person.givenName || ''
                    this.form.avatar = userData?.person?.avatar ? userData.person.avatar['@id'] : ''
                }
            }
        },
        updateUserData() {
            const formData = new FormData()
            formData.append("file", this.file)
            const userData = {
                email: this.form.email,
                familyName: this.form.familyName,
                givenName: this.form.givenName,
                avatar: this.form.avatar,
            }
            if (this.getUser.email !== userData.email) {
                if (confirm("Elektron pochta manzilini almashtirishga aminmisiz ?")) {
                    localStorage.removeItem("accessToken")
                    localStorage.removeItem("refreshToken")
                } else {
                    userData.email = this.getUser.email
                }
            }

            if (this.file) {
                this.pushPicture(formData).then(() => {
                    userData.avatar = this.getPicture
                    return this.changeUserData({id: this.getUser.id, data: userData})
                })
            } else {
                this.changeUserData({id: this.getUser.id, data: userData})
            }
        },
        triggerFileInput() {
            this.$refs.file.click()
        },
        handleDrop(event) {
            const file = event.dataTransfer.files[0]
            this.$refs.file.files = event.dataTransfer.files
            this.handleFileUpload({target: {files: event.dataTransfer.files}})
        },
        handleFileUpload(event) {
            this.file = event.target.files[0]
            this.avatarUrl = URL.createObjectURL(this.file)
        },
        clearAvatar() {
            this.file = ''
            this.avatarUrl = ''
        },
        redirectToHome() {
            if (this.getResponse.status === 200) {
                window.location.href = "/admin/certificates"
            }
        },
    },
    mounted() {
        this.fetchUser({})
    },
    created() {
        this.fillFormWithData()
    },
    watch: {
        "$store.state.user": {
            handler: function (newValue, oldValue) {
                this.fillFormWithData()
            },
            deep: true,
        },
    },
}
</script>

<template>
    <IsLoading v-if="isLoading" />

    <div class="px-3 py-3" v-else>
        <form @submit.prevent="updateUserData">
            <div
                class="mt-5 d-flex justify-content-start flex-column flex-md-row justify-content-md-between align-items-md-center">
                <div class="d-block d-md-flex align-items-end">
                    <img class="avatar"
                         :src="getUser.person?.avatar?.filePath ? `${this.$apiBaseMediaUrl}${getUser.person.avatar.filePath}` : ''"
                         alt="avatar">
                    <img class="verification" src="@/assets/images/verified.svg" alt="verification">
                    <div v-if="getUser.person" class="mb-sm-3">
                        <h2 class="full-name">{{ getUser.person.familyName }} {{ getUser.person.givenName }}</h2>
                        <p class="nickname">@{{ getUser.person.givenName }}</p>
                    </div>
                </div>
                <div class=" pb-4 mt-1 mt-sm-4">
                    <SuccessButton :button-name="'Saqlash'"/>
                    <CancelButton :button-name="'Bekor qilish'"/>
                </div>
            </div>

            <div class="row justify-content-center mt-5">
                <div class="col-12 col-md-8 col-xxl-6">
                    <div class="row">
                        <div class="col-12 col-sm-6">
                            <div class="mb-3">
                                <label for="givenName" class="form-label">Ism</label>
                                <input v-model="form.givenName" type="text" class="form-control" id="givenName"
                                       aria-describedby="emailHelp"
                                       placeholder="Ismingiz kiriting">
                            </div>
                        </div>
                        <div class="col-12 col-sm-6">
                            <div class="mb-3">
                                <label for="exampleInputPassword1" class="form-label">Sharif</label>
                                <input v-model="form.familyName" type="text" class="form-control" id="inputLastName"
                                       placeholder="Familiyangizni kiriting">
                            </div>
                        </div>
                        <div class="col-12">

                        </div>
                        <div class="col-12">
                            <label for="exampleInputEmail1" class="form-label">Pochta</label>
                            <div class="input-group mb-3 email-radius">
                            <span class="input-group-text bg-white border border-end-0" id="basic-addon1">
                                <svg width="20" height="16" viewBox="0 0 20 16" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M1.66675 3.83325L8.47085 8.59612C9.02182 8.9818 9.29731 9.17465 9.59697 9.24934C9.86166 9.31532 10.1385 9.31532 10.4032 9.24934C10.7029 9.17465 10.9783 8.9818 11.5293 8.59612L18.3334 3.83325M5.66675 14.6666H14.3334C15.7335 14.6666 16.4336 14.6666 16.9684 14.3941C17.4388 14.1544 17.8212 13.772 18.0609 13.3016C18.3334 12.7668 18.3334 12.0667 18.3334 10.6666V5.33325C18.3334 3.93312 18.3334 3.23306 18.0609 2.69828C17.8212 2.22787 17.4388 1.84542 16.9684 1.60574C16.4336 1.33325 15.7335 1.33325 14.3334 1.33325H5.66675C4.26662 1.33325 3.56655 1.33325 3.03177 1.60574C2.56137 1.84542 2.17892 2.22787 1.93923 2.69828C1.66675 3.23306 1.66675 3.93312 1.66675 5.33325V10.6666C1.66675 12.0667 1.66675 12.7668 1.93923 13.3016C2.17892 13.772 2.56137 14.1544 3.03177 14.3941C3.56655 14.6666 4.26662 14.6666 5.66675 14.6666Z"
                                    stroke="#667085" stroke-width="1.66667" stroke-linecap="round"
                                    stroke-linejoin="round"/>
                                </svg>
                            </span>
                                <input
                                    v-model="form.email"
                                    type="text" class="form-control border-start-0"
                                    id="email"
                                    placeholder="olivia@untitledui.com"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                >
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row mt-4 justify-content-center">
                <div class="col-12 col-md-8 col-xxl-6">
                    <div class="row">
                        <div v-if="getUser.person" class="col-3 col-md-3 mx-lg-0 relative-container">
                            <img class="avatar-mini"
                                 :src="avatarUrl ? avatarUrl : (getUser?.person?.avatar?.filePath ? this.$apiBaseMediaUrl + getUser.person.avatar.filePath : '')"
                                 alt="avatar">
                            <button v-if="avatarUrl !== ''" @click="clearAvatar" class="clear-button">
                                <i class="bi bi-x-lg"></i>
                            </button>
                        </div>
                        <div v-if="getUser.person" class="col-9 col-md-9 click-to-upload">
                            <input
                                type="file"
                                class="form-control"
                                id="file"
                                ref="file"
                                @change="handleFileUpload"
                                style="display: none;"
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
            <div class="row mt-5 justify-content-center">
                <div class="col-12 col-md-8 col-xxl-6 ">
                    <ChangePasswordComponent/>
                </div>
            </div>
        </form>
        <SuccessAndErrorModal :getResponse="getResponse" :redirectToURL="redirectToHome"/>
    </div>
</template>

<style scoped>
body {
    font-family: Inter;
}

.full-name {
    font-size: 30px;
    font-weight: 600;
    line-height: 38px;
    text-align: left;
}

.form-control {
    padding: 10px 14px 10px 14px;
    gap: 8px;
    border-radius: 8px;
    border: 1px solid #D0D5DD;

}

.email-radius {
    border-radius: 8px;
    border: 1px solid #D0D5DD;

}

.nickname {
    color: #475467;
}

.avatar {
    width: 160px;
    height: 160px;
    border-radius: 200px;
    border: 4px solid #FFFFFF;
    box-shadow: 0 4px 6px -2px #10182808;
}

.verification {
    width: 32px;
    height: 32px;
    position: relative;
    right: 40px;
    bottom: 5px;
}

.avatar-mini {
    width: 64px;
    height: 64px;
    border-radius: 200px;
}

.click-to-upload {
    border: 1px solid #EAECF0;
    border-radius: 12px;
    padding: 10px;
}

.text-center {
    font-size: 12px;
    font-weight: 400;
    line-height: 18px;
    text-align: center;
    color: #475467
}

span {
    font-size: 12px;
    font-weight: 400;
    line-height: 18px;
    color: #475467
}

#click {
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    text-align: left;
    color: #6941C6;
}

.click-to-upload:hover {
    border-color: #000;
}

.relative-container {
    position: relative;
}

.clear-button {
    position: absolute;
    top: -10px;
    right: 40px;
    border: none;
    outline: none !important;
    background: transparent;
    cursor: pointer;
}

@media (max-width: 767px) {
    .avatar {
        width: 96px;
        height: 96px;
    }

    .verification {
        width: 24px;
        height: 24px;
        position: relative;
        top: 30px;
        right: 28px;
    }
}
</style>
