<script setup>
import {computed, onMounted, reactive, ref} from "vue"
import certificate from "@/vuex/certificate.js"
import store from "@/vuex/store.js"
import SideBarSlot from "@/components/SideBarSlot.vue"

// add profile picture
const uploadedImage = ref(null);
const fileInput = ref(null);

const picture = computed(() => store.getters['media_object/getPicture'])
const courses = computed(() => store.getters['course/getCourses'])

const onFileChange = (event) => {
  const file = event.target.files[0]

  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader()
    reader.onload = (e) => {
      uploadedImage.value = e.target.result
      Certification.avatar = e.target.result

      // Fayli yuklash uchun FormData obektini yaratish
      const formData = new FormData()
      formData.append('file', file)

      store.dispatch('media_object/pushPicture', formData)
          .then(() => {
            console.log('Rasm muvaffaqiyatli yuklandi')
            Certification.avatar = picture.value.avatar['@id']
          })
          .catch((error) => {
            console.error('Rasmni yuklashda xato:', error.response.data)
          })
    }
    reader.readAsDataURL(file)
  }

};

const triggerFileInput = () => {
  fileInput.value.click()
}

//createCertificate
const Certification = reactive({
  email: '',
  familyName: '',
  givenName: '',
  course: '',
  courseFinishedDate: '',
  avatar: null,
  practiceDescription: '',
  certificateDefense: '',
})

// count characters

const maxPracticeInfoChars = ref(150)
const maxProtectionCertificateChars = ref(150)

const remainingPracticeInfoChars = computed(() => maxPracticeInfoChars.value - Certification.practiceDescription.length)
const remainingProtectionCertificateChars = computed(() => maxProtectionCertificateChars.value - Certification.certificateDefense.length)

// createCertificate function
const createCertificate = (event) => {
  event.preventDefault()
  certificate.actions.pushCertificate(null, Certification)
      .then(() => {
        console.log('Setrifikat qo\'shildi')
      })
      .catch(error => {
        console.error('Sertifikat qo\'shishda xato yuz berdi:', (error))
      })
}

const loadCourses = () => {
  store.dispatch('course/fetchCourses')
      .then(() => {
        console.log('Courses loaded successfully')
      })
      .catch((error) => {
        console.error('Failed to load courses', error)
      })
}
onMounted(() => {
  loadCourses()

  const practiceInfoInput = document.getElementById("practice")
  const protectionCertificateInput = document.getElementById("protectionCertificate")

  practiceInfoInput.addEventListener("input", function () {
    if (this.value.length > maxPracticeInfoChars.value) {
      this.value = this.value.slice(0, maxPracticeInfoChars.value)
    }
  })

  protectionCertificateInput.addEventListener("input", function () {
    if (this.value.length > maxProtectionCertificateChars.value) {
      this.value = this.value.slice(0, maxProtectionCertificateChars.value)
    }
  })
})
</script>

