<script>
import ChangePasswordComponent from "@/components/ChangePasswordComponent.vue";
import SuccessButton from "@/components/SuccessButton.vue";
import CancelButton from "@/components/CancelButton.vue";

export default {
    name: "SettingsComponent",
    components: {CancelButton, SuccessButton, ChangePasswordComponent}
}
</script>

<template>
    <div class="px-3 py-3">
        <div
            class="mt-5 d-flex justify-content-start flex-column flex-md-row justify-content-md-between align-items-md-center">
            <div class="d-block d-md-flex align-items-end">
                <img class="avatar" src="@/assets/images/avatar.png" alt="avatar">
                <img class="verification" src="@/assets/images/verified.svg" alt="verification">
                <div class="mb-sm-3">
                    <h2 class="full-name">Olivia Rhye</h2>
                    <p class="nickname">@olivia</p>
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
                            <label for="exampleInputEmail1" class="form-label">Ism</label>
                            <input type="email" class="form-control" id="inputName" aria-describedby="emailHelp"
                                   placeholder="Ismingiz kiriting">
                        </div>
                    </div>
                    <div class="col-12 col-sm-6">
                        <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label">Sharif</label>
                            <input type="text" class="form-control" id="inputLastName"
                                   placeholder="Familiyangizni kiriting">
                        </div>
                    </div>
                    <div class="col-12">
                        <label for="exampleInputEmail1" class="form-label">Pochta</label>
                        <div class="input-group mb-3">
                            <span class="input-group-text bg-white border border-end-0" id="basic-addon1">
                                <svg width="20" height="16" viewBox="0 0 20 16" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M1.66675 3.83325L8.47085 8.59612C9.02182 8.9818 9.29731 9.17465 9.59697 9.24934C9.86166 9.31532 10.1385 9.31532 10.4032 9.24934C10.7029 9.17465 10.9783 8.9818 11.5293 8.59612L18.3334 3.83325M5.66675 14.6666H14.3334C15.7335 14.6666 16.4336 14.6666 16.9684 14.3941C17.4388 14.1544 17.8212 13.772 18.0609 13.3016C18.3334 12.7668 18.3334 12.0667 18.3334 10.6666V5.33325C18.3334 3.93312 18.3334 3.23306 18.0609 2.69828C17.8212 2.22787 17.4388 1.84542 16.9684 1.60574C16.4336 1.33325 15.7335 1.33325 14.3334 1.33325H5.66675C4.26662 1.33325 3.56655 1.33325 3.03177 1.60574C2.56137 1.84542 2.17892 2.22787 1.93923 2.69828C1.66675 3.23306 1.66675 3.93312 1.66675 5.33325V10.6666C1.66675 12.0667 1.66675 12.7668 1.93923 13.3016C2.17892 13.772 2.56137 14.1544 3.03177 14.3941C3.56655 14.6666 4.26662 14.6666 5.66675 14.6666Z"
                                    stroke="#667085" stroke-width="1.66667" stroke-linecap="round"
                                    stroke-linejoin="round"/>
                                </svg>
                            </span>

                            <input type="text" class="form-control border-start-0" id="email"
                                   placeholder="olivia@untitledui.com" aria-label="Username"
                                   aria-describedby="basic-addon1">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row mt-4 justify-content-center">
            <div class="col-12 col-md-8 col-xxl-6">
                <div class="row">
                    <div class="col-3 col-md-3 mx-lg-0 relative-container">
                        <img class="avatarmini" src="@/assets/images/avatar.png" alt="">
                    </div>
                    <div class="col-9 col-md-9" id="click-to-upload">
                        <img class="mx-auto d-block" src="@/assets/images/upload-img.svg" alt="">
                        <p class="text-center mt-2 my-2" id="click" role="button">Click to upload
                            <span>or drag and drop</span></p>
                        <p class="text-center mt-0">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="row mt-5 justify-content-center">
            <div class="col-12 col-md-8 col-xxl-6 ">
                <ChangePasswordComponent />
            </div>
        </div>
    </div>
</template>

<style scoped>
body {
    font-family: Inter;
}

.relative-container {
    position: relative;
}

.full-name {
    font-size: 30px;
    font-weight: 600;
    line-height: 38px;
    text-align: left;
}

.form-control {
    padding: 10px 14px 10px 14px;
}

.nickname {
    color: #475467;
}

.avatar {
    width: 160px;
    height: 160px;
    border-radius: 200px;
    border: 4px solid #FFFFFF;
    box-shadow: 0px 4px 6px -2px #10182808;
    box-shadow: 0px 12px 16px -4px #10182814;
}

.verification {
    width: 32px;
    height: 32px;
    position: relative; /* или relative, fixed */
    right: 40px;
    bottom: 5px;
}

.avatarmini {
    width: 64px;
    height: 64px;
    border-radius: 200px;
}

#save-btn {
    background: #7F56D9;
    color: white;
}

#cancel-btn:active {
    background: #7F56D9;
    color: white;
}

#save-btn:active {
    background: white;
    color: #7F56D9;
}

#cancel-btn, #save-btn {
    padding: 9px 16px 9px 16px;
    gap: 8px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    text-align: left;
}

#click-to-upload {
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

@media (max-width: 767px) {
    .avatar {
        width: 96px;
        height: 96px;
    }

    .verification {
        width: 24px;
        height: 24px;
        position: relative; /* или relative, fixed */
        top: 30px;
        right: 28px;
    }
}

</style>
