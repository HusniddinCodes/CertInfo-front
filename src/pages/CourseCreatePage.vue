<script>
import {mapActions,} from "vuex";
import Sidebar from "@/components/Sidebar.vue";

export default {
    components: {Sidebar},
    methods: {
        ...mapActions (['pushCourse']),
        create() {
            this.pushCourse(this.form)
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
    <Sidebar/>
    <div class="container">
        <div class="row mt-5">
            <div class="col-12 col-sm-8 col-lg-6 col-xl-6 position-absolute top-50 start-50 translate-middle">
                <form  @submit.prevent="create">
                    <h1>Kursni kiritish</h1>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Kurs nomi</label>
                        <input
                            placeholder="Kurs nomi"
                            type="text"
                            class="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            v-model="form.name"
                        >
                    </div>
                    <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label">Tasnifi</label>
                    <textarea
                        class="form-control"
                        id="exampleFormControlTextarea1"
                        placeholder="Tasnifi"
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