<template>
  <side-bar-slot>
    <div class="container">
      <div class="content">
        <form action="">
          <div class="row">
            <div class="col-12">
              <div class="title border-bottom">
                Sertifikatlashtirish
                <p>O’quvchini malumotlarini kiriting</p>
              </div>
            </div>
          </div>
          <div class="row border-bottom pb-3 pt-3">
            <div class="col-12 col-md-4">
              <label for="inputGiveName" class="label-title">
                O’quvchining ismi
                <p>Sertifikat egasini isim sharifini kiriting</p>
              </label>
            </div>
            <div class="col-12 col-md-8 col-lg-6">
              <input
                  v-model="Certification.givenName"
                  type="text" id="inputGiveName"
                  placeholder="John"
                  class="form-control"
              />
            </div>
          </div>
          <div class="row border-bottom pb-3 pt-3">
            <div class="col-12  col-md-4">
              <label for="inputFamilyName" class="label-title">
                O’quvchining familiyasi
                <p>Sertifikat egasini familyasini kiriting</p>
              </label>
            </div>
            <div class="col-12 col-md-8 col-lg-6">
              <input
                  v-model="Certification.familyName"
                  type="text"
                  id="inputFamilyName"
                  placeholder="Doe"
                  class="form-control"/>
            </div>
          </div>
          <div class="row border-bottom pb-3 pt-3">
            <div class="col-12  col-md-4 ">
              <label for="inputEmail" class="label-title">
                Pochta <p>O’quvchini pochtasini kiriting</p>
              </label>
            </div>
            <div class="col-12 col-md-8 col-lg-6">
              <input
                  v-model="Certification.email"
                  type="text"
                  id="inputEmail"
                  placeholder="example@mail.com"
                  class="form-control "/>
            </div>
          </div>
          <div class="row border-bottom pb-3 pt-3">
            <div class="col-12 col-md-4">
              <label for="courseName" class="label-title">
                Kurs nomini kiriting
                <p>Qaysi kursni tamomlaganini kiriting</p>
              </label>
            </div>
            <div class="col-12 col-md-8 col-lg-6">
              <select class="form-control" v-model="Certification.course">
                <option
                    v-for="course in courses"
                    :key="course.id"
                    :value="course['@id']"
                >{{ course.name }}
                </option>
              </select>
            </div>
          </div>
          <div class="row border-bottom pb-3 pt-3">
            <div class="col-12 col-md-4 align-self-start">
              <label for="practice" class="label-title ">
                Praktika<p>Malumot batafsil kiriting</p>
              </label>
            </div>
            <div class="col-12 col-md-8 col-lg-6">
              <textarea
                  v-model="Certification.practiceDescription"
                  class="form-control costom-textarea"
                  placeholder="Katta admin panelni yasab topshirdilar va uni funksionalini oylab chiqib mukammal darajaga yetqazib praktikani yuqori darajada topshirdilar"
                  id="practice">
              </textarea>
              <p class="pt-2">{{ remainingPracticeInfoChars }} characters left</p>
            </div>
          </div>
          <div class="row border-bottom pb-3 pt-3">
            <div class="col-12 col-md-4 align-self-start ">
              <label for="protectionCertificate" class="label-title ">
                Certifikat himoyasi<p>Malumot batafsil kiriting</p>
              </label>
            </div>
            <div class="col-12 col-md-8 col-lg-6">
              <textarea
                  v-model="Certification.certificateDefense"
                  class="form-control costom-textarea"
                  placeholder="Himoya mavzusi o’quv markazi uchun sertifikat admin paneli va foydalannuvchi ekranlarini yasash topshirilgan bolib, uni a’lo darajada topshirdilar va sertifikatni to’liq a’lo darajada himoya qildilar va taqdirlandilar"
                  id="protectionCertificate">
              </textarea>
              <p class="pt-2">{{ remainingProtectionCertificateChars }} characters left</p>
            </div>
          </div>
          <div class="row border-bottom pb-3 pt-3">
            <div class="col-12 col-md-4">
              Kursni bitirgan vaqti <p>Sertifikat egasining kursni tomomlagan vaqtini kiriting</p>
            </div>
            <div class="col-12 col-md-8 col-lg-6">
              <input
                  v-model="Certification.courseFinishedDate"
                  type="date"
                  class="form-control"/>
            </div>
          </div>
          <div class="row pb-3 pt-3">
            <div v-if="uploadedImage"
                 class="d-none col-md-2 d-md-flex justify-content-end align-self-start">
              <img :src="uploadedImage" alt="uploadImage"/>
            </div>
            <div @click="triggerFileInput"
                 class="col-12 col-md-8 d-flex justify-content-end align-items-center">
              <div class="drag-area d-flex border justify-content-center align-items-center">
                <div class="drag-text text-center">
                  <p class="select" role="button">Click to upload <span>or drag and drop</span></p>
                  <p class="text-center">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                  <input name="file" type="file" ref="fileInput" @change="onFileChange"
                         accept="image/*" style="display: none;">
                </div>
              </div>
            </div>
          </div>

          <div class="row pb-3 pt-3">
            <div class="col-12 d-flex justify-content-start align-items-center align-self-start">
              <button type="button" class="btn btn-back btn-sm mx-2">Bekor qilish</button>
              <button type="submit" @click="createCertificate" class="btn  btn-sm mx-2">Saqalash</button>
            </div>
          </div>

        </form>
      </div>
    </div>
  </side-bar-slot>
</template>

<style scoped>
.content {
  padding: 50px 32px;
}

select {
  cursor: pointer;
}

p {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #475467;
}

input::placeholder {
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #475467;
}

textarea {
  border-radius: 8px;
  resize: none;
  outline: none;
}

textarea::placeholder {
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #475467;
}

header {
  display: grid;
  height: 73px;
  gap: 20px;
  border-bottom: 8px black;

}

.title {
  font-weight: 600;
  font-size: 18px;
  line-height: 28px;
}

form .label-title {
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #344054;
}

form .costom-textarea {
  width: 100%;
  height: 102px;
}

.form-control:focus {
  border-color: #6941C6;
  outline: none;
  box-shadow: 0 1px 0px 2px #1018280D;


}

form img {
  width: 64px;
  height: 64px;
  border-radius: 200px;
  border: 1px solid black;
}

.drag-area {
  width: 100%;
  min-height: 126px;
  gap: 16px;
  border-radius: 12px;
  padding: 16px 24px 16px 24px;

}

.drag-area .select {

  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #6941C6;
  cursor: pointer;
}

.drag-area .select span {

  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #475467;
}

form .btn {
  width: 111px;
  height: 40px;
  padding: 10px 16px;
  border-radius: 8px;
  border: 1px solid #1018280D;
  gap: 8px;
  background-color: #6941C6;
  color: #fff;
}

form .btn-back {
  width: 111px;
  height: 40px;
  padding: 10px 16px;
  border-radius: 8px;
  gap: 8px;
  border: 1px solid #1018280D;
  background-color: #fff;
  color: #344054;
}
</style>
