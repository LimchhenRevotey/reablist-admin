<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const formData = ref({
    fullName: '',
    email: '',
    role: '',
    password: ''
});

const handleCreateUser = () => {
    alert(1)
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
                                <label class="form-label text-teal fw-medium mb-2">Full Name</label>
                                <input type="text" class="form-control form-control-custom"
                                    placeholder="Enter Your Full Name" required>
                            </div>

                            <div class="col-md-6">
                                <label class="form-label text-teal fw-medium mb-2">Email</label>
                                <input type="email" class="form-control form-control-custom"
                                    placeholder="Enter Your email" required>
                            </div>

                            <div class="col-12">
                                <label class="form-label text-teal fw-medium mb-2">Assigns Role</label>
                                <select class="form-select form-control-custom" required>
                                    <option value="" disabled selected>Select a role.......</option>
                                    <option value="admin">Admin</option>
                                    <option value="editor">Editor</option>
                                    <option value="viewer">Viewer</option>
                                </select>
                            </div>

                            <div class="col-12">
                                <label class="form-label text-teal fw-medium mb-2">Password</label>
                                <input type="password"
                                    class="form-control form-control-custom" placeholder="Enter Your Password" required>
                            </div>

                            <div class="col-12 pt-4 d-flex justify-content-end gap-3 border-top mt-4">
                                <button type="button" class="btn btn-danger px-4 py-2 rounded-2 fw-medium"
                                    style="background-color: #ef4444; border: none;">
                                    Cancel
                                </button>
                                <button type="submit" class="btn btn-teal text-white px-4 py-2 rounded-2 fw-medium">
                                    Execute_User Create
                                </button>
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
    color: #4b6b7a;
    font-size: 0.95rem;
}

.form-control-custom {
    background-color: #e3eff3;
    border: none;
    border-radius: 6px;
    padding: 12px 16px;
    color: #5f7d8c;
    font-size: 0.95rem;
}

.form-control-custom::placeholder {
    color: #8faab6;
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