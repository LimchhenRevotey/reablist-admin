<script setup>
import { onMounted } from 'vue';
import { useProfileStore } from '@/stores/profileStore';
import { useSideBarStore } from '@/stores/sideBar';

let sideBarStore = useSideBarStore();
let profileStore = useProfileStore();


onMounted(() => {
    profileStore.getProfiles();
});
</script>

<template>
    <header class="top-navbar">
        <div class="d-flex align-items-center justify-content-center">
            <button class="btn btn-light d-lg-none " @click="sideBarStore.toggleSidebar" id="sidebar-toggle"> 
                 <Menu :class="sideBarStore.isSideBarOpen"></Menu>
            </button>
            <div class="input-group d-none  d-md-flex" id="global-search-container" style="width: 380px;">
                <span class="input-group-text bg-light border-0"><i class="bi bi-search" size="18"></i></span>
                <input type="text" class="form-control bg-light border-0" id="global-search"
                    placeholder="ស្វែងរកក្នុងប្រព័ន្ធ...">
            </div>
        </div>

        <div class="d-flex align-items-center gap-3">
            <router-link :to="{ name: 'Profile' }" class="d-flex align-items-center gap-2 border-end pe-3 nav-link">
                <div class="text-end d-none d-sm-block">
                    <div class="fw-bold small">{{ profileStore.dataProfiles?.fullname }}</div>
                    <div class="text-muted small fw-bold text-primary">
                        {{ profileStore.dataProfiles?.email }}
                    </div>
                </div>

                <img :src="profileStore.dataProfiles?.avatar" class="rounded-circle border" width="50" height="50"
                    alt="Avatar">
            </router-link>
            <button type="button" class="btn  position-relative notification">
                <i class="bi bi-bell-fill"></i>
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    99+
                    <span class="visually-hidden">unread messages</span>
                </span>
            </button>
        </div>
    </header>
</template>

<style scoped>
.top-navbar {
    height: 80px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--border-color);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 3rem;
    position: sticky;
    top: 0;
    z-index: 1000;
}

.notification {
    color: var(--brand-primary);
    background-color: transparent;
    border: 2px solid var(--brand-primary);
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.notification:hover {
    background-color: var(--brand-primary);
    color: #fff;
}

.root-badge {
    font-size: 10px;
    font-weight: 800;
    color: var(--brand-primary) !important;
}
</style>
