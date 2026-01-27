<script setup>
import { useAuthStore } from '@/stores/authStore';
import BaseModal from '../ui/BaseModal.vue';
import {  ref } from 'vue';
import BaseButton from '../ui/BaseButton.vue';
import { useSideBarStore } from '@/stores/sideBar';
let sideBarStore = useSideBarStore();


let authStore = useAuthStore();
let show = ref(false);
let loading = ref(false);
const openModal = () => {
    show.value = true;
}
const closeModal = () => {
    show.value = false;
}
const handleLogout = async () => {
    loading.value = true;
    try {
        await authStore.logout();

    } catch (error) {
        console.log(error);
    } finally {
        loading.value = false;
    }
}
</script>

<template>
    <div>
        <div id="overlay" :class="{ show: sideBarStore.isSideBarOpen }" @click="sideBarStore.closeSidebar"></div>
        
        <aside id="sidebar" :class="{ open: sideBarStore.isSideBarOpen }">
            <div class="sidebar-brand">
                <router-link class="brand-modern text-decoration-none p-4 d-flex align-items-center justify-content-center" :to="{ name: 'Dashboard' }">
                    <div class="brand-symbol">✓</div>
                    <h5 class="fw-bold p-2 mb-0">
                        <span class="text-teal">REABLIST</span><span class="text-black">ADMIN</span>
                    </h5>
                </router-link>
            </div>

            <div class="nav-label">ការគ្រប់គ្រង</div>
            <nav class="nav flex-column">
                <router-link :to="{ name: 'Dashboard' }" @click="sideBarStore.closeSidebar" class="nav-link">
                    <layout-grid /> ផ្ទាំងព័ត៌មាន
                </router-link>
                <router-link :to="{ name: 'UserDirectory' }" @click="closeSidebar" class="nav-link">
                    <users /> បញ្ជីឈ្មោះអ្នកប្រើប្រាស់
                </router-link>
                <router-link :to="{ name: 'AccessControl' }" @click="closeSidebar" class="nav-link">
                    <lock-keyhole /> ការគ្រប់គ្រងការចូលប្រើ
                </router-link>
            </nav>

            <div class="nav-label">ការតាមដាន</div>
            <nav class="nav flex-column">
                <router-link :to="{ name: 'Performance' }" class="nav-link">
                    <activity /> ប្រសិទ្ធភាពការងារ
                </router-link>
                <router-link :to="{ name: 'SecurityAlerts' }" class="nav-link">
                    <alert-triangle /> ការជូនដំណឹងអំពីសុវត្ថិភាព
                </router-link>
                <router-link :to="{ name: 'AuditTrails' }" class="nav-link">
                    <file-text /> ប្រវត្តិនៃការត្រួតពិនិត្យ
                </router-link>
            </nav>

            <div class="mt-auto p-4">
                <button @click="openModal"
                    class="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center gap-2 logout-btn">
                    <LogOut :size="18" /> ចាកចេញ
                </button>
            </div>
        </aside>
        <BaseModal :show="show">
            <template #modal>
                <div class="modal-content p-4 rounded-5 text-center">
                    <div class="mb-3 mt-2 icon-box text-danger opacity-75">
                        <i class="bi bi-exclamation-triangle-fill"></i>
                    </div>

                    <h2 class="fw-bold mb-2 text-dark">បញ្ជាក់ការចាកចេញ</h2>

                    <p class="text-muted mb-4 fs-6">
                        តើអ្នកពិតជាចង់ចាកចេញពីប្រព័ន្ធមែនទេ?
                    </p>

                    <div class="d-flex justify-content-center gap-3 mb-2">
                        <BaseButton type="button" background="btn-custom-cancel btn-lg-custom" text="text-black"
                            @click="closeModal">
                            បោះបង់
                        </BaseButton>

                        <BaseButton type="submit" :loading="loading" @click="handleLogout"
                            background=" btn-custom-delete btn-lg-custom" icon="bi bi-trash3-fill">
                            {{ loading ? 'កំពុងចាកចេញ...' : ' ចាកចេញ' }}
                        </BaseButton>
                    </div>
                </div>
            </template>
        </BaseModal>
    </div>
</template>

<style scoped>
#sidebar {
    width: var(--sidebar-width);
    height: 100vh;
    position: fixed;
    background: #ffffff;
    border-right: 1px solid var(--border-color);
    display: flex;
    flex-direction: column;
    top: 0;
    left: 0;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    z-index: 2000;
}
#sidebar.open {
  transform: translateX(0);
}

#overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.4);
  z-index: 1500;
  display: none;
  transition: opacity 0.3s ease;
}

/* Overlay visible */
#overlay.show {
  display: block;
}
.text-teal {
    color: #1491a2;
}   

.sidebar-brand {
    height: 80px;
    display: flex;
    align-items: center;
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

.modal-content {
    border: none;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.icon-box {
    font-size: 80px;
    line-height: 1;
}

.btn-custom-cancel {
    background-color: #e2e6ea;
    color: #212529;
    border: none;
    font-weight: 600;
}

.btn-custom-cancel:hover {
    background-color: #dbe0e5;
    color: #000;
}

.btn-custom-delete {
    background-color: #dc3545;
    border: none;
    font-weight: 600;
    box-shadow: 0 4px 6px rgba(220, 53, 69, 0.3);
}

.btn-lg-custom {
    padding: 10px 24px;
    font-size: 1rem;
    border-radius: 12px;
}

.brand-symbol {
    width: 38px;
    height: 38px;
    border-radius: 12px;
    background: linear-gradient(135deg, #1491a2, #0f5c69);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 900;
    font-size: 24px;
    box-shadow: 0 8px 20px rgba(19, 112, 127, 0.25);
    transition: 0.3s;
}

.brand-modern:hover .brand-symbol {
    transform: rotate(-8deg) scale(1.05);
}

@media (min-width: 992px) {
  #sidebar {
    transform: translateX(0);
  }
}
</style>