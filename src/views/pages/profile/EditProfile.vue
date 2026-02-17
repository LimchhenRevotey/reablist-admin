<script setup>
import { useProfileStore } from '@/stores/profileStore';
import router from '@/router';
import BaseInput from '@/components/ui/BaseInput.vue';
import api from '@/api/api';
import { reactive, onMounted, watchEffect, ref } from 'vue';
import BaseButton from '@/components/ui/BaseButton.vue';

const profileStore = useProfileStore();
let loading = ref(false);
let isUploading = ref(false);
let isDeloading = ref(false);
const fileInput = ref(null);
const formData = reactive({
    fullname: '',
    email: ''
});

onMounted(() => {
    profileStore.getProfiles();
});

watchEffect(() => {
    if (profileStore.dataProfiles.email) {
        formData.fullname = profileStore.dataProfiles.fullname;
        formData.email = profileStore.dataProfiles.email;
    }
});

const triggerFileInput = () => {
    fileInput.value.click();
};

// Update profile
const handleUpdate = async () => {
    try {
        loading.value = true;
        await api.put('/auth/profile', {
            fullname: formData.fullname
        });
        router.push({ name: 'Profile' });

    } catch (error) {
        console.error("Update failed:", error);
    } finally {
        loading.value = false;
    }
};

// Upload Avatar 
const handleAvatarUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
        return;
    }
    try {
        isUploading.value = true;
        const data = new FormData();
        data.append('avatar', file);
        await api.put('/auth/profile/avatar', data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        await profileStore.getProfiles();
    } catch (error) {
        console.error("Upload failed:", error);
        alert("បរាជ័យក្នុងការបញ្ចូលរូបភាព។");
    } finally {
        isUploading.value = false;
        event.target.value = '';
    }
};
// delete avatar
const handleDeleteAvatar = async () => {
    try {
        isDeloading.value = true;
        await api.delete('/auth/profile/avatar');
        await profileStore.getProfiles();

    } catch (error) {
        console.error("Delete failed:", error);
    } finally {
        isDeloading.value = false;
    }
};

const goBack = () => {
    router.go(-1);
};
</script>

<template>
    <div class="container-fluid " style="background-color: #f8f9fc;">

        <div class="d-flex align-items-center mb-4">
            <button class="btn btn-link text-dark p-1 text-decoration-none border-0" @click="goBack">
                <i class="bi bi-arrow-left fs-3"></i>
            </button>
            <h2 class="fw-bold mb-0 text-teal px-1"> កែប្រែប្រវត្តិរូប</h2>
        </div>

        <div class="row justify-content-center">
            <div class="col-lg-9 col-xl-8">
                <div class="card border-0 shadow-sm rounded-4 p-5 bg-white">

                    <div class="d-flex align-items-center gap-4 mb-5">
                        <div class="position-relative">
                            <img :src="profileStore.dataProfiles?.avatar || 'https://via.placeholder.com/100'"
                                alt="Profile" class="rounded-circle border border-2 border-white shadow-sm" width="100"
                                height="100" style="object-fit: cover;">
                        </div>
                        <div>
                            <h5 class="fw-bold mb-2">រូបភាពប្រវត្តិរូប</h5>
                            <div class="d-flex gap-2">
                                <input type="file" ref="fileInput" class="d-none" accept="image/*"
                                    @change="handleAvatarUpload">

                                <button type="button" @click="triggerFileInput" :disabled="isUploading"
                                    class="btn btn-custom-teal text-white btn-sm px-3 py-2 d-flex align-items-center gap-2">
                                    <i class="bi bi-cloud-arrow-up-fill fs-5 fw-medium"></i>
                                    {{ isUploading ? 'កំពុងបញ្ចូល...' : 'ប្ដូររូបភាព' }}
                                </button>

                                <button type="button" @click="handleDeleteAvatar"
                                    :disabled="isDeloading || !profileStore.dataProfiles?.avatar"
                                    class="btn btn-custom-light text-secondary btn-sm px-3 py-2 d-flex align-items-center gap-2">
                                    <i class="bi bi-trash3 fs-5 fw-medium"></i> {{ isDeloading ? 'កំពុងលុប...' : 'លុបរូបភាព' }}
                                </button>
                            </div>
                        </div>
                    </div>

                    <form @submit.prevent="handleUpdate">
                        <div class="row g-4">

                            <div class="col-12">
                                <BaseInput type="text" label="ឈ្មោះពេញ" v-model="formData.fullname"
                                    placeholder="បញ្ចូលឈ្មោះពេញ">
                                </BaseInput>
                            </div>

                            <div class="col-12">
                                <BaseInput type="email" label="អ៊ីមែល" v-model="formData.email" disabled="true"
                                    class="opacity-75" placeholder="email@example.com">
                                </BaseInput>
                                <small class="text-danger ms-1">អ៊ីមែលមិនអាចផ្លាស់ប្តូរបានទេ។</small>
                            </div>

                            <div class="col-12 pt-4 d-flex justify-content-end gap-3">
                                <BaseButton type="button" @click="goBack" background=" btn-custom-light"
                                    text="text-teals" icon="bi bi-x-lg">
                                    បោះបង់
                                </BaseButton>
                                <BaseButton type="submit" :loading="loading" background="btn-custom-teal">
                                    {{ loading ? 'កំពុងកែប្រែ...' : 'កែប្រែ' }}
                                </BaseButton>
                            </div>

                        </div>
                    </form>

                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.text-teals {
    color: #4b6b7a;
}

.btn-custom-teal {
    background-color: #3b6e7d;
    border: none;
    font-size: 0.85rem;
    border-radius: 6px;
}

.btn-custom-teal:hover {
    background-color: #2e5661;
}

.btn-custom-light {
    background-color: #e0ebf0;
    border: none;
    color: #4b6b7a;
    font-size: 0.85rem;
    border-radius: 6px;
}

.btn-custom-light:hover {
    background-color: #d1dee4;
    color: #374f5b;
}

.card {
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.03) !important;
}
</style>