<script>
import {mapActions, mapGetters} from "vuex"
import SuccessAndErrorModal from "@/components/SuccessAndErrorModal.vue"
import IsLoading from "@/components/isLoading.vue";

export default {
    name: "SignInComponent",
    components: {IsLoading, SuccessAndErrorModal},
    data() {
        return {
            form: {
                email: '',
                password: ''
            },
            resetPassword: {
                email: ''
            }
        }
    },
    computed: {
        ...mapGetters(['isAdmin', 'getResponse', 'getIsLoadingSettings']),
        isLoading() {
            return this.getIsLoadingSettings
        }
    },
    methods: {
        ...mapActions(['fetchToken', 'fetchRequestResetPassword']),
        togglePasswordVisibility() {
            const password = document.getElementById("password")

            if (password.type === "password") {
                password.type = "text"
            } else {
                password.type = "password"
            }
        },
        auth() {
            this.fetchToken(this.form)
                .then(() => {
                    if (this.isAdmin && this.getResponse.status === 200) {
                        this.$router.push('/admin/certificates')
                    } else if (this.getResponse.status === 200) {
                        this.$router.push('/')
                    }
                })
        },
        submitChangePassword() {
            this.fetchRequestResetPassword(this.resetPassword)
        }
    }
}
</script>

<template>
    <IsLoading v-if="isLoading"/>

    <div v-else class="container  position-absolute top-50 start-50 translate-middle">
        <form @submit.prevent="auth">
            <div class="row">
                <div class="col-12 col-sm-10 col-md-7 col-lg-5 col-xl-5 col-xxl-4
                position-absolute top-50 start-50 translate-middle">
                    <div class="mb-3">
                        <h1>Adminga kirish</h1>
                        <label class="form-label" for="exampleInputEmail1">Login</label>
                        <input
                            id="exampleInputEmail1"
                            v-model="form.email"
                            aria-describedby="emailHelp"
                            class="form-control"
                            placeholder="Loginni kiriting"
                            type="email"
                        >
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Parol</label>
                        <div class="input-group mb-3">
                            <input
                                id="password"
                                v-model="form.password"
                                aria-label=""
                                class="form-control password"
                                placeholder="Parolni kiriting"
                                type="password"
                            >
                            <span class="input-group-text eye-icon" @click="togglePasswordVisibility">
                            <img alt="eye.svg" src="../assets/eye.svg"></span>
                        </div>
                    </div>
                    <div v-if="getResponse.status === 401" class="mt-2 mb-2 text-danger">{{ getResponse.description }}
                    </div>
                    <div class="mb-3 form-check">
                        <input id="exampleCheck1" class="form-check-input" type="checkbox">
                        <label class="form-check-label" for="exampleCheck1">Eslab qolish</label>
                        <span
                            class="d-inline float-end forgot-password-text"
                            data-bs-target="#exampleModal"
                            data-bs-toggle="modal"
                            type="button"
                        >
                            Parolni unutdim
                        </span>
                    </div>
                    <button class="btn w-100 login-page-btn" type="submit">Kirish</button>
                </div>
            </div>
        </form>
    </div>
    <div class="container">
        <div class="row">
            <div class="col-12 col-sm-10 col-md-7 col-lg-5 col-xl-5 col-xxl-4">
                <div id="exampleModal" class="modal modal fade">
                    <div class="modal-dialog modal-dialog-class">
                        <div class="modal-content modal-content-class">
                            <div class="modal-header modal-header-class border-0">
                                <p class="forgot-password">Parolingizni yangilash uchun, pochtaga havola yuborish</p>
                                <button aria-label="Close" class="btn-close" data-bs-dismiss="modal"
                                        type="button"></button>
                            </div>
                            <form @submit.prevent="submitChangePassword">
                                <div class="modal-body modal-body-class">
                                    <input
                                        v-model="resetPassword.email"
                                        aria-describedby="emailHelp"
                                        class="form-control"
                                        placeholder="Pochtani kiriting"
                                        type="email"
                                    >
                                </div>
                                <div class="modal-footer modal-footer-class border-0 mt-2">
                                    <button class="btn modal-footer-btn" data-bs-dismiss="modal"
                                            type="submit">Jo'natish
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <SuccessAndErrorModal :getResponse="getResponse"/>
</template>

<style scoped>
form button {
    background: #7F56D9;
}

.login-page-btn {
    background-color: #7F56D9;
    color: white;
}

.forgot-password-text {
    color: #8300C5;
    text-decoration: none;
}

.modal-dialog-class {
    position: relative;
    top: 27%;
}

.modal-content-class {
    height: 280px;
}

.modal-header-class {
    border: none;
    height: 180px;
    background-image: url(../assets/pattern.svg);
    background-repeat: no-repeat;
}

.forgot-password {
    position: relative;
    left: 7px;
    top: 22px;
    font-size: 18px;
    font-weight: 600;
}

.modal-header-class button {
    position: relative;
    bottom: 55px;
    right: 15px;
}

.modal-body-class p {
    position: relative;
    left: -2px;
}

.modal-body-class {
    position: relative;
    bottom: 55px;
    height: 48px;
    color: #475467;
    left: 10px;
}

.modal-footer-class button {
    position: relative;
    bottom: 40px;
    margin: 10px;
    height: 44px;
    border: none;
    width: 100%
}

.modal-footer-btn {
    background: #7F56D9;
    color: white;
}

.password {
    border-right: none;
}

.eye-icon {
    border-left: none;
    background-color: #ffff;
    cursor: pointer;
}

@media only screen and (max-width: 576px) {
    .modal-dialog-class {
        position: relative;
        top: 29%;
    }
}

</style>
