<script setup>
import LogoComponent from "@/components/LogoComponent.vue";
</script>

<template>
    <div class="col">
        <div class="list-group">
            <div class="logo">
                <LogoComponent />
            </div>
            <div class="menu">
                <img class="icon" alt="" src="@/assets/images/Icon.svg">
                <router-link class="home" to="#">Asosiy</router-link>
            </div>
            <div class="menu">
                <img class="icon" alt="" src="@/assets/images/Icon%20(1).svg">
                <router-link to="#">Sertifikarlashtirish</router-link>
            </div>
            <div class="menu">
                <img class="icon" alt="" src="@/assets/images/Icon%20(2).svg">
                <router-link to="#">Sozlamalar</router-link>
            </div>
        </div>
    </div>
</template>

<style scoped>
.logo {
    margin-left: 20px;
}
.menu {
    display: flex;
    align-items: center;
    padding: 10px;
    border-radius: 5px;
    transition: background-color 0.3s ease;
}

.menu:hover {
    background-color: #f5f7fa;
}

a {
    color:  #101828;
    font-weight: bold;
    text-decoration: none;
}

.icon {
    color: #667085;
    margin: 10px;
    width: 18px;
    left: 3px;
}
</style>