<script setup>
import {computed, onMounted, reactive, ref} from "vue";
import Sidebar from "@/components/Sidebar.vue";

// add profile picture
const uploadedImage = ref(null);
const fileInput = ref(null);

const onFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
            uploadedImage.value = e.target.result;
            Certification.image = e.target.result;
        };
        reader.readAsDataURL(file);
    }
};

const triggerFileInput = () => {
    fileInput.value.click();
};

//createCertificate
const Certification =reactive({
    fullName:'',
    email:'',
    courseName:'',
    finishedCourseInfo:'',
    practiceInfo:'',
    protectionCertificate:'',
    image:''



})
// count characters

const maxCourseNameChars = ref(100);
const maxFinishedCourseInfoChars = ref(150);
const maxPracticeInfoChars = ref(150);
const maxProtectionCertificateChars = ref(150);

const remainingCourseNameChars = computed(() => maxCourseNameChars.value - Certification.courseName.length);
const remainingFinishedCourseInfoChars = computed(() => maxFinishedCourseInfoChars.value - Certification.finishedCourseInfo.length);
const remainingPracticeInfoChars = computed(() => maxPracticeInfoChars.value - Certification.practiceInfo.length);
const remainingProtectionCertificateChars = computed(() => maxProtectionCertificateChars.value - Certification.protectionCertificate.length);
// Check MaxLength

onMounted(() => {
    const courseNameInput = document.getElementById("courseName");
    const finishedCourseInfoInput = document.getElementById("finishedCourseName");
    const practiceInfoInput = document.getElementById("practice");
    const protectionCertificateInput = document.getElementById("protectionCertificate");

    courseNameInput.addEventListener("input", function() {
        if (this.value.length > maxCourseNameChars.value) {
            this.value = this.value.slice(0, maxCourseNameChars.value);
        }
    });

    finishedCourseInfoInput.addEventListener("input", function() {
        if (this.value.length > maxFinishedCourseInfoChars.value) {
            this.value = this.value.slice(0, maxFinishedCourseInfoChars.value);
        }
    });

    practiceInfoInput.addEventListener("input", function() {
        if (this.value.length > maxPracticeInfoChars.value) {
            this.value = this.value.slice(0, maxPracticeInfoChars.value);
        }
    });

    protectionCertificateInput.addEventListener("input", function() {
        if (this.value.length > maxProtectionCertificateChars.value) {
            this.value = this.value.slice(0, maxProtectionCertificateChars.value);
        }
    });
});

</script>

