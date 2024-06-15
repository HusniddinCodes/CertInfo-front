<script>
import {mapActions} from "vuex"

export default {
    name: "CourseCreateComponent",
    methods: {
        ...mapActions (['pushCourse']),
        create() {
            this.pushCourse(this.form)
                .then(() => {
                    location.reload()
                })

        }
    },
    data() {
        return {
            form: {
                name: '',
                description: ''
            }
        }
    }
}
</script>

<template>
    <div class="container vh-100">
        <div class="row justify-content-center align-items-center h-100">
            <div class="col-12 col-md-8">
                <form @submit.prevent="create">
                    <h1>Kursni kiritish</h1>
                    <div class="mb-3">
                        <label for="course-name" class="form-label">Kurs nomi</label>
                        <input
                            placeholder="Kurs nomi"
                            type="text"
                            class="form-control"
                            id="course-name"
                            v-model="form.name"
                        >
                    </div>
                    <div class="mb-3">
                        <label for="course-description" class="form-label">Tavsifi</label>
                        <textarea
                            class="form-control"
                            id="course-description"
                            placeholder="Tavsifi"
                            rows="3"
                            v-model="form.description"
                        >
                    </textarea>
                    </div>
                    <button type="submit" class="button">Jo'natish</button>
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container button {
    position: absolute;
    background: #7F56D9;
    border: 0;
    margin-top: 2px;
    color: white;
    border-radius: 5px;
    padding: 10px 14px;
    font-size: 14px;
}

input {
    height: 44px;
}

h1 {
    color: #7F56D9;
    font-family: comfortaa;
    text-align: center;
    font-weight: bold;
}
</style>
