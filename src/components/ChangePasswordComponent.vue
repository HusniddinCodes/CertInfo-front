<script>
import {mapActions, mapGetters} from "vuex";
import SuccessAndErrorModal from "@/components/SuccessAndErrorModal.vue";
import SuccessButton from "@/components/SuccessButton.vue";
import CancelButton from "@/components/CancelButton.vue";

export default {
    name: "ChangePasswordMenu",
    components: {CancelButton, SuccessButton, SuccessAndErrorModal},
    data() {
        return {
            form: {
                oldPassword: '',
                newPassword: '',
            },
            newPassword1: '',
            showOldPassword: false,
            showPassword: false,
            showPassword1: false,
            showMenu: false
        }
    },
    computed: {
        ...mapGetters(['getUser', 'getResponse']),
        isSubmitDisabled() {
            return this.form.oldPassword === '' ||
                this.form.newPassword === '' ||
                this.newPassword1 === '' ||
                this.form.newPassword !== this.newPassword1 ||
                this.form.newPassword.length < 6;
        }
    },
    methods: {
        ...mapActions(['changePassword']),
        showPasswordTemporary(field) {
            this[field] = true;
        },
        hidePasswordTemporary(field) {
            this[field] = false;
        },
        submitChangePassword() {
            this.changePassword({id: this.getUser.id, data: this.form});
        },
        redirectToHome() {
            if (this.getResponse.status === 200) {
                window.location.href = "/admin/certificates";
            }
        },
        toggleMenu() {
            this.showMenu = !this.showMenu;
        }
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
                                    @mousedown.prevent="showPasswordTemporary('showOldPassword')"
                                    @touchstart.prevent="showPasswordTemporary('showOldPassword')"
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
                        <input :type="showPassword ? 'text' : 'password'"
                               class="form-control" id="newPassword"
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
                <div class="mt-4">
                    <label for="newPassword1" class="form-label">Yangi parolni takrorlang</label>
                    <div class="input-group">
                        <input :type="showPassword1 ? 'text' : 'password'"
                               class="form-control" id="newPassword1"
                               v-model="newPassword1" placeholder="Yangi parol">
                        <span class="input-group-text">
                            <button class="btn btn-link p-0" type="button"
                                    @mousedown.prevent="showPasswordTemporary('showPassword1')"
                                    @touchstart.prevent="showPasswordTemporary('showPassword1')"
                                    @mouseup.prevent="hidePasswordTemporary('showPassword1')"
                                    @mouseleave.prevent="hidePasswordTemporary('showPassword1')"
                                    @touchend.prevent="hidePasswordTemporary('showPassword1')"
                            >
                                <i :class="showPassword1 ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                            </button>
                        </span>
                    </div>
                </div>
                <div class="dropdown-footer mt-4">
                    <CancelButton :button-name="'Yopish'" :cancel-button="toggleMenu"/>
                    <SuccessButton :disabled="isSubmitDisabled" :button-name="'Yangilash'"/>
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
