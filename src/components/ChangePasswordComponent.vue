<script>
import {mapActions, mapGetters} from "vuex";
import SuccessButton from "@/components/SuccessButton.vue";
import CancelButton from "@/components/CancelButton.vue";
import SuccessAndErrorModal from "@/components/SuccessAndErrorModal.vue";

export default {
    name: "ChangePasswordComponent",
    components: {SuccessAndErrorModal, CancelButton, SuccessButton },
    data() {
        return {
            form: {
                oldPassword: '',
                newPassword: '',
            },
            newPasswordRetry: '',
            showOldPassword: false,
            showNewPassword: false,
            showNewPasswordRetry: false,
            showMenu: false,
        }
    },
    computed: {
        ...mapGetters(['getUser', 'getResponse']),
        isSubmitDisabled() {
            return this.form.oldPassword === '' ||
                this.form.newPassword === '' ||
                this.newPasswordRetry === '' ||
                this.form.newPassword !== this.newPasswordRetry ||
                this.form.newPassword.length < 6;
        }
    },
    methods: {
        ...mapActions(['changePassword']),
        showNewPasswordTemporary(field) {
            this[field] = true;
        },
        hidePasswordTemporary(field) {
            this[field] = false;
        },
        toggleMenu() {
            this.showMenu = !this.showMenu;
        },
        submitChangePassword() {
            this.changePassword({ id: this.getUser.id, data: this.form });
        },
        redirectToHome() {
            if (this.getResponse.status === 200) {
                window.location.href = "/admin/certificates";
            }
        },
    }
}
</script>

<template>
    <button
        type="button"
        class="btn save-btn"
        @click="toggleMenu"
    >
        Parolni yangilash
    </button>

    <div v-if="showMenu" class="">
        <div class="dropdown-content">
            <form @submit.prevent="submitChangePassword">
                <div class="mt-4">
                    <label for="oldPassword" class="form-label">Eski parol</label>
                    <div class="input-group">
                        <input :type="showOldPassword ? 'text' : 'password'"
                               class="form-control" id="oldPassword"
                               v-model="form.oldPassword" placeholder="Parol">
                        <span class="input-group-text">
                            <button class="btn btn-link p-0" type="button"
                                    @mousedown.prevent="showNewPasswordTemporary('showOldPassword')"
                                    @touchstart.prevent="showNewPasswordTemporary('showOldPassword')"
                                    @mouseup.prevent="hidePasswordTemporary('showOldPassword')"
                                    @mouseleave.prevent="hidePasswordTemporary('showOldPassword')"
                                    @touchend.prevent="hidePasswordTemporary('showOldPassword')"
                            >
                                <i :class="showOldPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                            </button>
                        </span>
                    </div>
                </div>
                <div class="mt-4">
                    <label for="newPassword" class="form-label">Yangi parol</label>
                    <div class="input-group">
                        <input :type="showNewPassword ? 'text' : 'password'"
                               class="form-control" id="newPassword"
                               v-model="form.newPassword" placeholder="Yangi parol">
                        <span class="input-group-text">
                            <button class="btn btn-link p-0" type="button"
                                    @mousedown.prevent="showNewPasswordTemporary('showNewPassword')"
                                    @touchstart.prevent="showNewPasswordTemporary('showNewPassword')"
                                    @mouseup.prevent="hidePasswordTemporary('showNewPassword')"
                                    @mouseleave.prevent="hidePasswordTemporary('showNewPassword')"
                                    @touchend.prevent="hidePasswordTemporary('showNewPassword')"
                            >
                                <i :class="showNewPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                            </button>
                        </span>
                    </div>
                </div>
                <div class="mt-4">
                    <label for="newPasswordRetry" class="form-label">Yangi parolni takrorlang</label>
                    <div class="input-group">
                        <input :type="showNewPasswordRetry ? 'text' : 'password'"
                               class="form-control" id="newPasswordRetry"
                               v-model="newPasswordRetry" placeholder="Yangi parol">
                        <span class="input-group-text">
                            <button class="btn btn-link p-0" type="button"
                                    @mousedown.prevent="showNewPasswordTemporary('showNewPasswordRetry')"
                                    @touchstart.prevent="showNewPasswordTemporary('showNewPasswordRetry')"
                                    @mouseup.prevent="hidePasswordTemporary('showNewPasswordRetry')"
                                    @mouseleave.prevent="hidePasswordTemporary('showNewPasswordRetry')"
                                    @touchend.prevent="hidePasswordTemporary('showNewPasswordRetry')"
                            >
                                <i :class="showNewPasswordRetry ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                            </button>
                        </span>
                    </div>
                </div>
                <div class="dropdown-footer mt-4">
                    <CancelButton :button-name="'Yopish'" :cancel-button="toggleMenu" />
                    <SuccessButton :disabled="isSubmitDisabled" :button-name="'Yangilash'" />
                </div>
            </form>
        </div>
    </div>
    <SuccessAndErrorModal :getResponse="getResponse" :redirectToURL="redirectToHome"/>
</template>

<style scoped>
.form-control {
    padding: 10px 14px 10px 14px;
    gap: 8px;
    border-radius: 8px;
    border: 1px solid #D0D5DD;
}
.dropdown-footer {
    display: flex;
    justify-content: end;
}

.save-btn {
    background: #7F56D9;
    color: white;
}

.save-btn:active {
    background: white;
    color: #7F56D9;
}

.save-btn {
    padding: 9px 16px 9px 16px;
    gap: 8px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    text-align: left;
}
</style>
