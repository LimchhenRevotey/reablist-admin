<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useProfileStore } from '@/stores/profileStore';
import { useSideBarStore } from '@/stores/sideBar';
import api from '@/api/api';

const router = useRouter();
const sideBarStore = useSideBarStore();
const profileStore = useProfileStore();

// Search States
const searchQuery = ref('');
const searchResults = ref([]);
const isSearching = ref(false);
const showDropdown = ref(false);
let debounceTimeout = null;

const handleSearch = async () => {
    if (!searchQuery.value.trim()) {
        searchResults.value = [];
        showDropdown.value = false;
        return;
    }
    isSearching.value = true;
    showDropdown.value = true;

    try {
        const response = await api.get(`/users`, {
            params: {
                _page: 1,
                _per_page: 10,
                search: searchQuery.value,
                sortBy: 'id',
                sortDir: 'ASC'
            }
        });
        const data = response.data.data.items;

        if (Array.isArray(data)) {
            searchResults.value = data;
        } else {
            searchResults.value = [];
        }
    } catch (error) {
        console.error("Search Error Details:", error);
        searchResults.value = [];
    } finally {
        isSearching.value = false;
    }
};

watch(searchQuery, (newValue) => {
    clearTimeout(debounceTimeout);
    if (!newValue) {
        searchResults.value = [];
        showDropdown.value = false;
        return;
    }
    debounceTimeout = setTimeout(() => {
        handleSearch();
    }, 500);
});

const closeDropdown = () => {
    setTimeout(() => {
        showDropdown.value = false;
    }, 250);
};

const viewUser = (user) => {
    router.push({ name: "View-User", params: { id: user.id } });
};

onMounted(() => {
    profileStore.getProfiles();
});
</script>

<template>
    <header class="top-navbar">
        <div class="header-left d-flex align-items-center flex-grow-1">
            <button class="btn btn-light d-lg-none me-2 rounded-circle" @click="sideBarStore.toggleSidebar"
                id="sidebar-toggle">
                <i class="bi bi-list fs-4"></i>
            </button>

            <div class="search-container position-relative flex-grow-1">
                <div class="input-group custom-search-box">
                    <span class="d-flex align-items-center px-2">
                        <i v-if="!isSearching" class="bi bi-search text-muted"></i>
                        <span v-else class="spinner-border spinner-border-sm text-teal"></span>
                    </span>
                    <input type="text" v-model="searchQuery" @focus="showDropdown = searchQuery.length > 0"
                        @blur="closeDropdown" class="form-control border-0 py-2" placeholder="ស្វែងរកឈ្មោះ...">
                </div>

                <div v-if="showDropdown" class="custom-dropdown shadow-lg border-0 rounded-4">
                    <template v-if="searchResults.length > 0">
                        <div class="dropdown-header-title d-flex justify-content-between align-items-center">
                            <span>អ្នកប្រើប្រាស់ដែលរកឃើញ</span>
                            <span class="badge rounded-pill">{{ searchResults.length }}​ នាក់</span>
                        </div>

                        <div class="list-wrapper">
                            <div v-for="user in searchResults" :key="user.id" @click="viewUser(user)"
                                class="custom-search-item">
                                <div class="avatar-wrapper">
                                    <img :src="user.avatar || 'https://ui-avatars.com/api/?name=' + user.fullname"
                                        class="rounded-circle border-2 border-white shadow-sm" width="45" height="45"
                                        style="object-fit: cover;" />
                                    <div class="status-indicator"></div>
                                </div>
                                <div class="user-details overflow-hidden">
                                    <div class="user-name text-truncate">{{ user.fullname }}</div>
                                    <div class="user-email text-truncate">{{ user.email }}</div>
                                </div>
                                <i class="bi bi-chevron-right ms-auto arrow-icon"></i>
                            </div>
                        </div>
                    </template>

                    <div v-else-if="!isSearching && searchQuery.trim() !== ''" class="p-4 text-center">
                        <i class="bi bi-search fs-2 text-muted mb-2"></i>
                        <div class="fw-bold text-secondary small">រកមិនឃើញ "{{ searchQuery }}"</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="header-right d-flex align-items-center gap-2 gap-md-3 ms-3">
            <router-link :to="{ name: 'Profile' }" class="d-flex align-items-center gap-2 nav-link profile-link">
                <div class="text-end d-none d-lg-block">
                    <div class="fw-bold small lh-1">{{ profileStore.dataProfiles?.fullname || 'Username' }}</div>
                    <div class=" small fw-bold mt-1 text-teal">
                        {{ profileStore.dataProfiles?.email || 'email@example.com' }}
                    </div>
                </div>
                <img :src="profileStore.dataProfiles?.avatar || 'https://via.placeholder.com/50'"
                    class="rounded-circle border" width="50" height="50" alt="Avatar">
            </router-link>

            <button type="button" class="btn notification-btn">
                <i class="bi bi-bell-fill"></i>
                <span class="badge rounded-pill bg-danger">99+</span>
            </button>
        </div>
    </header>
