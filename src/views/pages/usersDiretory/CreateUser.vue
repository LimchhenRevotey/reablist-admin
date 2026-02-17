<script setup>
import api from '@/api/api';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseInput from '@/components/ui/BaseInput.vue';
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import z from 'zod';
import { useRoleStore } from '@/stores/roleStore';

const roleStore = useRoleStore();
const error = ref({});
const router = useRouter();
const loading = ref(false);

const formData = reactive({
    fullName: '',
    email: '',
    role: null,
    password: '',
    confirmPassword: ''
});

onMounted(() => {
    roleStore.getRoles();
});

const shemaUser = z.object({
    fullName: z
        .string()
        .min(1, 'សូមបញ្ចូលឈ្មោះពេញ!')
        .regex(/^[a-zA-Z\s\u1780-\u17FF]+$/, 'ឈ្មោះមិនអាចមានលេខ ឬសញ្ញាពិសេសទេ!'),

    email: z
        .string()
        .min(1, 'សូមបញ្ចូលអ៊ីមែល!')
        .email('ទម្រង់អ៊ីមែលមិនត្រឹមត្រូវ!'),

    role: z
        .number({ invalid_type_error: 'សូមជ្រើសរើសតួនាទី!' })
        .positive('សូមជ្រើសរើសតួនាទី!'),

    password: z
        .string()
        .min(8, 'ពាក្យសម្ងាត់ត្រូវមានយ៉ាងតិច ៨ តួអក្សរ!')
        .regex(/[A-Z]/, 'ត្រូវមានអក្សរធំយ៉ាងតិច ១ តួ!')
        .regex(/[a-z]/, 'ត្រូវមានអក្សរតូចយ៉ាងតិច ១ តួ!')
        .regex(/[0-9]/, 'ត្រូវមានលេខយ៉ាងតិច ១ តួ!')
        .regex(/[@$!%*?&]/, 'ត្រូវមានសញ្ញាពិសេសយ៉ាងតិច ១ (@$!%*?&)!'),

    confirmPassword: z.string().min(1, 'សូមបញ្ជាក់ពាក្យសម្ងាត់ម្តងទៀត!')
}).refine((data) => data.password === data.confirmPassword, {
    message: "ពាក្យសម្ងាត់ទាំងពីរមិនដូចគ្នាទេ!",
    path: ["confirmPassword"],
});

const handleCreateUser = async () => {
    error.value = {};
    const result = shemaUser.safeParse(formData);
    if (!result.success) {
        const formatted = result.error.format();
        error.value = {
            fullName: formatted.fullName?._errors[0],
            email: formatted.email?._errors[0],
            role: formatted.role?._errors[0],
            password: formatted.password?._errors[0],
            confirmPassword: formatted.confirmPassword?._errors[0],
        };
        return;
    }
    try {
        loading.value = true;
        await api.post('/users', {
            fullname: formData.fullName,
            email: formData.email,
            roleId: formData.role,
            password: formData.password
        });

        router.push({ name: 'UserDirectory' });
    } catch (err) {
        if (err.response && err.response.status === 400) {
            error.value.email = "អ៊ីមែលនេះមានអ្នកប្រើប្រាស់រួចហើយ!";
        } else {
            alert("មានបញ្ហាបច្ចេកទេស! មិនអាចបង្កើតបានទេ។");
        }
    } finally {
        loading.value = false;
    }
};

const goBack = () => router.go(-1);
</script>

<template>
    <section class="container-fluid p-3 p-md-4">
        <div class="d-flex align-items-center gap-2 mb-4">
            <button class="btn btn-back border-0 shadow-sm" @click="goBack">
                <i class="bi bi-chevron-left" style="-webkit-text-stroke: 1px;"></i>
            </button>
            <h3 class="fw-bold mb-0">បង្កើតអ្នកប្រើប្រាស់ថ្មី</h3>
        </div>

        <div class="row justify-content-center">
            <div class="col-lg-10 col-xl-8">
                <div class="card border-0 shadow-sm rounded-4">
                    <div class="card-body p-4 p-md-5">
                        <form @submit.prevent="handleCreateUser">
                            <div class="row g-4">
                                <div class="col-md-6">
                                    <BaseInput label="ឈ្មោះពេញ" v-model="formData.fullName"
                                        placeholder="បញ្ចូលឈ្មោះពេញរបស់អ្នក" :message_error="error.fullName" />
                                </div>
                                <div class="col-md-6">
                                    <BaseInput label="អ៊ីមែល" type="email" v-model="formData.email"
                                        placeholder="បញ្ចូលអ៊ីមែលរបស់អ្នក" :message_error="error.email" />
                                </div>
                                <div class="col-12">
                                    <label class="form-label text-teal fw-bold mb-2">កំណត់តួនាទី</label>
                                    <select class="form-select form-control-custom"
                                        :class="{ 'is-invalid-custom': error.role }" v-model.number="formData.role">
                                        <option :value="null" disabled>សូមជ្រើសរើសតួនាទី</option>
                                        <option v-for="role in roleStore.roles" :key="role.id" :value="role.id">
                                            {{ role.name }}
                                        </option>
                                    </select>
                                    <small v-if="error.role" class="text-danger d-block mt-1">{{ error.role }}</small>
                                </div>

                                <div class="col-md-6">
                                    <BaseInput label="ពាក្យសម្ងាត់" type="password" v-model="formData.password"
                                        placeholder="បញ្ចូលពាក្យសម្ងាត់" :message_error="error.password" />
                                </div>

                                <div class="col-md-6">
                                    <BaseInput label="បញ្ជាក់ពាក្យសម្ងាត់" type="password"
                                        v-model="formData.confirmPassword" placeholder="បញ្ចូលពាក្យសម្ងាត់ម្តងទៀត"
                                        :message_error="error.confirmPassword" />
                                </div>

                                <div class="col-12 pt-4 d-flex justify-content-end gap-3 border-top mt-4">
                                    <BaseButton type="button" background="btn-custom-cancel" text="text-black"
                                    @click="goBack" :disabled="loading">
                                        បោះបង់
                                    </BaseButton>
                                    <BaseButton type="submit" :loading="loading">
                                        {{ loading ? 'កំពុងបង្កើត...' : 'បង្កើតអ្នកប្រើប្រាស់' }}
                                    </BaseButton>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.text-teal {
    color: #13707f !important;
}

.btn-back {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
}

.form-control-custom {
    background-color: #f8fafb;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    padding: 12px 16px;
}

.form-control-custom:focus {
    border-color: #13707f;
    box-shadow: 0 0 0 3px rgba(19, 112, 127, 0.1);
    outline: none;
}

.is-invalid-custom {
    border-color: #dc3545 !important;
}

/* .btn-cancel {
    background-color: #f1f5f9;
    color: #475569;
    border: none;
} */

/* .card {
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05) !important;
} */
</style>