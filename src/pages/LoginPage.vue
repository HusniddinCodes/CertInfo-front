<script>
export default {
    name: "LoginPage",
}
let eyeicon = document.getElementById("eyeicon");
let password = document.getElementById("password");

eyeicon.onclick = function () {
    if (password.type === "password") {
        password.type = "text";
    } else {
        password.type = "password";
    }
}
</script>

<template>
    <div class="container">
        <!-- Login page start -->
        <div class="row">
            <div class="col-12 col-sm-8 col-lg-6 col-xl-6">
                <form class="position-absolute top-50 start-50 translate-middle">
                    <p>Adminga kirish</p>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Login</label>
                        <input type="email" class="form-control" id="exampleInputEmail1"
                            aria-describedby="emailHelp" placeholder="Loginni kiriting"/>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Parol</label>
                        <input type="password" class="form-control" id="password" placeholder="Parolni kiriting"/>
                        <img id="eyeicon" src="./icon/eye.svg" alt="eye">
                    </div>
                    <div class="mb-3 form-check">
                        <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
                        <label class="form-check-label d-inline" for="exampleCheck1">Eslab qolish</label>
                        <a type="button" data-bs-toggle="modal" data-bs-target="#exampleModal"
                           class="d-inline float-end">Paro'lniunutdim
                        </a>
                    </div>
                    <button type="submit" id="loginpagebtn" class="btn">Kirish</button>
                </form>
            </div>
        </div>
        <!-- Login page end -->

        <!-- Modal page start -->
        <div class="row">
            <div class="col-12 col-sm-8 col-lg-6 col-xl-6">
                <div class="modal modal fade" id="exampleModal">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <img src="./icon/featured-icon.svg" alt="Featured">
                                <p>Paro'lingizni unutdingizmi?</p>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                </button>
                            </div>
                            <div class="modal-body">
                                <p>Paro'lingizni unutgan bo'lsangiz dasturchilarga murojaat qiling ular sizga
                                    paro'lingizni tiklashda
                                    yordam berishadi
                                </p>
                            </div>
                            <div class="modal-footer">
                                <button id="modalbtn" class="btn" data-bs-dismiss="modal">Tushunarli</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal page end -->
    </div>
</template>

<style>
form {
    width: 360px;
}

form p {
    font-size: 30px;
    color: #101828;
}

#password {
    width: 100%;
}

#eyeicon {
    position: relative;
    bottom: 33px;
    right: -330px;
}

a {
    color: #8300C5;
    text-decoration: none;
}

.login-page button {
    background: #7F56D9;
    color: white;
    border: none;
    width: 100%
}

.modal-dialog {
    position: relative;
    top: 240px;
}

.modal-content {
    height: 280px;
}

.modal-header {
    border: none;
    height: 180px;
    background-image: url(src/pages/icon/background-pattern.svg);
    background-repeat: no-repeat;
}

.modal-header img {
    position: relative;
    bottom: 45px;
    left: 5px;
}

.modal-header p {
    position: relative;
    right: 48px;
    top: 22px;
    font-size: 18px;
    font-weight: 600;
}

.modal-header button {
    position: relative;
    bottom: 55px;
    right: 15px;
}

.modal-body {
    position: relative;
    bottom: 55px;
    height: 48px;
    color: #475467;
    left: 10px;
}

.modal-footer {
    border: none;
    height: 100px;
}

.modal-footer button {
    position: relative;
    bottom: 40px;
    margin: 10px;
    height: 44px;
    background: #7F56D9;
    border: none;
    width: 100%
}

#modalbtn {
    background-color: #7F56D9;
    color: white;
}

#loginpagebtn {
    width: 100%;
    background-color: #7F56D9;
    color: white;
}
</style>