</template>

<style scoped>
.text-teal {
    color: #13707F;
}

.top-navbar {
    height: 70px;
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid #ececec;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;
    position: sticky;
    top: 0;
    z-index: 1000;
}

.custom-search-box {
    background: #f1f3f5;
    border-radius: 12px;
    padding: 2px 8px;
    transition: all 0.7s ease;
    max-width: 420px;
}

.custom-search-box:focus-within {
    background: #ffffff;
    box-shadow: 0 0 0 3px rgba(19, 112, 127, 0.15);
    border: 1px solid #13707F;
}

.custom-search-box input {
    background: transparent;
    font-size: 0.9rem;
    color: #495057;
}

.custom-search-box input:focus {
    box-shadow: none;
}

.custom-dropdown {
    position: absolute;
    max-width: 65%;
    top: 115%;
    left: 0;
    right: 0;
    background: white;
    z-index: 1100;
    animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.dropdown-header-title {
    padding: 10px 16px;
    font-size: 0.7rem;
    font-weight: 700;
    color: #adb5bd;
    text-transform: uppercase;
    border-bottom: 1px solid #f8f9fa;
}

.dropdown-header-title .badge {
    background: #e1f0f2;
    color: #13707F;
}

.list-wrapper {
    max-height: 380px;
    overflow-y: auto;
}

.custom-search-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 16px;
    cursor: pointer;
    transition: 0.2s;
    border-bottom: 1px solid #f8f9fa;
}

.custom-search-item:hover {
    background-color: #f4fbfc;
}

.user-name {
    font-weight: 600;
    font-size: 0.85rem;
    color: #343a40;
}

.user-email {
    font-size: 0.75rem;
    color: #6c757d;
}

.avatar-wrapper {
    position: relative;
}

.status-indicator {
    position: absolute;
    bottom: 1px;
    right: 1px;
    width: 10px;
    height: 10px;
    background: #2ecc71;
    border: 2px solid #fff;
    border-radius: 50%;
}

.notification-btn {
    position: relative;
    color: #13707F;
    border: 1px solid #13707F;
    border-radius: 50%;
    width: 45px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
}

.notification-btn .badge {
    position: absolute;
    top: -5px;
    right: -5px;
    font-size: 0.6rem;
}

.notification-btn:hover {
    background: #13707F;
    color: white;
}

.profile-link {
    border-right: 1px solid #ececec;
    padding-right: 1rem;
}

@media (min-width: 992px) {
    .top-navbar {
        height: 80px;
        padding: 0 2rem;
    }

    .custom-search-box {
        width: 420px;
    }
}

@media (max-width: 991.98px) {
    .profile-link {
        border-right: none;
        padding-right: 0;
    }
}

@media (max-width: 767.98px) {
    .top-navbar {
        padding: 0 0.8rem;
    }

    .custom-search-box {
        max-width: 100%;
    }

    .custom-dropdown {
        position: fixed;
        top: 72px;
        left: 10px;
        right: 10px;
        width: auto;
    }
}
</style>