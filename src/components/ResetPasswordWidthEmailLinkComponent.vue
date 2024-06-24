<script>

import {mapActions, mapGetters} from "vuex";
import SuccessAndErrorModal from "@/components/SuccessAndErrorModal.vue";

export default {
    name: "ResetPasswordWidthEmailLinkComponent",
    components: {SuccessAndErrorModal},
    data() {
        return {
            form: {
                secretKey:'',
                newPassword: ''
            },
            newPasswordRetry: '',
            showPassword: false,
            showPasswordRetry: false,
        }
    },
    computed: {
        ...mapGetters(["getResponse"]),
        isSubmitDisabled() {
            return this.form.newPassword === '' ||
                this.newPasswordRetry === '' ||
                this.form.newPassword !== this.newPasswordRetry ||
                this.form.newPassword.length < 6
        }
    },
    methods: {
        ...mapActions(['fetchResetPassword']),
        showPasswordTemporary(field) {
            this[field] = true
        },
        hidePasswordTemporary(field) {
            this[field] = false
        },
        setSecretKey() {
            return  (new URLSearchParams(window.location.search)).get('secretKey')
        },
        setResetPassword() {
            this.fetchResetPassword(this.form)
        },
        redirectToHome() {
            if (this.getResponse.status === 200) {
                window.location.href = "/admin/certificates"
            } else {
                window.location.href = "/sign-in"
            }
        }
    },
    mounted() {
        this.form.secretKey = this.setSecretKey()
    }
}
</script>

<template>
    <div class="container  position-absolute top-50 start-50 translate-middle">
        <form @submit.prevent="setResetPassword">
            <div class="row">
                <div class="col-12 col-sm-10 col-md-7 col-lg-5 col-xl-5 col-xxl-4
                position-absolute top-50 start-50 translate-middle">
                    <div class="mb-3">
                        <label class="form-label">Parol</label>
                        <div class="input-group mb-3">
                            <input :type="showPassword ? 'text' : 'password'" class="form-control" id="newPassword"
                                   v-model="form.newPassword" placeholder="Yangi parol">
                            <span class="input-group-text">
                    <button class="btn btn-link p-0" type="button"
                            @mousedown.prevent="showPasswordTemporary('showPassword')"
                            @touchstart.prevent="showPasswordTemporary('showPassword')"
                            @mouseup.prevent="hidePasswordTemporary('showPassword')"
                            @mouseleave.prevent="hidePasswordTemporary('showPassword')"
                            @touchend.prevent="hidePasswordTemporary('showPassword')"
                    >
                        <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                    </button>
                                </span>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Parolni takrorlang</label>
                        <div class="input-group mb-3">
                            <input :type="showPasswordRetry ? 'text' : 'password'" class="form-control" id="newPasswordRetry"
                                   v-model="newPasswordRetry" placeholder="Yangi parol">
                            <span class="input-group-text">
                    <button class="btn btn-link p-0" type="button"
                            @mousedown.prevent="showPasswordTemporary('showPasswordRetry')"
                            @touchstart.prevent="showPasswordTemporary('showPasswordRetry')"
                            @mouseup.prevent="hidePasswordTemporary('showPasswordRetry')"
                            @mouseleave.prevent="hidePasswordTemporary('showPasswordRetry')"
                            @touchend.prevent="hidePasswordTemporary('showPasswordRetry')"
                    >
                        <i :class="showPasswordRetry ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                    </button>
                </span>

                        </div>
                    </div>
                    <button type="submit" :disabled="isSubmitDisabled" class="btn btn w-100 login-page-btn">Yangilash</button>
                </div>
            </div>
        </form>
    </div>
    <SuccessAndErrorModal :getResponse="getResponse" :redirectToURL="redirectToHome"/>
</template>

<style>
form button {
    background: #7F56D9;
}

.login-page-btn {
    background-color: #7F56D9;
    color: white;
}
</style>
