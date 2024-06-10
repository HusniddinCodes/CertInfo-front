<script>
export default {
    name: "SignIn",
    methods: {
        togglePasswordVisibility() {
            const password = document.getElementById("password");

            if (password.type === "password") {
                password.type = "text";
            } else {
                password.type = "password";
            }

        }
    }
}
</script>

<template>
    <!-- LoginPage Start -->
    <div class="container  position-absolute top-50 start-50 translate-middle">
        <div class="row">
            <div class="col-12 col-sm-10 col-md-7 col-lg-5 col-xl-5 col-xxl-4
                position-absolute top-50 start-50 translate-middle">
                <div class="mb-3">
                    <h1>Adminga kirish</h1>
                    <label for="exampleInputEmail1" class="form-label">Login</label>
                    <input type="email" class="form-control" id="exampleInputEmail1"
                           placeholder="Loginni kiriting" aria-describedby="emailHelp">
                </div>
                <div class="mb-3">
                    <label class="form-label">Parol</label>
                    <div class="input-group mb-3">
                        <input type="password" class="form-control" id="password"
                               placeholder="Parolni kiriting" aria-label="">
                        <span class="input-group-text" @click="togglePasswordVisibility" id="eyeicon">
                            <img src="../assets/eye.svg" alt="eye.svg"></span>
                    </div>
                </div>
                <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1">
                    <label class="form-check-label" for="exampleCheck1">Eslab qolish</label>
                    <span type="button" id="forgotpassword" data-bs-toggle="modal" data-bs-target="#exampleModal"
                       class="d-inline float-end">Parolni unutdim</span>
                </div>
                <button type="submit" id="loginpagebtn" class="btn btn w-100">Kirish</button>
            </div>
        </div>
    </div>
    <!-- LoginPage End -->

    <!-- ModalSection Start -->
    <div class="container">
        <div class="row">
            <div class="col-12 col-sm-10 col-md-7 col-lg-5 col-xl-5 col-xxl-4">
                <div class="modal modal fade" id="exampleModal">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header border-0">
                                <p>Parolingizni unutdingizmi?</p>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <p>
                                    Parolingizni unutgan bo'lsangiz dasturchilarga murojaat qiling ular
                                    sizga parolingizni tiklashda yordam berishadi!
                                </p>
                            </div>
                            <div class="modal-footer border-0 mt-2">
                                <button id="modalfooterbtn" class="btn btn"
                                        data-bs-dismiss="modal">Tushunarli</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- ModalSection End -->

</template>

<style>
form button {
    background: #7F56D9;
}

#loginpagebtn {
    background-color: #7F56D9;
    color: white;
}

#forgotpassword {
    color: #8300C5;
    text-decoration: none;
}

.modal-dialog {
    position: relative;
    top: 27%;
}

.modal-content {
    height: 280px;
}

.modal-header {
    border: none;
    height: 180px;
    background-image: url(../assets/pattern.svg);
    background-repeat: no-repeat;
}

.modal-header p {
    position: relative;
    left: 7px;
    top: 22px;
    font-size: 18px;
    font-weight: 600;
}

.modal-header button {
    position: relative;
    bottom: 55px;
    right: 15px;
}

.modal-body p {
    position: relative;
    left: -2px;
}

.modal-body {
    position: relative;
    bottom: 55px;
    height: 48px;
    color: #475467;
    left: 10px;
}

.modal-footer button {
    position: relative;
    bottom: 40px;
    margin: 10px;
    height: 44px;
    border: none;
    width: 100%
}

#modalfooterbtn {
    background: #7F56D9;
    color: white;
}

#password {
    border-right: none;
}

#eyeicon {
    border-left: none;
    background-color: #ffff;
    cursor: pointer;
}

@media only screen and (max-width: 576px) {
    .modal-dialog {
        position: relative;
        top: 29%;
    }
}

</style>