<template>
   <sidebar/>
    <div class="container">
        <div class="row">
            <div class="col-12"></div>
        </div>
        <div class="content " style="max-width: 958px">
            <form  action="">
                <div class="container">
                    <div class="row border-bottom mb-3 "  >
                        <div class="col-12"><div class="title">Sertifikatlashtirish
                            <p> O’quvchini malumotlarini kiriting</p></div></div>
                    </div>
                    <div class="row w-100 d-flex justify-content-center  align-items-center border-bottom pb-3 " >
                        <div class="col-12  col-md-4 "><label for="inputName" class="label-title"> O’quvchi to’liq isim sharifi  <p>Sertifikat egasini isim sharifini kiriting</p> </label></div>
                        <div class="col-12 col col-md-8"><input v-model="Certification.fullName" type="text" id="inputName" placeholder="John Doe" class="form-control "></div>
                    </div>
                    <div class="row w-100 d-flex justify-content-center  align-items-center border-bottom pb-3 pt-3 " >
                        <div class="col-12  col-md-4 "><label for="inputEmail" class="label-title"> Pochta  <p>O’quvchini pochtasini kiriting</p> </label></div>
                        <div class="col-12 col col-md-8"><input v-model="Certification.email" type="email" id="inputEmail" placeholder="example@mail.com" class="form-control " ></div>
                    </div>
                    <div class="row w-100 d-flex justify-content-center  align-items-center border-bottom pb-3 pt-3" >
                        <div class="col-12  col-md-4"><label for="courseName" class="label-title"> Kurs nomini kiriting  <p>Qaysi kursni tamomlaganini kiriting</p> </label></div>
                        <div class="col-12 col col-md-8"><textarea v-model="Certification.courseName" class="form-control costom-textarea" placeholder="Middle Full Stack Developer "  id="courseName"></textarea>
                            <p class="pt-2">{{remainingCourseNameChars}} characters left</p>
                        </div>
                    </div>
                    <div class="row w-100 d-flex justify-content-center align-items-center border-bottom pb-3 pt-3">
                        <div class="col-12 col-md-4 align-self-start ">
                            <label  for="finishedCourseName" class="label-title ">Tamomlagan kursi<p>Malumot batafsil kiriting</p></label>
                        </div>
                        <div class="col-12 col-md-8">
                            <textarea v-model="Certification.finishedCourseInfo" class="form-control costom-textarea" id="finishedCourseName" placeholder="Katta admin panelni yasab topshirdilar va uni funksionalini oylab chiqib mukammal darajaga yetqazib praktikani yuqori darajada topshirdilar"></textarea>
                            <p class="pt-2">{{remainingFinishedCourseInfoChars}} characters left</p>
                        </div>
                    </div>

                    <div class="row w-100 d-flex justify-content-center align-items-center border-bottom pb-3 pt-3">
                        <div class="col-12 col-md-4 align-self-start ">
                            <label for="practice" class="label-title ">Praktika<p>Malumot batafsil kiriting</p></label>
                        </div>
                        <div class="col-12 col-md-8">
                            <textarea v-model="Certification.practiceInfo" class="form-control costom-textarea" placeholder=" Katta admin panelni yasab topshirdilar va uni funksionalini oylab chiqib mukammal darajaga yetqazib praktikani yuqori darajada topshirdilar" id="practice"></textarea>
                            <p class="pt-2">{{remainingPracticeInfoChars}} characters left</p>
                        </div>
                    </div>
                    <div class="row w-100 d-flex justify-content-center align-items-center border-bottom pb-3 pt-3">
                        <div class="col-12 col-md-4 align-self-start ">
                            <label for="protectionCertificate" class="label-title ">Certifikat himoyasi<p>Malumot batafsil kiriting</p></label>
                        </div>
                        <div class="col-12 col-md-8">
                            <textarea v-model="Certification.protectionCertificate" class="form-control costom-textarea" placeholder="Himoya mavzusi o’quv markazi uchun sertifikat admin paneli va foydalannuvchi ekranlarini yasash topshirilgan bolib, uni a’lo darajada topshirdilar va sertifikatni to’liq a’lo darajada himoya qildilar va taqdirlandilar" id="protectionCertificate"></textarea>
                            <p class="pt-2">{{remainingProtectionCertificateChars}} characters left</p>
                        </div>
                    </div>
                    <div class="row w-100 d-flex justify-content-end align-items-center pb-3 pt-3">
                        <div v-if="uploadedImage" class="col-12 d-none col-md-2 d-md-flex justify-content-end align-self-start">
                            <img :src="uploadedImage" alt="uploadImage">
                        </div>
                        <div @click="triggerFileInput" class="col-12 col-md-10 d-flex justify-content-end align-items-center">
                            <div class="drag-area d-flex border justify-content-center align-items-center">
                                <div class="drag-text text-center">
                                    <p class="select" role="button">Click to upload <span>or drag and drop</span></p>
                                    <p class="text-center">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                                    <input name="file" type="file" ref="fileInput" @change="onFileChange" accept="image/*" style="display: none;">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row w-100 d-flex justify-content-end align-items-center pb-3 pt-3">
                        <div class="col-12 d-flex justify-content-start align-items-center align-self-start">
                            <button type="button" class="btn btn-back btn-sm mx-2">Bekor qilish </button>
                            <button type="submit"  class="btn  btn-sm mx-2">Saqalash </button>
                        </div>

                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
body{
    background-color: #EAECF0;
}

.content{
    padding: 50px 170px 50px 32px;
}
p {
    font-family: inter;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color:#475467;
}
input::placeholder{
    font-family: inter;
    font-weight:400;
    font-size: 16px;
    line-height: 24px;
    color: #475467;
}

textarea{
    border-radius: 8px;
    resize: none;
}
textarea::placeholder{
    font-family: inter;
    font-weight:400;
    font-size: 16px;
    line-height: 24px;
    color: #475467;
}
header{
    display: grid;
    height: 73px;
    gap:20px;
    border-bottom: 8px black;

}
.title{
    font-family: inter;
    font-weight: 600;
    font-size:18px;
    line-height:28px;
}
form  .label-title{
    font-family: Inter;
    font-weight :600;
    font-size: 14px;
    line-height:20px;
    color:#344054;
}
form .costom-textarea{
    width:100%;
    height: 102px;
}
.form-control:focus {
    border-color: #6941C6;
    outline: none;
    box-shadow: 0 1px 0px 2px #1018280D;


}
form img{
    width: 64px;
    height: 64px;
    border-radius:200px;
    border: solid 0.75px black;
}
.drag-area{
    width: 800px;
    height: 126px;
    gap: 16px;
    border-radius:12px;
    padding: 16px 24px 16px 24px;

}
.drag-area .select{
    font-family:Inter;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    color: #6941C6;
    cursor: pointer;
}
.drag-area .select span{
    font-family:Inter;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #475467;
}
form .btn{
    width :111px;
    height: 40px;
    padding: 10px 16px;
    border-radius:8px;
    border:1px solid #1018280D;
    gap:8px;
    background-color: #6941C6;
    color: #fff;
}
form .btn-back{
    width: 111px;
    height: 40px;
    padding: 10px 16px;
    border-radius:8px;
    gap:8px;
    border:1px solid #1018280D;
    background-color: #fff;
    color: #344054;
}


</style>
