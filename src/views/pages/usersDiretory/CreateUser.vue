<script setup>
import api from '@/api/api';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseInput from '@/components/ui/BaseInput.vue';
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import z from 'zod';
import { useRoleStore } from '@/stores/roleStore';

let roleStore = useRoleStore();
let error = ref('');
const router = useRouter();
const formData = reactive({
    fullName: '',
    email: '',
    role: null,
    password: ''
});
const loading = ref(false);
onMounted(() => {
    roleStore.getRoles();
});
const shemaUser = z.object({
    fullName: z
        .string()
        .min(1, 'Full Name is required'),
    email: z
        .string()
        .min(1, 'Email is required')
        .email('Invalid email address'),
    role: z
        .number('Role is required'),
    password: z
        .string()
        .min(8, 'Password must be at least 8 characters long')
});
const handleCreateUser = async () => {
    let result = shemaUser.safeParse({
        fullName: formData.fullName,
        email: formData.email,
        role: formData.role,
        password: formData.password
    });
    console.log(result);
    error.value = {};
    if (!result.success) {
        let formated = result.error.format();
        error.value.fullName = formated.fullName?._errors[0] || '';
        error.value.email = formated.email?._errors[0] || '';
        error.value.role = formated.role?._errors[0] || '';
        error.value.password = formated.password?._errors[0] || '';
        return;
    };
    try {
        loading.value = true;
        let res = await api.post('/users', {
            fullname: formData.fullName,
            email: formData.email,
            roleId: formData.role,
            password: formData.password
        });
        router.push({ name: 'UserDirectory' });
        formData.fullName = '';
        formData.email = '';
        formData.role = null;
        formData.password = '';
    } catch (error) {

    } finally {
        loading.value = false;
    }
};

const goBack = () => {
    router.go(-1);
};
</script>

<template>
    <section class="container-fluid">
        <div class="d-flex align-items-center gap-2">
            <button class="btn btn-light text-dark py-2 rounded-circle text-decoration-none border-0" @click="goBack">
                <i class="bi bi-chevron-left" style="-webkit-text-stroke: 1px;"></i>
            </button>
            <h3 class="fw-bold mb-0">Create New User</h3>
        </div>

        <div class="row justify-content-center mt-4">
            <div class="col-lg-10 col-xl-8">
                <div class="card border-0 shadow-sm rounded-4 p-5">
                    <form @submit.prevent="handleCreateUser">
                        <div class="row g-4">

                            <div class="col-md-6">
                                <BaseInput label="Full Name" type="text" v-model="formData.fullName"
                                    placeholder="Enter Your Full Name" :message_error="error.fullName"></BaseInput>
                            </div>

                            <div class="col-md-6">
                                <BaseInput label="Email Address" type="email" v-model="formData.email"
                                    placeholder="Enter Your Email" :message_error="error.email"></BaseInput>
                            </div>

                            <div class="col-12">
                                <label class="form-label text-teal fw-bold mb-2">Assigns Role</label>
                                <select class="form-select form-control-custom" v-model="formData.role">
                                    <option value="" disabled selected>Select a role</option>
                                    <option v-for="role in roleStore.roles" :key="role.id" :value="role.id">{{ role.name
                                        }}</option>
                                </select>
                                <small class="text-danger">{{ error.role }}</small>
                            </div>

                            <div class="col-12">
                                <BaseInput label="Password" type="password" v-model="formData.password"
                                    placeholder="Enter Your Password" :message_error="error.password"></BaseInput>
                            </div>

                            <div class="col-12 pt-4 d-flex justify-content-end gap-3 border-top mt-4">
                                <BaseButton type="button" background="btn-danger" @click="goBack"> Cancel</BaseButton>
                                <BaseButton type="submit" :loading="loading">{{ loading ? 'Creating...' : 'Create User'
                                    }}</BaseButton>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.text-teal {
    color: #427c87 !important;
}

.form-control-custom {
    background-color: #e3eff3;
    border: none;
    border-radius: 6px;
    padding: 12px 16px;
    color: #5f7d8c;
    font-size: 0.95rem;
}

.form-control-custom:focus {
    background-color: #ddebf0;
    box-shadow: none;
    outline: 2px solid #b0c4cd;
}

.btn-teal {
    background-color: #5b8c9d;
    border: none;
    transition: background-color 0.2s;
}

.btn-teal:hover {
    background-color: #4a7585;
}

.btn-danger:hover {
    background-color: #dc2626 !important;
}

.card {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03) !important;
}
</style>