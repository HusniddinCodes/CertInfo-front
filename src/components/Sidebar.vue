<script>
import LogoComponent from "@/components/LogoComponent.vue"

export default {
    components: {
        LogoComponent
    },
    data() {
        return {
            isSidebarVisible: false
        }
    },
    methods: {
        toggleSidebar() {
            this.isSidebarVisible = !this.isSidebarVisible
        },
        logout() {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
            window.location.reload()
        },

    }
}
</script>

<template>
    <div class="inner-navbar">
        <LogoComponent />
        <button @click="toggleSidebar" class="toggle-button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 12H15M3 6H21M3 18H21" stroke="#667085" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
    </div>

    <div :class="['sidebar', { 'active': isSidebarVisible }]">
        <div class="list-group">
            <div>
                <LogoComponent class="logo"/>
            </div>
            <router-link to="/admin/certificates" class="menu-link">
                <div class="menu">
                    <img class="icon" alt="" src="@/assets/images/home.svg">
                    Asosiy
                </div>
            </router-link>
            <router-link to="/admin/create-certificate" class="menu-link">
                <div class="menu">
                    <img class="icon" alt="" src="@/assets/images/papers.svg">
                    Sertifikatlashtirish
                </div>
            </router-link>
            <router-link to="/admin/create-course" class="menu-link">
                <div class="menu">
                    <img class="icon" alt="" src="../assets/images/award.svg">
                    Kurs qo'shish
                </div>
            </router-link>
            <router-link to="/admin/settings" class="menu-link">
                <div class="menu">
                    <img class="icon" alt="" src="@/assets/images/settings.svg">
                    Sozlamalar
                </div>
            </router-link>
            <a role="button" @click="logout" class="menu-link">
                <div class="menu">
                    <svg class="icon" width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17 8L21 12M21 12L17 16M21 12H9" stroke="#667085" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="#667085" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Chiqish
                </div>
            </a>
        </div>
    </div>
    <div :class="['content', { 'shifted': isSidebarVisible }]"></div>
</template>

<style scoped>
.toggle-button {
    background: none;
    border: none;
    cursor: pointer;
}

.sidebar {
    display: flex;
    flex-direction: column;
    top: 57px;
    bottom: 0;
    left: 0;
    background-color: #ffffff;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, height 0.3s ease;
    z-index: 10;
}

.sidebar.active {
    transform: translateY(0);
}

.sidebar.collapsed {
    transform: translateY(-100%);
}

.list-group {
    width: 100%;
    padding: 0 15px;
}

.inner-navbar {
    display: none;
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
    border-radius: 8px;
}

a {
    color: #101828;
    font-weight: bold;
    text-decoration: none;
}

.icon {
    color: #667085;
    margin-right: 10px;
    width: 18px;
}

.logo {
    margin: 20px 20px 20px 10px;
}

@media (max-width: 991px) {
    .sidebar {
        width: 100%;
        position: absolute;
        height: 0;
        overflow: hidden;
    }

    .sidebar.active {
        height: 225px;
        transform: translateY(0);
    }

    .logo {
        display: none;
    }

    .inner-navbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 20px;
        background-color: #ffffff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .content {
        transition: margin-top 0.3s ease;
    }

    .content.shifted {
        margin-top: 225px;
    }
}

@media (min-width: 992px) {
    .sidebar {
        height: 100%;
        transform: none;
        position: relative;
        left: 0;
        top: 0;
    }
}
</style>
