<script setup>
import { useAuthStore } from '@/stores/authStore';
import BaseModal from '../ui/BaseModal.vue';
import { ref } from 'vue';
let authStore = useAuthStore();
let show = ref(false);
const openModal = () => {
    show.value = true;
}
const closeModal = () =>{
    show.value = false;
}
const handleLogout = async () => {
    try {
        await authStore.logout();

    } catch (error) {
        console.log(error);
        
    }
}
</script>

<template>
    <div>
        <aside id="sidebar">
            <div class="sidebar-brand">
                <shield-check class="me-2" />
                REABLIST<span class="text-black">ADMIN</span>
            </div>

            <div class="nav-label">Management</div>
            <nav class="nav flex-column">
                <router-link :to="{ name: 'Dashboard' }" class="nav-link">
                    <layout-grid /> Dashboard
                </router-link>
                <router-link :to="{ name: 'UserDirectory' }" class="nav-link">
                    <users /> Users Directory
                </router-link>
                <router-link :to="{ name: 'AccessControl' }" class="nav-link">
                    <lock-keyhole /> Access Control
                </router-link>
            </nav>

            <div class="nav-label">Monitoring</div>
            <nav class="nav flex-column">
                <router-link :to="{ name: 'Performance' }" class="nav-link">
                    <activity /> Performance
                </router-link>
                <router-link :to="{ name: 'SecurityAlerts' }" class="nav-link">
                    <alert-triangle /> Security Alerts
                </router-link>
                <router-link :to="{ name: 'AuditTrails' }" class="nav-link">
                    <file-text /> Audit Trails
                </router-link>
            </nav>

            <div class="mt-auto p-4">
                <button @click="openModal"
                    class="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center gap-2 logout-btn">
                    <LogOut :size="18" /> Logout
                </button>
            </div>
        </aside>
        <BaseModal 
            :show="show" 
            title="Confirm Logout"
            message="Are you sure you want to log out of the system?"
            confirmText="Logout"
            @close="closeModal"
            @confirm="handleLogout"
        />
    </div>
</template>

<style scoped>
/* Paste sidebar-specific CSS here */
#sidebar {
    width: var(--sidebar-width);
    height: 100vh;
    position: fixed;
    background: #ffffff;
    border-right: 1px solid var(--border-color);
    display: flex;
    flex-direction: column;
}

.sidebar-brand {
    height: 80px;
    display: flex;
    align-items: center;
    padding: 0 2rem;
    font-weight: 800;
    color: var(--brand-primary);
}

.nav-label {
    font-size: 0.7rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #94A3B8;
    padding: 1.5rem 2rem 0.5rem;
}

.nav-link {
    padding: 0.85rem 2rem;
    color: #64748B;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 12px;
    transition: all 0.2s;
    font-size: 0.95rem;
}

.nav-link:hover {
    background-color: var(--brand-light);
    color: var(--brand-primary);
}

.nav-link.active {
    background-color: var(--brand-light);
    color: var(--brand-primary);
    border-right: 4px solid var(--brand-primary);
}

.logout-btn {
    border-radius: 0.75rem;
    font-weight: 700;
}
</style>